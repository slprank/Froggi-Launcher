<script lang="ts">
	import { AnimationTrigger } from '$lib/models/enum';
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let animationTrigger: AnimationTrigger = AnimationTrigger.None;
	export let display: boolean = false;
	export let edit: boolean = false;
	export let key: any = undefined;

	$: console.log('paused', display);

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
