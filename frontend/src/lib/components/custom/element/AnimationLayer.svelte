<script lang="ts">
	export let enableTransition: boolean = false;
	export let animationIn: Function;
	export let animationOut: Function;
	export let key: any | undefined = undefined;
</script>

{#if enableTransition}
	<slot />
{:else}
	{#key key}
		<div class="w-full h-full" in:animationIn|local out:animationOut|local>
			<slot />
		</div>
	{/key}
{/if}
