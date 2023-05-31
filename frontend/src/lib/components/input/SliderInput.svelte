<script lang="ts">
	export let min = 0;
	export let max = 1;
	export let step = 0.01;
	export let value: number;
	export let label: string | undefined = undefined;
</script>

<div>
	{#if label}
		<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
	{/if}
	<div class="h-10 flex items-center">
		<input
			type="range"
			class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 dark:text-white"
			{step}
			{min}
			{max}
			bind:value
		/>
	</div>
</div>
