<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import CurrentPlayerActionCount from './RecentMatch/RecentMatchCurrentPlayerActionCount.svelte';
	import CurrentPlayerAttackCount from './RecentMatch/RecentMatchCurrentPlayerAttackCount.svelte';
	import CurrentPlayerOverallStats from './RecentMatch/RecentMatchCurrentPlayerOverallStats.svelte';
	import Player1ActionCount from './RecentMatch/RecentMatchPlayer1ActionCount.svelte';
	import Player1AttackCount from './RecentMatch/RecentMatchPlayer1AttackCount.svelte';
	import Player1OverallStats from './RecentMatch/RecentMatchPlayer1OverallStats.svelte';
	import Player2ActionCount from './RecentMatch/RecentMatchPlayer2ActionCount.svelte';
	import Player2AttackCount from './RecentMatch/RecentMatchPlayer2AttackCount.svelte';
	import Player2OverallStats from './RecentMatch/RecentMatchPlayer2OverallStats.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<CurrentPlayerAttackCount {dataItem} {defaultPreview} {style} />
<CurrentPlayerActionCount {dataItem} {defaultPreview} {style} />
<CurrentPlayerOverallStats {dataItem} {defaultPreview} {style} />
<Player1AttackCount {dataItem} {defaultPreview} {style} />
<Player1ActionCount {dataItem} {defaultPreview} {style} />
<Player1OverallStats {dataItem} {defaultPreview} {style} />
<Player2AttackCount {dataItem} {defaultPreview} {style} />
<Player2ActionCount {dataItem} {defaultPreview} {style} />
<Player2OverallStats {dataItem} {defaultPreview} {style} />
