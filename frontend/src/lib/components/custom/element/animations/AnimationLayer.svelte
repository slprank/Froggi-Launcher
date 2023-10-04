<script lang="ts">
	import type { GridContentItem } from '$lib/models/types';
	import { AnimationTrigger } from '$lib/models/types/animationOption';
	import { eventEmitter, gameFrame } from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import { onMount } from 'svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let edit: boolean = false;

	let key: number | undefined = 0;
	let prevFrame: FrameEntryType | null;
	let prevSecond: number | undefined;
	const updateKeyValue = (): number | undefined => {
		if (!dataItem) return;
		if (!prevFrame) {
			prevFrame = $gameFrame;
			return;
		}

		const currentSecond = Math.ceil((($gameFrame?.frame ?? 0) * 16) / 1000);
		const option = dataItem.data.animationTrigger.selectedOptions;

		if (option[AnimationTrigger.GameCountdown])
			if (currentSecond > (prevSecond ?? 0)) return Math.random();

		if (option[AnimationTrigger.Player1Percent]) {
			if (
				($gameFrame?.players[0]?.pre.percent ?? 0) >
				(prevFrame?.players[0]?.pre.percent ?? 0)
			)
				return Math.random();
		}

		if (option[AnimationTrigger.Player2Percent])
			if (
				($gameFrame?.players[1]?.pre.percent ?? 0) >
				(prevFrame?.players[1]?.pre.percent ?? 0)
			)
				return Math.random();

		if (option[AnimationTrigger.Player1StockLost])
			if (
				($gameFrame?.players[0]?.post.stocksRemaining ?? 0) >
				(prevFrame?.players[0]?.post.stocksRemaining ?? 0)
			)
				return Math.random();

		if (option[AnimationTrigger.Player2StockLost])
			if (
				($gameFrame?.players[0]?.post.stocksRemaining ?? 0) >
				(prevFrame?.players[0]?.post.stocksRemaining ?? 0)
			)
				return Math.random();

		prevSecond = currentSecond;
		prevFrame = $gameFrame;
		return key;
	};

	$: $gameFrame, (key = updateKeyValue());

	onMount(() => {
		$eventEmitter.on('animation-test-trigger', () => {
			const tempKey = key;
			key = Math.random();
			setTimeout(() => {
				key = tempKey;
			});
		});
	});
</script>

{#if edit}
	<div class="w-full h-full absolute top-0 left-0">
		<slot />
	</div>
{:else}
	{#key key}
		<div
			class="w-full h-full absolute top-0 left-0"
			in:animationIn|local
			out:animationOut|local
		>
			<slot />
		</div>
	{/key}
{/if}
