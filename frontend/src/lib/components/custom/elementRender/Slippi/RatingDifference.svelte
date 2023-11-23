<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { CurrentPlayer } from '$lib/models/types/slippiData';
	import { currentPlayer } from '$lib/utils/store.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean = false;
	export let style: GridContentItemStyle;

	$: difference =
		($currentPlayer?.rank?.new?.rating ?? 0) - ($currentPlayer?.rank?.current?.rating ?? 0);
</script>

{#if defaultPreview || ($currentPlayer?.rank.current && $currentPlayer?.rank.new && $currentPlayer.rank.current?.rating !== $currentPlayer.rank.current?.rating)}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `+132.41`
			: $currentPlayer?.rank?.current?.rating
			? `${difference >= 0 && '+'}${difference}`
			: ''}
	</TextElement>
{/if}
