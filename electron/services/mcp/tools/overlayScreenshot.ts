import { BrowserWindow } from 'electron';
import path from 'path';
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { mcpContext } from '../mcpContext';
import { BACKEND_PORT } from '../../../../frontend/src/lib/models/const';
import { LiveStatsScene } from '../../../../frontend/src/lib/models/enum';
import { HUD_REFERENCES } from '../../../../frontend/src/lib/content/hudReferences';
import { previewStateFromReplay, storePreviewState } from '../../../utils/previewStates';

const STATS_SCENES = Object.values(LiveStatsScene) as [string, ...string[]];
const MAX_WAIT_MS = 15000; // a cold dev server can take a while; normally ~2 s

/** Render a URL in a hidden window and return a PNG (base64). Never shown, never touches live overlays. */
async function capture(url: string, width: number, height: number): Promise<string> {
	const win = new BrowserWindow({
		show: false,
		width,
		height,
		useContentSize: true,
		frame: false,
		webPreferences: { offscreen: true, backgroundThrottling: false },
	});
	try {
		await win.loadURL(url);
		// The page flags __froggiReady once the overlay and state are in and animations have run.
		const deadline = Date.now() + MAX_WAIT_MS;
		while (Date.now() < deadline && !(await win.webContents.executeJavaScript('window.__froggiReady === true').catch(() => false))) {
			await new Promise((resolve) => setTimeout(resolve, 200));
		}
		return (await win.webContents.capturePage()).toPNG().toString('base64');
	} finally {
		win.destroy();
	}
}

const sizeFor = (ratio: { width: number; height: number } | undefined) => {
	const w = ratio?.width || 16;
	const h = ratio?.height || 9;
	return w >= h ? { width: 1280, height: Math.round((1280 * h) / w) } : { width: Math.round((1280 * w) / h), height: 1280 };
};

export function registerOverlayScreenshotTools(server: McpServer) {
	server.registerTool(
		'capture_overlay_screenshot',
		{
			description:
				'Take a screenshot of an overlay so YOU can see it (returns a PNG image) — use it to check your work after building or changing an overlay, and to compare against a HUD reference. Pick the scene with statsScene (default inGame) and the game state: replay = "latest" or 0–9 (0 = newest of the 10 latest replays in the user\'s Slippi folder) shown at atSeconds after GO — players, characters, percent, stocks, timer, team data and fight stats are that game\'s at that moment; postGame/postSet scenes show its result. Omit replay to see the editor\'s placeholder data (same as the editor). Pass background = a get_game_hud_reference id to see the overlay over the game. Rendered in a hidden window: the user\'s OBS and live overlays are not affected. Takes ~2–5 s.',
			inputSchema: {
				overlayId: z.string(),
				statsScene: z.enum(STATS_SCENES).optional(),
				background: z.string().optional().describe('HUD reference id to draw behind the overlay'),
				replay: z.union([z.literal('latest'), z.number().int().min(0).max(9)]).optional(),
				atSeconds: z.number().min(0).optional().describe('Seconds after GO (default 30; clamped to the game)'),
			},
		},
		async ({ overlayId, statsScene, background, replay, atSeconds }) => {
			const overlay = await mcpContext.overlayStore!.getOverlayById(overlayId);
			if (!overlay) return { isError: true, content: [{ type: 'text' as const, text: `No overlay with id "${overlayId}"` }] };
			if (background && !HUD_REFERENCES.some((r) => r.id === background)) {
				return { isError: true, content: [{ type: 'text' as const, text: `Unknown background "${background}" — use an id from get_game_hud_reference.` }] };
			}

			let stateId = '';
			let note = 'placeholder data';
			if (replay !== undefined) {
				const files = (await mcpContext.statsDisplay?.latestReplayFiles()) ?? [];
				const file = files[replay === 'latest' ? 0 : replay];
				if (!file) return { isError: true, content: [{ type: 'text' as const, text: 'No replay found at that index — is the Slippi replay folder set in Slippi Launcher?' }] };
				const state = previewStateFromReplay(file, atSeconds ?? 30);
				if (!state) return { isError: true, content: [{ type: 'text' as const, text: `Could not read ${path.basename(file)}` }] };
				stateId = storePreviewState(state);
				const who = state.currentPlayers.map((p) => p.displayName || p.connectCode || `Port ${p.port}`).join(' vs ');
				note = `replay ${path.basename(file)} (${who}${state.gameSettings.isTeams ? ', doubles' : ''}) at ${atSeconds ?? 30}s`;
			}

			const scene = statsScene ?? LiveStatsScene.InGame;
			const params = new URLSearchParams({ scene });
			if (background) params.set('bg', background);
			if (stateId) params.set('state', stateId);
			const { width, height } = sizeFor(overlay.aspectRatio);
			const png = await capture(`http://127.0.0.1:${BACKEND_PORT}/obs/overlay/${overlayId}/preview?${params}`, width, height);
			return {
				content: [
					{ type: 'image' as const, data: png, mimeType: 'image/png' },
					{ type: 'text' as const, text: `"${overlay.title}" — scene ${scene}, ${note}, ${width}×${height}.` },
				],
			};
		},
	);
}
