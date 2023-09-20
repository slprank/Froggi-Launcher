<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import AttackCount from './PostGame/AttakCount/CurrentPlayerAttackCount.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<AttackCount {dataItem} {defaultPreview} {style} />
