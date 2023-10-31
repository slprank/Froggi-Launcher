<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import CurrentPlayerActionCount from './PostGame/RecentGameCurrentPlayerActionCount.svelte';
	import CurrentPlayerAttackCount from './PostGame/RecentGameCurrentPlayerAttackCount.svelte';
	import CurrentPlayerOverallStats from './PostGame/RecentGameCurrentPlayerOverallStats.svelte';
	import Player1ActionCount from './PostGame/RecentGamePlayer1ActionCount.svelte';
	import Player1AttackCount from './PostGame/RecentGamePlayer1AttackCount.svelte';
	import Player1OverallStats from './PostGame/RecentGamePlayer1OverallStats.svelte';
	import Player2ActionCount from './PostGame/RecentGamePlayer2ActionCount.svelte';
	import Player2AttackCount from './PostGame/RecentGamePlayer2AttackCount.svelte';
	import Player2OverallStats from './PostGame/RecentGamePlayer2OverallStats.svelte';

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
