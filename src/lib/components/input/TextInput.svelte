<script lang="ts">
	export let value: string;
	export let label: string | undefined = undefined;
	export let autofocus: number | undefined = undefined;
	export let autoFocusValue: number | undefined = undefined;
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}
<div class="h-10 flex items-center" on:click={() => (autofocus = autoFocusValue)}>
	<input
		autofocus={!!autofocus && autofocus === autoFocusValue}
		type="text"
		class="w-full h-full pl-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700"
		bind:value
	/>
</div>
