<script lang="ts">
	import { page } from '$app/stores';
	import Board from '$lib/components/custom/Board.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { urls } from '$lib/utils/store.svelte';
	import Clipboard from 'svelte-clipboard';

	const overlayId = $page.params.overlay;
	export let boardHeight: number;

	$: overlayUrl = `${$urls?.local}/obs/custom/${overlayId}`;

	$: preview = false;

	$: console.log(preview);
	// TODO: Add alert component
</script>

<div class="w-full h-full">
	<div class="flex items-center gap-2">
		<h1 class="text-gray-500 text-md font-medium text-shadow">Preview with transitions</h1>
		<input type="checkbox" bind:checked={preview} />
	</div>
	<div
		class={`aspect-video w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] outline outline-4 outline-zinc-700 overflow-hidden shadow-md`}
	>
		<Board bind:height={boardHeight} bind:preview />
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
