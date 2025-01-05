<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import WhatIsAScene from '$lib/components/tutorial/new-overlay/WhatIsAScene.svelte';
	import WhatToLearn from '$lib/components/tutorial/new-overlay/WhatToLearn.svelte';
	import CreateNewOverlay from '$lib/components/tutorial/new-overlay/CreateNewOverlay.svelte';
	import OpenInSeparateWindow from '$lib/components/tutorial/new-overlay/OpenInSeparateWindow.svelte';
	import InitOverlayConfigurations from '$lib/components/tutorial/new-overlay/InitOverlayConfigurations.svelte';
	import AddSimpleTextElement from '$lib/components/tutorial/new-overlay/AddSimpleTextElement.svelte';
	import SessionStatsMenuScene from '$lib/components/tutorial/new-overlay/SessionStatsMenuScene.svelte';
	import { isNil } from 'lodash';
	import CreateCustomHud from '$lib/components/tutorial/new-overlay/CreateCustomHud.svelte';
	import CreateLayers from '$lib/components/tutorial/new-overlay/CreateLayers.svelte';
	import CreateHudElements from '$lib/components/tutorial/new-overlay/CreateHudElements.svelte';
	import CreateTimer from '$lib/components/tutorial/new-overlay/CreateTimer.svelte';
	import CreateUltimateUi from '$lib/components/tutorial/new-overlay/CreateUltimateUi.svelte';
	import CreateGameEnd from '$lib/components/tutorial/new-overlay/CreateGameEnd.svelte';
	import FinalCustomHudPreview from '$lib/components/tutorial/new-overlay/FinalCustomHudPreview.svelte';

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
		{
			title: 'Follow in separate window',
			component: OpenInSeparateWindow,
		},
		{
			title: 'Create a new overlay',
			component: CreateNewOverlay,
		},
		{
			title: 'What is a scene?',
			component: WhatIsAScene,
		},
		{
			title: 'Init overlay configurations',
			component: InitOverlayConfigurations,
		},
		{
			title: 'Add simple text element',
			component: AddSimpleTextElement,
		},
		{
			title: 'Add session stats to Menu scene',
			component: SessionStatsMenuScene,
		},
		{
			title: 'Build modern hud',
			component: CreateCustomHud,
		},
		{
			title: 'Add layers',
			component: CreateLayers,
		},
		{
			title: 'Add HUD elements',
			component: CreateHudElements,
		},
		{
			title: 'Add timer',
			component: CreateTimer,
		},
		{
			title: 'Add Ultimate UI Component',
			component: CreateUltimateUi,
		},
		{
			title: 'Add Game End',
			component: CreateGameEnd,
		},
		{
			title: 'Final Preview',
			component: FinalCustomHudPreview,
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
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full max-w-3xl h-full flex flex-col justify-center items-center p-8 gap-4">
		<div>
			<h1 class="color-secondary font-bold text-4xl">Tutorial</h1>
		</div>
		<div
			class="flex-1 flex flex-col justify-start items-start h-full w-full gap-4 overflow-scroll border-t border-b border-secondary-color p-2"
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
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border-secondary rounded w-40 h-20 my-4 disabled:opacity-50"
				on:click={handlePrevious}
			>
				Previous
			</button>
			<button
				disabled={pageIndex === scenes.length - 1}
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border-secondary rounded w-40 h-20 my-4 disabled:opacity-50"
				on:click={handleNext}
			>
				Next
			</button>
		</div>
	</div>
</main>

<style>
	h1,
	h2 {
		color: var(--secondary-color);
	}
</style>
