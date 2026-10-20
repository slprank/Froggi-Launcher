<script lang="ts">
	import TutorialPages from '$lib/components/tutorial/TutorialPages.svelte';
	import TutorialBlocks from '$lib/components/tutorial/TutorialBlocks.svelte';
	import { getTutorial } from '$lib/content/tutorials';

	const tutorial = getTutorial('tournament')!;
	const scenes = tutorial.pages.map((p) => ({ title: p.title, component: TutorialBlocks, props: { title: p.title, blocks: p.blocks } }));
</script>

<TutorialPages heading={tutorial.title} {scenes} />
