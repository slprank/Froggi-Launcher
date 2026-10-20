import { delay, inject, singleton } from 'tsyringe';
import type { ElectronLog } from 'electron-log';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { MessageHandler } from '../messageHandler';
import { videoDuration } from '../../utils/videoDuration';
import { placeClips, type HighlightMoment, type HighlightReel, type HighlightReels, type SavedBuffer } from '../../../frontend/src/lib/utils/highlightReel';

/** Formats a browser (OBS browser source) can play. */
const PLAYABLE = ['.mp4', '.webm', '.mov', '.m4v'];
/** How long Build reel waits for replay saves Froggi asked for that OBS hasn't written yet. */
const SAVE_WAIT_MS = 15000;

interface Buffer extends SavedBuffer {
	file: string;
}

/**
 * Highlight moments, the replay-buffer files OBS saved, and the reels built from them (see
 * utils/highlightReel.ts). Files stay where OBS saved them; Froggi serves only registered ids at
 * /highlights/<id>. Nothing is cleared or deleted on its own: a reel changes when a flow builds it again.
 */
@singleton()
export class ElectronHighlightStore {
	private moments: HighlightMoment[] = [];
	private buffers: Buffer[] = [];
	private reels: HighlightReels = {};
	/** Request times of saves Froggi asked OBS for, oldest first (OBS saves in order). */
	private pendingSaves: number[] = [];
	private saveWaiters: (() => void)[] = [];
	private gameStartedAt = 0;
	/** Volume (0–100) set by the flow card "Set video volume" — overrides the element's own volume. */
	private volumes: Record<string, number> = {};

	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {}

	/** Froggi asked OBS to save its replay buffer at `at` — the saved file ends then. */
	requestedSave(at = Date.now()) {
		this.pendingSaves.push(at);
	}

	/** OBS wrote a replay-buffer file. */
	saved(file: string) {
		// A request OBS never answered (over a minute ago) must not time this file.
		this.pendingSaves = this.pendingSaves.filter((at) => Date.now() - at < 60000);
		const requested = this.pendingSaves.shift();
		// ponytail: a save Froggi didn't ask for (OBS hotkey) is timed by this event, ~0.6 s late per 20 MB.
		this.register(file, requested ?? Date.now());
		if (!this.pendingSaves.length) this.saveWaiters.splice(0).forEach((done) => done());
	}

	private register(file: string, end: number): Buffer {
		const known = this.buffers.find((b) => b.file === file);
		if (known) return known;
		let duration: number | null = null;
		try {
			duration = videoDuration(file);
		} catch (err) {
			this.log.warn('Could not read the length of', file, err);
		}
		const buffer = { id: `${crypto.randomUUID()}${path.extname(file).toLowerCase()}`, file, end, duration };
		this.buffers = [...this.buffers, buffer].slice(-200);
		return buffer;
	}

	gameStarted(at = Date.now()) {
		this.gameStartedAt = at;
		this.emit();
	}

	/** Remember a moment worth showing (window from momentWindow); higher score = better. */
	/** Remember a moment worth showing; returns its id ({{highlight}} — List cards store it). */
	mark(window: { start: number; end: number; frames?: { start: number; end: number } }, score: number): string {
		const id = `h${++this.lastId}`;
		this.moments = [...this.moments, { ...window, score, id }].slice(-2000);
		this.log.info(`Highlight ${id}: score ${score}, ${((window.end - window.start) / 1000).toFixed(1)} s`);
		return id;
	}
	private lastId = 0;

	/**
	 * Build video `key` from these highlight ids, in this order (a List card's values). Waits for replay
	 * saves still being written. Ids without a moment or footage are skipped; no clips → the reel is cleared.
	 */
	async build(key: string, ids: string[], delaySeconds = 0): Promise<HighlightReel | null> {
		if (this.pendingSaves.length) await new Promise<void>((done) => {
			this.saveWaiters.push(done);
			setTimeout(done, SAVE_WAIT_MS);
		});
		const byId = new Map(this.moments.map((m) => [m.id, m]));
		const moments = ids.flatMap((id) => byId.get(id) ?? []);
		const clips = placeClips(moments, this.buffers.filter((b) => fs.existsSync(b.file)), delaySeconds).map(({ url, fromEnd, toEnd }) => ({ url, fromEnd, toEnd }));
		if (clips.length) this.reels = { ...this.reels, [key]: { id: crypto.randomUUID(), key, clips, startedAt: null } };
		else this.reels = Object.fromEntries(Object.entries(this.reels).filter(([k]) => k !== key));
		this.log.info(`Highlight reel "${key}": ${clips.length} clip(s) from ${ids.length} highlight(s)`, clips);
		this.emit();
		return this.reels[key] ?? null;
	}

	/** Show one whole video file as reel `key`. Throws with a readable reason. */
	show(key: string, file: string): HighlightReel {
		const ext = path.extname(file).toLowerCase();
		if (!fs.existsSync(file)) throw new Error(`No file at ${file}`);
		if (!PLAYABLE.includes(ext)) throw new Error(`${ext || 'This format'} can't play in a browser source — set OBS → Settings → Output → Recording format to MP4 or Hybrid MP4`);
		// end 0: when this file was recorded is unknown, so it is never footage for marked moments.
		const buffer = this.register(file, 0);
		if (!buffer.duration) throw new Error(`Could not read how long ${path.basename(file)} is (MP4 / MOV only)`);
		const reel = { id: crypto.randomUUID(), key, clips: [{ url: `/highlights/${buffer.id}`, fromEnd: buffer.duration, toEnd: 0 }], startedAt: null };
		this.reels = { ...this.reels, [key]: reel };
		this.emit();
		return reel;
	}

	setVolume(key: string, volume: number) {
		this.volumes = { ...this.volumes, [key]: Math.min(100, Math.max(0, Math.round(volume))) };
		this.emit();
	}

	/** A client shows reel `key` — the shared clock starts once (first client wins). */
	started(key: string, id: string) {
		const reel = this.reels[key];
		if (!reel || reel.id !== id || reel.startedAt !== null) return;
		this.reels = { ...this.reels, [key]: { ...reel, startedAt: Date.now() } };
		this.emit();
	}

	/** This game's moments as game highlights (frames + score), when the game is stored. */
	gameHighlights(): { startFrame: number; endFrame: number; score: number }[] {
		return this.moments.filter((m) => m.end >= this.gameStartedAt && m.frames).map((m) => ({ startFrame: m.frames!.start, endFrame: m.frames!.end, score: m.score }));
	}

	/** When the current game started (wall clock ms). */
	get gameStart() {
		return this.gameStartedAt;
	}

	/** File behind a served id, or undefined (unknown ids are refused). */
	file(id: string): string | undefined {
		return this.buffers.find((b) => b.id === id)?.file;
	}

	current(): HighlightReels {
		return this.reels;
	}

	currentVolumes(): Record<string, number> {
		return this.volumes;
	}

	emit() {
		this.messageHandler.sendMessage('HighlightReels', this.reels, Date.now(), this.volumes);
	}
}
