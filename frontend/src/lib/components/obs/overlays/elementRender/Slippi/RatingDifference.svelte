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

	$: currentDifference = getCurrentDifference(difference);

	const getCurrentDifference = (difference: number) => {
		if (!isNil(currentDifference)) return currentDifference;
		if (difference < 0.1) return Number(difference.toFixed(2));
		return Number(difference.toFixed(1));
	};
</script>

{#if defaultPreview || !isNil(currentDifference)}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `+132.41`
			: currentDifference
			? `${currentDifference >= 0 ? '+' : ''}${currentDifference}`
			: '+0'}
	</TextElement>
{/if}
