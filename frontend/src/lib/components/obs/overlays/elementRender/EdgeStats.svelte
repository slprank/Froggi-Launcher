<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { GameStats, MatchStats, OverallTypeExtended, Player } from '$lib/models/types/slippiData';
	import { EDGE_STAT_ELEMENTS, type EdgeStatMetric } from '../elementCategories';
	import TextElement from '../element/TextElement.svelte';

	// Edge cancels (successful / slow) and edgeguards (successful / attempts / %) for Player 1/2 —
	// this game or summed over the set. Players follow the element's slot (Styling → Player).
	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
	export let currentPlayers: Player[];
	export let postGame: GameStats | undefined;
	export let matchStats: MatchStats | undefined;

	// Placeholders: Player 1 ahead, set values ≈ a 3-game set.
	const PREVIEW: Record<'game' | 'match', Record<EdgeStatMetric, [string, string]>> = {
		game: { EdgeCancels: ['3', '1'], EdgeCancelsSlow: ['1', '2'], Edgeguards: ['2', '1'], EdgeguardAttempts: ['4', '3'], EdgeguardPercent: ['50%', '33%'] },
		match: { EdgeCancels: ['8', '5'], EdgeCancelsSlow: ['3', '4'], Edgeguards: ['5', '3'], EdgeguardAttempts: ['11', '9'], EdgeguardPercent: ['45%', '33%'] },
	};

	function textFor(id: number, players: Player[], game: GameStats | undefined, match: MatchStats | undefined): string {
		const def = EDGE_STAT_ELEMENTS.get(id);
		if (!def) return '';
		const side = def.subject === 'Player2' ? 1 : 0;
		if (defaultPreview) return PREVIEW[def.match ? 'match' : 'game'][def.metric][side];
		const playerIndex = players.at(side)?.playerIndex ?? side;
		const stats = def.match ? match : game?.postGameStats;
		const actions = stats?.actionCounts?.find((a) => a.playerIndex === playerIndex);
		const edgeGuard = (stats?.overall?.find((o) => o.playerIndex === playerIndex) as OverallTypeExtended | undefined)?.edgeGuard;
		switch (def.metric) {
			case 'EdgeCancels': return actions ? String(actions.edgeCancelCount?.success ?? 0) : '–';
			case 'EdgeCancelsSlow': return actions ? String(actions.edgeCancelCount?.slow ?? 0) : '–';
			case 'Edgeguards': return edgeGuard ? String(edgeGuard.successfulAttempts) : '–';
			case 'EdgeguardAttempts': return edgeGuard ? String(edgeGuard.totalAttempts) : '–';
			case 'EdgeguardPercent': return edgeGuard?.totalAttempts ? `${Math.round(edgeGuard.successfulAttemptsPercent)}%` : '–';
		}
	}
	$: text = textFor(dataItem.elementId, currentPlayers, postGame, matchStats);
</script>

<TextElement {style} {dataItem}>{text}</TextElement>
