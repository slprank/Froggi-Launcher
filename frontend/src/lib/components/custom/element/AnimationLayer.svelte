<script lang="ts">
	import { AnimationTrigger } from '$lib/models/enum';
	import { gameFrame } from '$lib/utils/store.svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let animationTrigger: AnimationTrigger = AnimationTrigger.None;

	let key: any = undefined;
	const updateKeyValue = () => {
		switch (animationTrigger) {
			case AnimationTrigger.Player1Percent:
				key = $gameFrame?.players[0]?.pre.percent;
			case AnimationTrigger.Player2Percent:
				key = $gameFrame?.players[1]?.pre.percent;
		}
	};
	$: $gameFrame, updateKeyValue();

	// TODO: Use animationTrigger to decide listening value rather than key
</script>

<div class="relative w-full h-full">
	{#if animationTrigger === AnimationTrigger.None}
		<div class="w-full h-full absolute" in:animationIn|local out:animationOut|local>
			<slot />
		</div>
	{:else}
		{#key key}
			<div class="w-full h-full absolute" in:animationIn|local out:animationOut|local>
				<slot />
			</div>
		{/key}
	{/if}
</div>
