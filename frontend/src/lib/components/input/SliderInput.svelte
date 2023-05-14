<script lang="ts">
	export let value: number;
	export let label: string | undefined = undefined;
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}
<div class="h-10 flex items-center">
	<input
		type="range"
		class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 dark:text-white"
		step="0.01"
		min="0"
		max="1"
		bind:value
	/>
</div>
