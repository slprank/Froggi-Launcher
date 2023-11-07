<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import RecentGame1 from './RecentMatchSummary/Game1.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<RecentGame1 {dataItem} {defaultPreview} {style} />
