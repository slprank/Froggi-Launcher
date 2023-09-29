<script lang="ts">
	import { VisibilityOption, InGameState } from '$lib/models/enum';
	import type { GridContentItem } from '$lib/models/types';
	import { eventEmitter, gameFrame, gameSettings, gameState } from '$lib/utils/store.svelte';
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

		if (options[VisibilityOption.Always]) visible = true;

		if (options[VisibilityOption.GameRunning])
			if ($gameState === InGameState.Running) visible = true;

		if (options[VisibilityOption.GamePaused])
			if ($gameState === InGameState.Paused) visible = true;

		if (options[VisibilityOption.GameReady])
			if (($gameFrame?.frame ?? 0) <= -36) visible = true;

		if (options[VisibilityOption.GameGo])
			if (($gameFrame?.frame ?? 0) >= -36 && ($gameFrame?.frame ?? 0) < 0) visible = true;

		if (options[VisibilityOption.GameCountdown]) {
			const seconds =
				($gameSettings?.startingTimerSeconds ?? 480) - ($gameFrame?.frame ?? 0) / 60;
			if (seconds > 0 && seconds < 6) visible = true;
		}

		if (options[VisibilityOption.GameEnd])
			if ($gameState === InGameState.Inactive) visible = true;

		return visible;
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
	<div class="w-full h-full relative">
		<div
			class="w-full h-full absolute top-0 left-0"
			in:animationIn|local
			out:animationOut|local
		>
			<slot />
		</div>
	</div>
{/if}
