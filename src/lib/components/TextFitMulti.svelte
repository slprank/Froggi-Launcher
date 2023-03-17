<script lang="ts">
	import { stringify } from 'postcss';
	import { textfit } from 'svelte-textfit';

	export let divClass: string;
	export let textClass: string;

	let parent: Node;
	let resizeWidth: number;
	let resizeHeight: number;
</script>

<svelte:window
	bind:innerWidth={resizeWidth}
	bind:innerHeight={resizeHeight}
	bind:outerWidth={resizeWidth}
	bind:outerHeight={resizeHeight}
/>

{#key resizeWidth || resizeHeight}
	<div class={`${divClass} w-full max-w-full`} bind:this={parent}>
		<h1
			class={`${textClass} whitespace-nowrap  m-0`}
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
