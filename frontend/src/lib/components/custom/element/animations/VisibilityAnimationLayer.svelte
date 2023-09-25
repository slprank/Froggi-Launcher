<script lang="ts">
	import { AnimationTrigger, ElementVisibilityOption, InGameState } from '$lib/models/enum';
	import type { GridContentItem } from '$lib/models/types';
	import { eventEmitter, gameState } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let preview: boolean;
	export let edit: boolean = false;

	let visible = true;
	const updateVisibilityValue = () => {
		if (edit || preview) {
			visible = true;
			return;
		}
		if (!dataItem) return;
		switch (dataItem.data.visibility.key) {
			case ElementVisibilityOption.Always:
				visible = true;
				return;
			case ElementVisibilityOption.GameRunning:
				visible = $gameState === InGameState.Running;
				return;
			case ElementVisibilityOption.GamePaused:
				visible = $gameState === InGameState.Paused;
				return;
		}
	};
	$: $gameState, updateVisibilityValue();

	onMount(() => {
		$eventEmitter.on('animation_test_visibility', () => {
			const tempVisible = visible;
			visible = !visible;
			setTimeout(() => {
				visible = !tempVisible;
			});
		});
	});
</script>

{#if edit}
	<div class="w-full h-full absolute top-0 left-0">
		<slot />
	</div>
{:else if visible}
	<div class="w-full h-full absolute top-0 left-0" in:animationIn|local out:animationOut|local>
		<slot />
	</div>
{/if}
