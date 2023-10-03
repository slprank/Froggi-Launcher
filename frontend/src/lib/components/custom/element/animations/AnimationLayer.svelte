<script lang="ts">
	import { AnimationTrigger } from '$lib/models/enum';
	import type { GridContentItem } from '$lib/models/types';
	import { eventEmitter, gameFrame } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let edit: boolean = false;

	let key: any = undefined;
	const updateKeyValue = () => {
		if (!dataItem) return;
		switch (dataItem.data.animation.trigger) {
			case AnimationTrigger.Player1Percent:
				key = $gameFrame?.players[0]?.pre.percent;
				return;
			case AnimationTrigger.Player2Percent:
				key = $gameFrame?.players[1]?.pre.percent;
				return;
			case AnimationTrigger.Player1StockLost:
				key = $gameFrame?.players[0]?.post.stocksRemaining;
				return;
			case AnimationTrigger.Player2StockLost:
				key = $gameFrame?.players[1]?.post.stocksRemaining;
				return;
		}
	};
	$: $gameFrame, updateKeyValue();

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
