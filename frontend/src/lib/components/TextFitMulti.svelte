<script lang="ts">
	import { textfit } from 'svelte-textfit';

	export let maxFont = 100;
	export { _class as class };
	export let style = '';
	let _class: string;

	let parent: Node;
	let innerWidth: number;
	let innerHeight: number;
	let outerWidth: number;
	let outerHeight: number;
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:outerWidth bind:outerHeight />

{#key innerWidth}
	{#key innerHeight}
		{#key outerWidth}
			{#key outerHeight}
				<div
					class={`w-full max-w-full whitespace-nowrap m-0 font-medium flex items-center ${_class}`}
					style={`${style}`}
					bind:this={parent}
				>
					<h1
						use:textfit={{
							parent,
							mode: 'multi',
							max: maxFont,
						}}
					>
						<slot />
					</h1>
				</div>
			{/key}
		{/key}
	{/key}
{/key}

<style>
	*::-webkit-scrollbar {
		display: none;
	}
</style>
