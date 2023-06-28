<script lang="ts">
	export let enableTransition: boolean = false;
	export let animationIn: Function;
	export let animationOut: Function;
	export let key: any | undefined = undefined;

	// TODO: Trigger animation on the animation option values? if possible
</script>

<div class="relative w-full h-full">
	{#if enableTransition}
		<div class="absolute w-full h-full">
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
