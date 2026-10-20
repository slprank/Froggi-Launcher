<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { electronEmitter, highlightReels, isElectron, serverClockOffset, urls, videoVolumes } from '$lib/utils/store.svelte';
	import { reelPosition, type HighlightReel } from '$lib/utils/highlightReel';

	// Video: plays what a flow points `key` at — a highlight reel ("Build highlight reel": clips of OBS
	// replay-buffer files, in order, looping) or one whole file ("Set video"). Every device plays the same
	// position: (server now − startedAt) mod reel length. Three <video>s: one plays while the next 2 clips
	// are loaded and seeked ahead, then they swap — a clip only shows once it is ready; one that fails is skipped.
	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let defaultPreview: boolean;
	/** Overlay list / thumbnail renders: never start or play a reel. */
	export let preview = false;

	const DRIFT = 0.4; // s — reseek the playing clip when it is further off the shared clock
	const LOAD_TIMEOUT_MS = 10000;

	// payload.video {key, volume 0–100}; older elements: payload.highlight {key, sound}.
	$: settings = ((data) => data?.video ?? (data?.highlight ? { key: data.highlight.key, volume: data.highlight.sound ? 100 : 0 } : {}))(
		dataItem?.data as { video?: { key?: string; volume?: number }; highlight?: { key?: string; sound?: boolean } },
	);
	$: key = settings.key?.trim() || 'game';
	/** A flow's "Set video volume" wins over the element's own volume. */
	$: volume = $videoVolumes[key] ?? settings.volume ?? 0;
	$: for (const v of videos) if (v) {
		v.volume = Math.min(1, Math.max(0, volume / 100));
		v.muted = volume <= 0;
	}
	$: reel = $highlightReels[key] ?? null;
	$: base = ($isElectron ? $urls?.localResource : $urls?.externalResource) ?? '';

	/** Video players: the clip on screen + the next 2 loaded and seeked, ready to swap in. */
	const SLOTS = 3;
	let videos: HTMLVideoElement[] = [];
	/** Per slot: which clip it holds, ready = seeked to the clip start. */
	let slots = Array.from({ length: SLOTS }, () => ({ clip: -1, ready: false, failed: false }));
	let shown = -1;
	let reelId: string | null = null;
	/** Bumped on every reset — loads from an older reel stop. */
	let generation = 0;

	const clipStart = (v: HTMLVideoElement, index: number) => Math.max(0, v.duration - (reel?.clips[index]?.fromEnd ?? 0));
	const elapsed = (r: HighlightReel) => (Date.now() + $serverClockOffset - (r.startedAt ?? 0)) / 1000;

	/** Drop both videos right away (reel replaced, cleared, or element gone) — frees the files. */
	function reset() {
		generation++;
		for (const v of videos) {
			if (!v) continue;
			v.pause();
			v.removeAttribute('src');
			v.load();
		}
		slots = slots.map(() => ({ clip: -1, ready: false, failed: false }));
		shown = -1;
	}

	$: onReel(reel);
	function onReel(r: HighlightReel | null) {
		if (r?.id === reelId) return;
		reelId = r?.id ?? null;
		reset();
		if (!r || defaultPreview || preview) return;
		if (r.startedAt === null) $electronEmitter.emit('HighlightReelShown', r.key, r.id);
	}

	const once = (v: HTMLVideoElement, event: string) =>
		new Promise<void>((resolve, reject) => {
			const done = () => (cleanup(), resolve());
			const fail = () => (cleanup(), reject(new Error(v.error?.message || 'load failed')));
			const timer = setTimeout(fail, LOAD_TIMEOUT_MS);
			const cleanup = () => (clearTimeout(timer), v.removeEventListener(event, done), v.removeEventListener('error', fail));
			v.addEventListener(event, done, { once: true });
			v.addEventListener('error', fail, { once: true });
		});

	/** Load clip `index` into `slot` and seek to its start (paused). */
	async function load(slot: number, index: number) {
		const v = videos[slot];
		const clip = reel?.clips[index];
		if (!v || !clip) return;
		const gen = generation;
		slots[slot] = { clip: index, ready: false, failed: false };
		try {
			const src = `${base}${clip.url}`;
			if (v.getAttribute('src') !== src) {
				v.src = src;
				await once(v, 'loadedmetadata');
			}
			if (gen !== generation) return;
			v.currentTime = clipStart(v, index);
			await once(v, 'seeked');
			if (gen === generation) slots[slot] = { clip: index, ready: true, failed: false };
		} catch {
			if (gen === generation) slots[slot] = { clip: index, ready: false, failed: true };
		}
	}

	/** Browsers may block autoplay with sound (phones) — then play muted. */
	const play = (v: HTMLVideoElement) =>
		void v.play().catch(() => {
			v.muted = true;
			void v.play().catch(() => {});
		});

	function tick() {
		if (!reel || reel.startedAt === null || defaultPreview || preview || videos.filter(Boolean).length < SLOTS) return;
		const pos = reelPosition(reel.clips, elapsed(reel));
		if (!pos) return;
		// This clip and the next 2: each in a slot (loading or ready) — a free slot is one not on screen.
		const n = reel.clips.length;
		const wanted = [...new Set(Array.from({ length: Math.min(SLOTS, n) }, (_, k) => (pos.index + k) % n))];
		for (const w of wanted) {
			if (slots.some((s) => s.clip === w)) continue;
			const free = slots.findIndex((s, i) => i !== shown && !wanted.includes(s.clip));
			if (free !== -1) void load(free, w);
		}
		const slot = slots.findIndex((s) => s.clip === pos.index);
		// Its turn but not ready: freeze the previous clip's last frame rather than play past its end.
		if (slot !== shown && shown !== -1 && !slots[slot]?.ready) videos[shown]?.pause();
		if (slot === -1) return;
		const v = videos[slot];
		if (slots[slot].failed) {
			// Skipped: nothing on screen for this clip's turn.
			if (shown !== -1) videos[shown]?.pause();
			shown = -1;
		} else if (slots[slot].ready) {
			const target = clipStart(v, pos.index) + pos.offset;
			if (shown !== slot) {
				v.currentTime = target;
				play(v);
				if (shown !== -1) videos[shown]?.pause();
				shown = slot;
			} else if (Math.abs(v.currentTime - target) > DRIFT) {
				v.currentTime = target;
			}
			if (v.paused) play(v);
		}
	}

	let interval: ReturnType<typeof setInterval>;
	onMount(() => (interval = setInterval(tick, 200)));
	onDestroy(() => {
		clearInterval(interval);
		reset();
	});
</script>

<!-- data-trigger-value: element triggers fire on a new reel for the key, not on every clip swap. -->
<div class={`w-full h-full relative ${style.classValue}`} style={style.cssValue} data-trigger-value={reel?.id ?? ''}>
	{#if defaultPreview}
		<!-- Editor placeholder -->
		<div class="placeholder">▶ Video · key "{key}"</div>
	{:else if !preview}
		{#each Array.from({ length: SLOTS }, (_, i) => i) as i (i)}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video
				bind:this={videos[i]}
				class="clip"
				class:clip--shown={shown === i}
				preload="auto"
				playsinline
				disablepictureinpicture
			/>
		{/each}
	{/if}
</div>

<style>
	.clip { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; }
	.clip--shown { opacity: 1; }
	.placeholder {
		width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
		background: rgba(0, 0, 0, 0.55); color: #fff; font-size: 0.8rem; text-align: center; padding: 0.5rem;
	}
</style>
