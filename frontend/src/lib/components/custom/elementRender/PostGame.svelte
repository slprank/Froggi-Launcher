<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import CurrentPlayerActionCount from './PostGame/CurrentPlayerActionCount.svelte';
	import CurrentPlayerAttackCount from './PostGame/CurrentPlayerAttackCount.svelte';
	import CurrentPlayerOverallStats from './PostGame/CurrentPlayerOverallStats.svelte';
	import Player1ActionCount from './PostGame/Player1ActionCount.svelte';
	import Player1AttackCount from './PostGame/Player1AttackCount.svelte';
	import Player1OverallStats from './PostGame/Player1OverallStats.svelte';
	import Player2ActionCount from './PostGame/Player2ActionCount.svelte';
	import Player2AttackCount from './PostGame/Player2AttackCount.svelte';
	import Player2OverallStats from './PostGame/Player2OverallStats.svelte';

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
