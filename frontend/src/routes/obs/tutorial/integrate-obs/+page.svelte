<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import WhatToLearn from '$lib/components/tutorial/new-overlay/WhatToLearn.svelte';
	import { isNil } from 'lodash';

	let scrollElement: HTMLElement;
	const scrollToTop = () => {
		if (isNil(scrollElement)) return;
		scrollElement.scroll({ top: 0 });
	};

	let pageIndex = Number($page.url.searchParams.get('page') || 0);

	let scenes = [
		{
			title: 'What to learn in this tutorial',
			component: WhatToLearn,
		},
	];

	const handlePrevious = () => {
		if (pageIndex > 0) {
			pageIndex--;
			scrollToTop();
		}
	};

	const handleNext = () => {
		if (pageIndex < scenes.length - 1) {
			pageIndex++;
			scrollToTop();
		}
	};
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center flex justify-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full max-w-3xl h-full flex flex-col justify-center items-center p-8 gap-4">
		<div>
			<h1 class="text-white font-bold text-4xl">Tutorial</h1>
		</div>
		<div
			class="flex-1 flex flex-col justify-start items-start h-full w-full text-white gap-4 overflow-scroll border-t border-b border-white p-2"
			bind:this={scrollElement}
		>
			{#if scenes[pageIndex]}
				<svelte:component this={scenes[pageIndex].component} />
			{:else}
				<p>PageIndex not found</p>
			{/if}
		</div>
		<div class="flex justify-between w-full">
			<button
				disabled={pageIndex === 0}
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4 disabled:opacity-50"
				on:click={handlePrevious}
			>
				Previous
			</button>
			<button
				disabled={pageIndex === scenes.length - 1}
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4 disabled:opacity-50"
				on:click={handleNext}
			>
				Next
			</button>
		</div>
	</div>
</main>
