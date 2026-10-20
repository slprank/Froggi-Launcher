<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import { liveFightStats } from '$lib/utils/store.svelte';
	import { avgDeathPercent, avgKoPercent, sumFightStats, type FightStats, type LiveFightStats } from '$lib/utils/fightStats';
	import { playerKey } from '$lib/utils/teams';
	import { FIGHT_STAT_ELEMENTS } from '../elementCategories';
	import TextElement from '../element/TextElement.svelte';

	// Live damage / KOs / avg KO % / avg death %. Players: slot order [T1P1, T2P1, T1P2, T2P2] (or the
	// element's chosen slot). Teams: slots 0+2 and 1+3 — in singles a "team" is just that player.
	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
	export let currentPlayers: Player[];
	export let allPlayers: Player[];

	// Placeholders tell one consistent story: Player 1 / team 1 wins this game 4 KOs to 2 and leads a
	// 3-game set (10 KOs to 9) — each side's KOs are the other side's deaths.
	const PREVIEW: Record<'game' | 'match', [Record<string, string>, Record<string, string>]> = {
		game: [
			{ Damage: '412%', Kos: '4', AvgKoPercent: '118%', AvgDeathPercent: '131%' },
			{ Damage: '356%', Kos: '2', AvgKoPercent: '131%', AvgDeathPercent: '118%' },
		],
		match: [
			{ Damage: '1184%', Kos: '10', AvgKoPercent: '121%', AvgDeathPercent: '127%' },
			{ Damage: '1093%', Kos: '9', AvgKoPercent: '127%', AvgDeathPercent: '121%' },
		],
	};

	function textFor(id: number, stats: LiveFightStats, mine: Player[], all: Player[]): string {
		const def = FIGHT_STAT_ELEMENTS.get(id);
		if (!def) return '';
		if (defaultPreview) return PREVIEW[def.match ? 'match' : 'game'][def.subject === 'Player2' || def.subject === 'Team2' ? 1 : 0][def.metric];
		const byKey = def.match ? stats.match : stats.game;
		const of = (p: Player | undefined) => (p ? byKey[playerKey(p)] : undefined);
		const s: FightStats | undefined =
			def.subject === 'Player1' ? of(mine.at(0))
			: def.subject === 'Player2' ? of(mine.at(1))
			: sumFightStats((def.subject === 'Team1' ? [0, 2] : [1, 3]).map((i) => of(all[i])));
		if (!s) return '';
		switch (def.metric) {
			case 'Damage': return `${Math.round(s.damage)}%`;
			case 'Kos': return String(s.kos);
			case 'AvgKoPercent': return s.kos ? `${Math.round(avgKoPercent(s))}%` : '-';
			case 'AvgDeathPercent': return s.deaths ? `${Math.round(avgDeathPercent(s))}%` : '-';
		}
	}
	$: text = textFor(dataItem.elementId, $liveFightStats, currentPlayers, allPlayers);
</script>

<TextElement {style} {dataItem}>{text}</TextElement>
