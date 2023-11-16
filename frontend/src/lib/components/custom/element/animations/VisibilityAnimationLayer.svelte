<script lang="ts">
	import type { GridContentItem } from '$lib/models/types/overlay';
	import { eventEmitter, gameFrame, gameState } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	import { inGameVisibilityOption } from './InGameVisibilityOptions.svelte';
	import { postGameVisibilityOption } from './PostGameVisibilityOptions.svelte';
	import { postGame1SummaryVisibilityOption } from './PostGame1SummaryVisibilityOptions.svelte';
	import { postGame2SummaryVisibilityOption } from './PostGame2SummaryVisibilityOptions.svelte';
	import { postGame3SummaryVisibilityOption } from './PostGame3SummaryVisibilityOptions.svelte';
	import { postGame4SummaryVisibilityOption } from './PostGame4SummaryVisibilityOptions.svelte';
	import { postGame5SummaryVisibilityOption } from './PostGame5SummaryVisibilityOptions.svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let preview: boolean;
	export let edit: boolean = false;

	let visible = true;
	const updateVisibilityValue = async () => {
		if (edit || preview) return true;
		if (!dataItem) return false;

		const options = dataItem.data.visibility.selectedOptions;

		visible = options.every(async (option) => {
			const inGameOptions = await inGameVisibilityOption(option);
			const postGameOptions = await postGameVisibilityOption(option);
			const postGame1SummaryOptions = await postGame1SummaryVisibilityOption(option);
			const postGame2SummaryOptions = await postGame2SummaryVisibilityOption(option);
			const postGame3SummaryOptions = await postGame3SummaryVisibilityOption(option);
			const postGame4SummaryOptions = await postGame4SummaryVisibilityOption(option);
			const postGame5SummaryOptions = await postGame5SummaryVisibilityOption(option);

			return (
				inGameOptions ||
				postGameOptions ||
				postGame1SummaryOptions ||
				postGame2SummaryOptions ||
				postGame3SummaryOptions ||
				postGame4SummaryOptions ||
				postGame5SummaryOptions
			);
		});
	};

	$: {
		$gameState, $gameFrame, updateVisibilityValue();
	}

	onMount(() => {
		if (!edit && !preview) return;
		$eventEmitter.on('animation-test-visibility', () => {
			visible = !visible;
		});
	});
</script>

{#if edit}
	<div class="w-full h-full absolute top-0 left-0">
		<slot />
	</div>
{:else if visible}
	<div class="w-full h-full" in:animationIn|local out:animationOut|local>
		<slot />
	</div>
{/if}
