<script lang="ts">
	import { page } from '$app/stores';
	import TutorialPages from '$lib/components/tutorial/TutorialPages.svelte';
	import TutorialBlocks from '$lib/components/tutorial/TutorialBlocks.svelte';
	import { getTutorial } from '$lib/content/tutorials';

	// Every data tutorial (content/tutorials) — the same content the AI assistant reads.
	$: tutorial = getTutorial($page.params.tutorial);
	$: scenes = (tutorial?.pages ?? []).map((p) => ({ title: p.title, component: TutorialBlocks, props: { title: p.title, blocks: p.blocks } }));
</script>

{#if tutorial}
	{#key tutorial.id}
		<TutorialPages heading={tutorial.title} {scenes} />
	{/key}
{:else}
	<p class="p-6 opacity-60">Tutorial not found.</p>
{/if}
