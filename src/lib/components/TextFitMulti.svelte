<script lang="ts">
	import { textfit } from 'svelte-textfit';

	export let divClass: string = '';
	export let textClass: string = '';

	let parent: Node;
	let resize: number;
</script>

<svelte:window
	bind:innerWidth={resize}
	bind:innerHeight={resize}
	bind:outerWidth={resize}
	bind:outerHeight={resize}
/>

{#key resize}
	<div class={`w-full max-w-full ${divClass}`} bind:this={parent}>
		<h1
			class={`whitespace-nowrap m-0 font-medium ${textClass} `}
			use:textfit={{
				parent,
				mode: 'multi',
			}}
		>
			<slot />
		</h1>
	</div>
{/key}

<style>
	*::-webkit-scrollbar {
		display: none;
	}
</style>
