<script lang="ts">
	import type { TutorialBlock } from '$lib/content/tutorials/types';
	import { formatInline } from '$lib/content/tutorials/format';
	import CopyAssistantInstructions from '$lib/components/CopyAssistantInstructions.svelte';

	// One tutorial page from data (content/tutorials). The AI reads the same blocks as text.
	export let title: string;
	export let blocks: TutorialBlock[];
</script>

<h1 class="text-2xl font-semibold">{title}</h1>

{#each blocks as block}
	{#if block.type === 'heading'}
		<h3 class="t-heading">{@html formatInline(block.text)}</h3>
	{:else if block.type === 'text'}
		<h2>{@html formatInline(block.text)}</h2>
	{:else if block.type === 'list'}
		{#if block.ordered}
			<ol>{#each block.items as item}<li>{@html formatInline(item)}</li>{/each}</ol>
		{:else}
			<ul>{#each block.items as item}<li>{@html formatInline(item)}</li>{/each}</ul>
		{/if}
	{:else if block.type === 'image'}
		<figure>
			<img class="border-secondary" src={block.src} alt={block.caption} />
			<figcaption>{@html formatInline(block.caption)}</figcaption>
		</figure>
	{:else if block.type === 'video'}
		<figure>
			<!-- svelte-ignore a11y-media-has-caption -->
			<video class="border-secondary" src={block.src} autoplay loop muted playsinline />
			<figcaption>{@html formatInline(block.caption)}</figcaption>
		</figure>
	{:else if block.type === 'note'}
		<p class="t-note border-secondary">{@html formatInline(block.text)}</p>
	{:else if block.type === 'copyInstructions'}
		<CopyAssistantInstructions cls="btn text-sm h-10 px-5 border-secondary rounded my-2" />
	{/if}
{/each}

<style>
	.t-heading { font-size: 1.05rem; font-weight: 700; margin-top: 1.1rem; }
	figure { margin: 0.75rem 0; }
	/* Landscape shots fill the width; tall phone shots stay phone-sized. */
	figure img, figure video { display: block; margin: 0 auto; max-width: 100%; max-height: 30rem; width: auto; border-radius: 0.375rem; }
	figcaption { font-size: 0.75rem; opacity: 0.55; margin-top: 0.3rem; }
	.t-note { font-size: 0.85rem; padding: 0.6rem 0.8rem; border-radius: 0.375rem; opacity: 0.85; background: color-mix(in srgb, var(--secondary-color) 6%, transparent); }
	:global(.tutorial-content code) { font-size: 0.85em; padding: 0 0.25rem; border-radius: 0.2rem; background: color-mix(in srgb, var(--secondary-color) 10%, transparent); }
</style>
