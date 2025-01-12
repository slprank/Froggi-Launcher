<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, gameSettings } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean = false;
	export let style: GridContentItemStyle;

	let currentDifference: number | null;
	$: $gameSettings, (currentDifference = null);
	$: difference =
		($currentPlayer?.rank?.new?.rating ?? 0) - ($currentPlayer?.rank?.current?.rating ?? 0);

	$: difference, (currentDifference = getCurrentDifference(difference));

	const getCurrentDifference = (difference: number) => {
		if (!isNil(currentDifference)) return currentDifference;
		return difference;
	};
</script>

{#if defaultPreview || ($currentPlayer?.rank?.current && $currentPlayer?.rank.new && $currentPlayer.rank.current?.rating !== $currentPlayer.rank.current?.rating)}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `+132.41`
			: $currentPlayer?.rank?.current?.rating
			? `${difference >= 0 && '+'}${difference}`
			: ''}
	</TextElement>
{/if}
