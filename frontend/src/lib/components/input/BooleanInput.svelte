<script lang="ts">
	export let checked: boolean = false;
	export let label: string | undefined = undefined;

	// TODO: Add color picker that includes opacity
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}
<input class="rounded-md m-0" type="checkbox" id="head" name="head" bind:checked />
