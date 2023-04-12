<script lang="ts">
	import { obs } from '$lib/utils/store.svelte';
	import TextFitMulti from '../TextFitMulti.svelte';

	export let dataItem: any;
	export let edit: boolean = false;
	export let font = '';

	// TODO: Add custom font support
</script>

<svelte:head>
	<!--
		<link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font}`} />
	-->
</svelte:head>

{#key $obs}
	<div
		class={`custom-font h-full w-full overflow-hidden  ${
			edit ? 'bg-white' : 'text-white'
		} bg-opacity-50`}
		style={`font-family: ${font}`}
	>
		<TextFitMulti class="w-full h-full flex justify-center items-center text-6xl">
			{dataItem?.data ?? 'Snider'}
		</TextFitMulti>
	</div>
{/key}
