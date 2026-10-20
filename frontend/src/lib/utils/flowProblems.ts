import { LiveStatsScene } from '../models/enum';
import type { Flow, FlowFailure } from '../models/types/flow';
import { validateFlow } from './flowEngine';

/** Readable scene names (same words as the scene bar). */
export const SCENE_NAMES: Record<LiveStatsScene, string> = {
	[LiveStatsScene.WaitingForDolphin]: 'Waiting',
	[LiveStatsScene.Menu]: 'Menu',
	[LiveStatsScene.InGame]: 'In Game',
	[LiveStatsScene.PostGame]: 'Post Game',
	[LiveStatsScene.PostSet]: 'Post Set',
	[LiveStatsScene.RankChange]: 'Rank Change',
	[LiveStatsScene.StrikePhase]: 'Stage Striking',
};

export interface FlowProblem {
	level: 'warning' | 'error';
	kind: 'scene' | 'invalid' | 'failure';
	message: string;
	flowId?: string;
	scene?: LiveStatsScene;
	at?: string;
}

/**
 * Everything worth a look on Flows → Problems (and MCP get_flow_problems). Generic: Froggi does not know
 * which flow is "the" scene flow — it only checks that every scene can be reached by an enabled
 * "Set Froggi scene" card, that enabled flows are valid, and lists recent action failures.
 */
export function flowProblems(flows: Flow[], failures: FlowFailure[] = []): FlowProblem[] {
	const enabled = flows.filter((f) => f.enabled);
	const reached = new Set(
		enabled.flatMap((f) => f.nodes.flatMap((n) => (n.kind === 'action' && n.data.type === 'setScene' ? [n.data.scene] : []))),
	);
	const scenes: FlowProblem[] = Object.values(LiveStatsScene)
		.filter((scene) => !reached.has(scene))
		.map((scene) => ({
			level: 'warning',
			kind: 'scene',
			scene,
			message: `No enabled flow switches to ${SCENE_NAMES[scene]} — that scene only shows when picked by hand.`,
		}));
	const invalid: FlowProblem[] = enabled.flatMap((f) => {
		const problems = validateFlow(f);
		return problems.length ? [{ level: 'error' as const, kind: 'invalid' as const, flowId: f.id, message: `"${f.name}": ${problems.join(' · ')}` }] : [];
	});
	const failed: FlowProblem[] = failures.map((f) => ({ level: 'error', kind: 'failure', flowId: f.flowId, at: f.at, message: `"${f.flowName}" — ${f.action} failed: ${f.message}` }));
	return [...invalid, ...failed, ...scenes];
}
