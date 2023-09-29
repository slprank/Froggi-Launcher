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

		const options = dataItem.data.visibility.selectedOption;

		let visible = false;

		if (options[VisibilityOption.Always] === VisibilityToggle.True) visible = true;

		if (options[VisibilityOption.GameRunning] === VisibilityToggle.True)
			if ($gameState === InGameState.Running) visible = true;
		if (options[VisibilityOption.GameRunning] === VisibilityToggle.False)
			if ($gameState !== InGameState.Running) visible = true;

		if (options[VisibilityOption.GamePaused] === VisibilityToggle.True)
			if ($gameState === InGameState.Paused) visible = true;
		if (options[VisibilityOption.GamePaused] === VisibilityToggle.False)
			if ($gameState !== InGameState.Paused) visible = true;

		if (options[VisibilityOption.GameReady] === VisibilityToggle.True)
			if (isGameReady($gameFrame)) visible = true;
		if (options[VisibilityOption.GameReady] === VisibilityToggle.False)
			if (!isGameReady($gameFrame)) visible = true;

		if (options[VisibilityOption.GameGo] === VisibilityToggle.True)
			if (isGameGo($gameFrame)) visible = true;
		if (options[VisibilityOption.GameGo] === VisibilityToggle.False)
			if (!isGameGo($gameFrame)) visible = true;

		const seconds =
			($gameSettings?.startingTimerSeconds ?? 480) - ($gameFrame?.frame ?? 0) / 60;
		if (options[VisibilityOption.GameCountdown] === VisibilityToggle.True) {
			if (isGameCountdown($gameState, seconds)) visible = true;
		}
		if (options[VisibilityOption.GameCountdown] === VisibilityToggle.False) {
			if (!isGameCountdown($gameState, seconds)) visible = true;
		}

		if (options[VisibilityOption.GameEnd] === VisibilityToggle.True)
			if ($gameState === InGameState.Inactive) visible = true;
		if (options[VisibilityOption.GameEnd] === VisibilityToggle.False)
			if ($gameState !== InGameState.Inactive) visible = true;

		return visible;
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
