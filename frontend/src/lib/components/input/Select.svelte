<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let selected: any;
	export let label: string | undefined = undefined;

	const dispatch = createEventDispatcher();

	function change() {
		dispatch('change', selected);
	}
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}
<div class="w-full flex justify-center items-center">
	<select
		id="dropdown"
		class="w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
		bind:value={selected}
		on:change={change}
	>
		<slot />
	</select>
</div>
