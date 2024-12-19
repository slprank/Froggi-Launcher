<script lang="ts">
	import { page } from '$app/stores';
	import { electronEmitter, localEmitter } from '$lib/utils/store.svelte';
	import { kebabCase } from 'lodash';
	import { createEventDispatcher } from 'svelte';

	export let acceptedExtensions: string[] = [];
	export let label: string | undefined = undefined;
	export let directory: string;
	export let fileName: string;

	const dispatch = createEventDispatcher();

	const overlayId = $page.params.overlay;

	const uploadFile = () => {
		$electronEmitter.emit(
			'ImportCustomFile',
			overlayId,
			directory,
			kebabCase(fileName),
			acceptedExtensions,
		);
	};

	$localEmitter.on('ImportCustomFileComplete', (reportedFileName) => {
		if (!acceptedExtensions.some((extension) => reportedFileName.includes(extension))) return;
		dispatch('change', reportedFileName);
	});
</script>

<div class="grid">
	{#if label}
		<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
	{/if}
	<div class="flex flex-col items-center">
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 w-full px-2 xl:text-xl border  rounded`}
			on:click={uploadFile}
		>
			Upload
		</button>
	</div>
</div>
