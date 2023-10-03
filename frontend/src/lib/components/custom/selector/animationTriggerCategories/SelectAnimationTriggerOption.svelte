<script lang="ts">
	import type { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomElement) {
		dispatch('select', customElement);
	}

	export let value: any;
	export let description: string;
	export let selected: boolean = false;
</script>

<div class="flex flex-row items-center gap-2">
	<button
		class={`w-80 transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-105 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
			selected && 'border-green-700'
		}`}
		on:click={() => {
			select(value);
		}}
	>
		<slot />
	</button>
	<h1 class="text-gray-300 text-md font-medium text-shadow">
		{description}
	</h1>
</div>
