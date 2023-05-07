<script lang="ts">
	export let value: string = '#000000';
	export let label: string | undefined = undefined;

	// TODO: Add color picker that includes opacity
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}
<input class="w-full h-11 rounded-md" type="color" id="head" name="head" bind:value />
