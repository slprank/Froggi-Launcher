<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	/** The key field that had focus last — the key chips / state picker insert into it. */
	export const activeKeyField = writable<((key: string) => void) | null>(null);
</script>

<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';

	// Text field with {{key}} highlighting: known keys tinted, unknown keys red (+ listed under the field).
	// A textarea over a mirror div that shows the same text with the keys marked.
	export let value = '';
	/** Whether a {{key}} can be filled (trigger key or game-state path). */
	export let isKnown: (key: string) => boolean = () => true;
	export let multiline = false;
	export let rows = 6;
	export let placeholder = '';

	const dispatch = createEventDispatcher<{ change: void }>();
	let area: HTMLTextAreaElement;
	let mirror: HTMLDivElement;

	$: parts = (value ?? '').split(/(\{\{\s*[\w.]+\s*\}\})/g).map((text) => {
		const key = text.match(/^\{\{\s*([\w.]+)\s*\}\}$/)?.[1];
		return { text, key, unknown: !!key && !isKnown(key) };
	});
	$: unknown = [...new Set(parts.filter((p) => p.unknown).map((p) => p.key))];

	const insert = (key: string) => {
		const at = area?.selectionStart ?? value.length;
		const end = area?.selectionEnd ?? at;
		value = `${value.slice(0, at)}{{${key}}}${value.slice(end)}`;
		dispatch('change');
		requestAnimationFrame(() => {
			area?.focus();
			area?.setSelectionRange(at + key.length + 4, at + key.length + 4);
		});
	};
	const sync = () => {
		if (mirror && area) {
			mirror.scrollTop = area.scrollTop;
			mirror.scrollLeft = area.scrollLeft;
		}
	};
	onDestroy(() => activeKeyField.update((f) => (f === insert ? null : f)));
</script>

<div class="key-field" class:multi={multiline}>
	<div class="mirror" bind:this={mirror} aria-hidden="true">
		{#each parts as p}{#if p.key}<mark class:bad={p.unknown}>{p.text}</mark>{:else}{p.text}{/if}{/each}{' '}
	</div>
	<textarea
		bind:this={area}
		bind:value
		rows={multiline ? rows : 1}
		{placeholder}
		spellcheck="false"
		on:focus={() => activeKeyField.set(insert)}
		on:scroll={sync}
		on:input={sync}
		on:change={() => dispatch('change')}
		on:keydown={(e) => !multiline && e.key === 'Enter' && e.preventDefault()}
	/>
</div>
{#if unknown.length}
	<p class="unknown">Unknown key{unknown.length > 1 ? 's' : ''}: {unknown.map((k) => `{{${k}}}`).join(', ')} — fills in empty</p>
{/if}

<style>
	.key-field {
		position: relative; border-radius: 0.3rem;
		border: 1px solid color-mix(in srgb, var(--secondary-color) 30%, transparent);
	}
	.mirror, textarea {
		margin: 0; padding: 0.45rem 0.5rem; font-family: monospace; font-size: 0.72rem; line-height: 1.35;
		white-space: pre; overflow: hidden; word-wrap: normal; box-sizing: border-box; width: 100%;
	}
	.multi .mirror, .multi textarea { white-space: pre-wrap; overflow-wrap: anywhere; }
	.mirror { position: absolute; inset: 0; color: transparent; pointer-events: none; }
	textarea {
		position: relative; display: block; background: transparent; color: var(--secondary-color);
		border: none; outline: none; resize: none; caret-color: var(--secondary-color);
	}
	.multi textarea { resize: vertical; overflow: auto; }
	mark { color: transparent; border-radius: 0.2rem; background: color-mix(in srgb, #40dca5 30%, transparent); }
	mark.bad { background: color-mix(in srgb, #ef4444 45%, transparent); }
	.unknown { font-size: 0.66rem; color: #f87171; }
</style>
