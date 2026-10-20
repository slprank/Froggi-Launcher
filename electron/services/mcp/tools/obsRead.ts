import { z } from 'zod';
import { nativeImage } from 'electron';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { mcpContext } from '../mcpContext';
import { ConnectionState } from '../../../../frontend/src/lib/models/enum';
import { obsStatus } from '../../../../frontend/src/lib/utils/obsStatus';
import { isObsRunning } from '../../../utils/obsProcess';

const text = (value: unknown) => ({ content: [{ type: 'text' as const, text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] });
const error = (message: string) => ({ content: [{ type: 'text' as const, text: message }], isError: true });

/** Why there is no connection: OBS closed (set up before), open but not connected, or never set up. */
const notConnected = async () => {
	const status = obsStatus(mcpContext.storeObs?.getConnection(), await isObsRunning());
	if (status === 'closed') return 'OBS is closed. Froggi has connected to it before, so it is set up — ask the user to open OBS; Froggi reconnects by itself.';
	if (status === 'openNotConnected') return 'OBS is open but Froggi is not connected (WebSocket server off, or a different port/password). Point the user to Stream → OBS Connection — with write access, obs_enable_and_connect can fix it.';
	if (status === 'connecting') return 'Froggi is connecting to OBS right now — try again in a few seconds.';
	return 'OBS has not been set up with Froggi yet. Explain Stream → OBS Connection ("Set up OBS automatically" with OBS open) — with write access, obs_enable_and_connect does it.';
};

/** OBS calls that fail when a feature is off (no studio mode, no replay buffer, a non-audio input) → null. */
const optional = async <T>(call: () => Promise<T>): Promise<T | null> => {
	try {
		return await call();
	} catch {
		return null;
	}
};

/** True when every pixel of the PNG is the same colour (a black/blank capture). */
const isOneColour = (base64: string) => {
	const bitmap = nativeImage.createFromBuffer(Buffer.from(base64, 'base64')).toBitmap();
	for (let i = 4; i < bitmap.length; i += 4) {
		if (bitmap[i] !== bitmap[0] || bitmap[i + 1] !== bitmap[1] || bitmap[i + 2] !== bitmap[2]) return false;
	}
	return bitmap.length > 0;
};

const connected = () => mcpContext.storeObs?.getConnectionState() === ConnectionState.Connected && !!mcpContext.obsWebSocket;

/**
 * Read-only view into the user's OBS (through Froggi's OBS WebSocket connection): what is on the
 * stream and how it is built, so the assistant can answer "why is X not showing" or plan scenes.
 * Nothing here changes OBS.
 */
export function registerObsReadTools(server: McpServer) {
	server.registerTool(
		'get_obs_layout',
		{
			description:
				"Read the user's OBS setup (read-only): every scene with its sources (name, kind, visible, position/size in canvas px, locked), the current program + preview scene, audio inputs (volume dB, muted), stream / recording / replay-buffer status, and the canvas + output resolution and FPS. Use it to explain why something is not showing (hidden source, wrong scene, source off-canvas or zero-size, muted input), before suggesting scene changes, and to find the scene/source names for automations and flows. Pair with get_obs_screenshot to see the result.",
			inputSchema: { scene: z.string().optional().describe('Only this scene (default: all scenes).') },
		},
		async ({ scene }) => {
			if (!connected()) return error(await notConnected());
			const obs = mcpContext.obsWebSocket!.obs;
			const list = await obs.call('GetSceneList');
			const names = (list.scenes as { sceneName: string }[]).map((s) => s.sceneName).filter((n) => !scene || n === scene);
			if (scene && !names.length) return error(`No OBS scene "${scene}". Scenes: ${(list.scenes as { sceneName: string }[]).map((s) => s.sceneName).join(', ')}`);
			const scenes = await Promise.all(
				names.map(async (sceneName) => {
					const items = (await obs.call('GetSceneItemList', { sceneName })).sceneItems as Record<string, unknown>[];
					return {
						name: sceneName,
						// OBS lists bottom → top; top first reads like the OBS sources panel.
						sources: items.reverse().map((i) => {
							const t = (i.sceneItemTransform ?? {}) as Record<string, number>;
							return {
								name: i.sourceName,
								kind: i.inputKind ?? (i.isGroup ? 'group' : 'scene'),
								visible: i.sceneItemEnabled,
								locked: i.sceneItemLocked,
								x: Math.round(t.positionX ?? 0),
								y: Math.round(t.positionY ?? 0),
								width: Math.round(t.width ?? 0),
								height: Math.round(t.height ?? 0),
							};
						}),
					};
				}),
			);
			const inputs = (await obs.call('GetInputList')).inputs as { inputName: string; inputKind: string }[];
			const audio = (
				await Promise.all(
					inputs.map(async (input) => {
						const volume = await optional(() => obs.call('GetInputVolume', { inputName: input.inputName }));
						if (!volume) return null; // not an audio input
						const mute = await optional(() => obs.call('GetInputMute', { inputName: input.inputName }));
						return { name: input.inputName, kind: input.inputKind, volumeDb: Math.round(volume.inputVolumeDb * 10) / 10, muted: mute?.inputMuted ?? null };
					}),
				)
			).filter(Boolean);
			const [stream, record, replayBuffer, video, preview] = await Promise.all([
				optional(() => obs.call('GetStreamStatus')),
				optional(() => obs.call('GetRecordStatus')),
				optional(() => obs.call('GetReplayBufferStatus')),
				optional(() => obs.call('GetVideoSettings')),
				optional(() => obs.call('GetCurrentPreviewScene')),
			]);
			return text({
				programScene: list.currentProgramSceneName,
				previewScene: preview?.currentPreviewSceneName ?? null, // null = studio mode off
				scenes,
				audio,
				streaming: stream ? { active: stream.outputActive, timecode: stream.outputTimecode, droppedFrames: stream.outputSkippedFrames } : null,
				recording: record ? { active: record.outputActive, paused: record.outputPaused, timecode: record.outputTimecode } : null,
				replayBuffer: replayBuffer ? { active: replayBuffer.outputActive } : 'not set up in OBS',
				video: video
					? { canvas: `${video.baseWidth}x${video.baseHeight}`, output: `${video.outputWidth}x${video.outputHeight}`, fps: Math.round((video.fpsNumerator / video.fpsDenominator) * 100) / 100 }
					: null,
			});
		},
	);

	server.registerTool(
		'get_obs_screenshot',
		{
			description:
				"See what OBS shows (read-only): a PNG of the program output (what viewers see), or of any scene or source by name. Use it to check an overlay in its real place on the stream, spot hidden/overlapping sources, or compare the stream with the user's description. It shows the user's stream — webcams and windows included — so only take it when it helps with what they asked.",
			inputSchema: {
				source: z.string().optional().describe('Scene or source name (default: the current program scene).'),
				width: z.number().int().min(160).max(1920).default(1280).describe('Image width in px (height follows the aspect ratio).'),
			},
		},
		async ({ source, width }) => {
			if (!connected()) return error(await notConnected());
			const obs = mcpContext.obsWebSocket!.obs;
			const sourceName = source ?? (await obs.call('GetCurrentProgramScene')).currentProgramSceneName;
			try {
				const shot = await obs.call('GetSourceScreenshot', { sourceName, imageFormat: 'png', imageWidth: width });
				const data = shot.imageData.replace(/^data:image\/png;base64,/, '');
				const blank = isOneColour(data);
				return {
					content: [
						{ type: 'image' as const, data, mimeType: 'image/png' },
						{
							type: 'text' as const,
							text:
								`OBS ${source ? `"${sourceName}"` : `program scene "${sourceName}"`}` +
								(blank
									? ' — the image is a single colour: the scene is empty or its sources are not producing video (camera/screen capture not started or blocked by OS permissions, e.g. macOS Screen Recording / Camera for OBS, or a game/window capture whose target is closed). Check the sources with get_obs_layout.'
									: ''),
						},
					],
				};
			} catch (err) {
				return error(`OBS could not capture "${sourceName}": ${err instanceof Error ? err.message : String(err)} — check the name with get_obs_layout.`);
			}
		},
	);
}
