<script lang="ts">
	import type { GridContentItem } from '$lib/models/types/overlay';
	import { eventEmitter, gameFrame, gameState } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	import { inGameVisibilityOption } from './InGameVisibilityOptions.svelte';
	import { postGameVisibilityOption } from './PostGameVisibilityOptions.svelte';
	import { postGameMatchVisibilityOption } from './PostGameMatchVisibilityOptions.svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let preview: boolean;
	export let edit: boolean = false;

	$: console.log($gameState);

	let visible = true;
	const updateVisibilityValue = async () => {
		if (edit || preview) return true;
		if (!dataItem) return false;

		const options = dataItem.data.visibility.selectedOptions;

		const inGameOptions = await inGameVisibilityOption(options);
		const postGameOptions = await postGameVisibilityOption(options);
		const postGameMatchOptions = await postGameMatchVisibilityOption(options);

		visible = inGameOptions || postGameOptions || postGameMatchOptions;
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
