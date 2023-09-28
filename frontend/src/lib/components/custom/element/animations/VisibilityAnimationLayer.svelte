<script lang="ts">
	import { VisibilityOption, InGameState } from '$lib/models/enum';
	import type { GridContentItem } from '$lib/models/types';
	import { eventEmitter, gameFrame, gameState } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let preview: boolean;
	export let edit: boolean = false;

	let visible = true;
	const updateVisibilityValue = (): boolean => {
		if (edit || preview) return true;
		if (!dataItem) return false;

		const options = dataItem.data.visibility.selectedOption;

		switch (true) {
			case options[VisibilityOption.Always]:
				return true;
			case options[VisibilityOption.GameRunning]:
				if ($gameState === InGameState.Running) return true;
			case options[VisibilityOption.GamePaused]:
				if ($gameState === InGameState.Paused) return true;
			case options[VisibilityOption.GameReady]:
				if ($gameFrame.frame <= -36) return true;
			case options[VisibilityOption.GameGo]:
				if ($gameFrame.frame >= -36 && $gameFrame.frame <= 0) return true;
			case options[VisibilityOption.GameCountdown]:
				return true; // TODO: Figure out
			case options[VisibilityOption.GameEnd]:
				if ($gameState === InGameState.Inactive) return true;
			default:
				visible = false;
		}
		return false;
	};
	$: {
		$gameState, (visible = updateVisibilityValue());
	}

	onMount(() => {
		if (!edit && !preview) return;
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
