<script lang="ts">
	import BackButton from '$lib/components/navigation/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { Paintbrush, Plug, Gamepad2, Trophy, Webhook, Workflow, Bot, Swords } from 'lucide-svelte';
	import { TUTORIALS } from '$lib/content/tutorials';

	// Same list the AI assistant reads (content/tutorials).
	const ICONS = { Paintbrush, Plug, Gamepad2, Trophy, Webhook, Workflow, Bot, Swords };
	const tutorials = TUTORIALS.map((t) => ({ title: t.title, description: t.description, path: t.path, icon: ICONS[t.icon] }));
</script>

<main class="background-primary-color text-secondary-color flex justify-center">
	<div class="w-full max-w-lg flex flex-col gap-6">
		<BackButton />
		<div>
			<h1 class="font-bold text-3xl">Tutorials</h1>
			<p class="text-sm opacity-50 mt-1">Choose a guide to get started.</p>
		</div>

		<div class="flex flex-col gap-3">
			{#each tutorials as tutorial}
				<button
					class="tutorial-card w-full text-left"
					on:click={() => goto(tutorial.path)}
				>
					<span class="tutorial-card-icon">
						<svelte:component this={tutorial.icon} size={22} strokeWidth={1.5} />
					</span>
					<div class="flex flex-col min-w-0">
						<span class="font-semibold text-base leading-tight">{tutorial.title}</span>
						<span class="text-sm opacity-55 mt-0.5 leading-snug">{tutorial.description}</span>
					</div>
					<span class="ml-auto opacity-30 text-lg shrink-0">→</span>
				</button>
			{/each}
		</div>
	</div>
</main>

<style>
	.tutorial-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border: 1px solid var(--secondary-color);
		border-radius: 0.375rem;
		background-color: var(--primary-color);
		color: var(--secondary-color);
		transition: opacity 0.15s, transform 0.15s;
		cursor: pointer;
	}

	.tutorial-card:hover {
		transform: scale(1.01);
	}

	.tutorial-card-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
	}
</style>
