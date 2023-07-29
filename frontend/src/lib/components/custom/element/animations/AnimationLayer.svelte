<script lang="ts">
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { AnimationTrigger, PlayerActionState } from '$lib/models/enum';
	import { gameFrame, eventEmitter } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let animationTrigger: AnimationTrigger = AnimationTrigger.None;
	export let display: boolean = false;
	export let edit: boolean = false;

	let key: any = undefined;
	const updateKeyValue = () => {
		switch (animationTrigger) {
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
		$eventEmitter.on('animation_test_trigger', () => {
			const tempKey = key;
			const tempDisplay = display;
			key = Math.random();
			display = !display;
			setTimeout(() => {
				key = tempKey;
				display = !tempDisplay;
			});
		});
	});

	$: console.log('display:', display);
</script>

<div class="relative w-full h-full">
	{#if edit}
		<div class="w-full h-full absolute z-2 top-0 left-0">
			<slot />
		</div>
	{:else if animationTrigger === AnimationTrigger.Visibility}
		{#if display}
			<div
				class="w-full h-full absolute z-3 top-0 left-0"
				in:animationIn|local
				out:animationOut|local
			>
				<slot />
			</div>
		{/if}
	{:else}
		{#key key}
			<div
				class="w-full h-full absolute z-4 top-0 left-0"
				in:animationIn|local
				out:animationOut|local
			>
				<slot />
			</div>
		{/key}
	{/if}
</div>
