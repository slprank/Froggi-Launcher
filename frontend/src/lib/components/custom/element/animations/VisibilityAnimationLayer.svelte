<script lang="ts">
	import { VisibilityOption, InGameState } from '$lib/models/enum';
	import type { GridContentItem } from '$lib/models/types';
	import { VisibilityToggle } from '$lib/models/types/animationOption';
	import { eventEmitter, gameFrame, gameSettings, gameState } from '$lib/utils/store.svelte';
	import type { FrameEntryType, FrameStartType } from '@slippi/slippi-js';
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

		const options = dataItem.data.visibility.selectedOptions;
		return options.every((option) => {
			if (option[VisibilityOption.GameRunning] === VisibilityToggle.True)
				if ($gameState === InGameState.Running) return true;
			if (option[VisibilityOption.GameRunning] === VisibilityToggle.False)
				if ($gameState !== InGameState.Running) return true;

			if (option[VisibilityOption.GamePaused] === VisibilityToggle.True)
				if ($gameState === InGameState.Paused) return true;
			if (option[VisibilityOption.GamePaused] === VisibilityToggle.False)
				if ($gameState !== InGameState.Paused) return true;

			if (option[VisibilityOption.GameReady] === VisibilityToggle.True)
				if (isGameReady($gameFrame)) return true;
			if (option[VisibilityOption.GameReady] === VisibilityToggle.False)
				if (!isGameReady($gameFrame)) return true;

			if (option[VisibilityOption.GameGo] === VisibilityToggle.True)
				if (isGameGo($gameFrame)) return true;
			if (option[VisibilityOption.GameGo] === VisibilityToggle.False)
				if (!isGameGo($gameFrame)) return true;

			const seconds =
				($gameSettings?.startingTimerSeconds ?? 480) - ($gameFrame?.frame ?? 0) / 60;
			if (option[VisibilityOption.GameCountdown] === VisibilityToggle.True) {
				if (isGameCountdown($gameState, seconds)) visible = true;
			}
			if (option[VisibilityOption.GameCountdown] === VisibilityToggle.False) {
				if (!isGameCountdown($gameState, seconds)) visible = true;
			}

			if (option[VisibilityOption.GameEnd] === VisibilityToggle.True)
				if ($gameState === InGameState.Inactive) visible = true;
			if (option[VisibilityOption.GameEnd] === VisibilityToggle.False)
				if ($gameState !== InGameState.Inactive) visible = true;
		});
	};

	const isGameReady = (gameFrame: FrameEntryType | null) => {
		return (gameFrame?.frame ?? 0) <= -36;
	};

	const isGameGo = (gameFrame: FrameEntryType | null) => {
		return (gameFrame?.frame ?? 0) >= -36 && (gameFrame?.frame ?? 0) < 0;
	};
	const isGameCountdown = (gameState: InGameState, seconds: number) => {
		return gameState !== InGameState.Inactive && seconds > 0 && seconds < 5;
	};

	$: {
		$gameState, $gameFrame, (visible = updateVisibilityValue());
	}

	onMount(() => {
		if (!edit && !preview) return;
		$eventEmitter.on('animation_test_visibility', () => {
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
