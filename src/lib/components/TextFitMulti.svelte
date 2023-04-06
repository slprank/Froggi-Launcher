<script lang="ts">
	import { textfit } from 'svelte-textfit';

	export let divClass: string = '';
	export let textClass: string = '';

	let parent: Node;
	let innerWidth: number;
	let innerHeight: number;
	let outerWidth: number;
	let outerHeight: number;
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:outerWidth bind:outerHeight />

{#key innerWidth || innerHeight || outerWidth || outerHeight}
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
