<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import ActionCount from './PostGame/ActionCount.svelte';
	import AttackCount from './PostGame/AttackCount.svelte';
	import OverallStats from './PostGame/OverallStats.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<AttackCount {dataItem} {defaultPreview} {style} />
<ActionCount {dataItem} {defaultPreview} {style} />
<OverallStats {dataItem} {defaultPreview} {style} />
