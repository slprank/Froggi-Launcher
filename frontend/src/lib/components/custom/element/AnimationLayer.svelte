<script lang="ts">
	import { AnimationTrigger, LiveStatsScene } from '$lib/models/enum';
	import { gameFrame, statsScene } from '$lib/utils/store.svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let animationTrigger: AnimationTrigger = AnimationTrigger.None;
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
				key = $gameFrame?.players[0]?.pre.percent;
				return;
			case AnimationTrigger.Player2StockLost:
				key = $gameFrame?.players[1]?.pre.percent;
				return;
		}
	};
	$: $gameFrame, updateKeyValue();
</script>

<div class="relative w-full h-full">
	{#if edit}
		<div class="w-full h-full absolute z-2 top-0 left-0">
			<slot />
		</div>
	{:else if animationTrigger === AnimationTrigger.Visibility}
		<div class="w-full h-full absolute z-3 top-0 left-0" in:animationIn out:animationOut>
			<slot />
		</div>
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
