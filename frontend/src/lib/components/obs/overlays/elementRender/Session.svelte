<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import CurrentGameSession from './Session/CurrentGameSession.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<CurrentGameSession {dataItem} {defaultPreview} {style} />
