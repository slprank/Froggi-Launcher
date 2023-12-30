<script lang="ts">
	export let value: string = '';
	export let label: string | undefined = undefined;
	export let autofocus: number | undefined = undefined;
	export let autoFocusValue: number | undefined = undefined;
	export let placeholder: string | undefined = undefined;
</script>

<div class="w-full">
	{#if label}
		<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
	{/if}
	<div class="h-10 flex items-center">
		<input
			on:focus={() => (autofocus = autoFocusValue)}
			{placeholder}
			type="text"
			class="w-full h-full pl-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700 dark:text-white"
			bind:value
		/>
	</div>
</div>
