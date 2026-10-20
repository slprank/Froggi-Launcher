<script lang="ts">
	import { page } from '$app/stores';
	import { isNil } from 'lodash';
	import BackButton from '$lib/components/navigation/BackButton.svelte';

	export let heading = 'Tutorial';
	export let scenes: { title: string; component: any; props?: Record<string, unknown> }[] = [];

	let scrollElement: HTMLElement;
	const scrollToTop = () => {
		if (isNil(scrollElement)) return;
		scrollElement.scroll({ top: 0 });
	};

	let pageIndex = Number($page.url.searchParams.get('page') || 0);

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

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') handlePrevious();
		if (e.key === 'ArrowRight') handleNext();
	}

	$: currentTitle = scenes[pageIndex]?.title ?? '';
</script>

<svelte:window on:keydown={handleKeyPress} />

<main class="h-screen w-full background-primary-color text-secondary-color flex justify-center">
	<div class="w-full max-w-3xl h-full flex flex-col p-6 gap-0">

		<BackButton />
		<!-- Header -->
		<div class="flex items-baseline justify-between mb-3">
			<h1 class="font-bold text-3xl text-secondary-color">{heading}</h1>
			<span class="text-sm opacity-50 font-medium tabular-nums">
				{pageIndex + 1} / {scenes.length}
			</span>
		</div>

		<!-- Current page title -->
		<p class="text-xs uppercase tracking-widest opacity-50 font-semibold mb-4 mt-2">
			{currentTitle}
		</p>

		<!-- Content area -->
		<div
			class="flex-1 overflow-auto tutorial-content border-t border-secondary-color pt-4"
			bind:this={scrollElement}
		>
			{#key pageIndex}
				<div>
					{#if scenes[pageIndex]}
						<svelte:component this={scenes[pageIndex].component} {...scenes[pageIndex].props ?? {}} />
					{:else}
						<p class="opacity-50">Page not found.</p>
					{/if}
				</div>
			{/key}
		</div>

		<!-- Navigation -->
		<div class="flex items-center justify-between pt-4 border-t border-secondary-color mt-4 gap-4">
			<button
				disabled={pageIndex === 0}
				class="btn text-sm h-10 px-6 border-secondary rounded disabled:opacity-30"
				on:click={handlePrevious}
			>
				← Previous
			</button>

			<!-- Progress: one segment per step, click to jump -->
			<div class="steps flex-1">
				{#each scenes as scene, i}
					<button
						class="step"
						class:step--done={i <= pageIndex}
						title="{i + 1}. {scene.title}"
						on:click={() => { pageIndex = i; scrollToTop(); }}
						aria-label="Go to step {i + 1}: {scene.title}"
					/>
				{/each}
			</div>

			<button
				disabled={pageIndex === scenes.length - 1}
				class="btn text-sm h-10 px-6 border-secondary rounded disabled:opacity-30"
				on:click={handleNext}
			>
				Next →
			</button>
		</div>
	</div>
</main>

<style>
	.steps { display: flex; gap: 3px; align-items: center; }
	.step {
		flex: 1;
		height: 6px;
		padding: 0;
		border: none;
		border-radius: 3px;
		background-color: var(--secondary-color);
		opacity: 0.15;
		cursor: pointer;
		transition: opacity 0.2s;
	}
	/* A thin bar: no hover grow, just brighten. */
	.step:hover { opacity: 0.45; transform: none; }
	.step--done { opacity: 0.85; }
	.step--done:hover { opacity: 1; }
</style>
