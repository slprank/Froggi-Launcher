<script lang="ts">
	export let enableTransition: boolean = false;
	export let animationIn: Function;
	export let animationOut: Function;
</script>

{#if enableTransition}
	<slot />
{:else}
	<div class="w-full h-full" in:animationIn out:animationOut>
		<slot />
	</div>
{/if}
