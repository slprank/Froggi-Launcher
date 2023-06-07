<script lang="ts">
	import { page } from '$app/stores';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import Board from '$lib/components/custom/Board.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { urls } from '$lib/utils/store.svelte';
	import Clipboard from 'svelte-clipboard';
	import { getOverlayById } from './OverlayHandler.svelte';
	import type { Overlay } from '$lib/models/types';
	import { fly } from 'svelte/transition';

	const overlayId = $page.params.overlay;
	export let boardHeight: number;
	export let boardWidth: number;
	let currentOverlay: Overlay;

	async function getOverlay() {
		currentOverlay = await getOverlayById(overlayId);
	}
	getOverlay();

	$: overlayUrl = `${$urls?.local}/obs/custom/${overlayId}`;

	$: preview = false;

	// TODO: Add alert component
</script>

<div class="w-full h-full">
	{#if currentOverlay}
		<TextFitMulti
			class="h-16 w-full text-gray-500 text-md font-medium text-shadow justify-center underline"
		>
			{currentOverlay.title}
		</TextFitMulti>
	{/if}
	<div class="flex items-center gap-2">
		<h1 class="text-gray-500 text-md font-medium text-shadow">Preview with transitions</h1>
		<input type="checkbox" bind:checked={preview} />
	</div>
	<div
		style={`width: ${boardWidth}px; height: ${boardHeight}px`}
		class={`outline outline-4 outline-zinc-700 overflow-hidden shadow-md my-2`}
	>
		<Board bind:boardHeight bind:preview />
	</div>
	<div class="flex items-center gap-2">
		<h1 class="text-gray-500 text-md font-medium text-shadow">
			{overlayUrl}
		</h1>
		<Clipboard
			text={overlayUrl}
			let:copy
			on:copy={() => {
				notifications.success('Copied to clipboard!', 2000);
			}}
		>
			<button on:click={copy} class="w-5 h-5 invert transition hover:scale-110">
				<img src="/image/button-icons/copy.png" alt="copy" />
			</button>
		</Clipboard>
	</div>
</div>
