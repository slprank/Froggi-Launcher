<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// One level of an expandable object; leaves are buttons that pick their full path.
	export let value: unknown;
	export let path: string;
	/** Levels opened from the start. */
	export let openDepth = 1;
	export let depth = 0;

	const dispatch = createEventDispatcher<{ pick: string }>();
	const isBranch = (v: unknown) => !!v && typeof v === 'object';
	// Lists read 1-based, like the keys.
	$: entries = Array.isArray(value) ? value.map((v, i) => [String(i + 1), v] as const) : Object.entries((value ?? {}) as Record<string, unknown>);
	const join = (key: string) => (path ? `${path}.${key}` : key);
	const show = (v: unknown) => (v === null || v === undefined ? '–' : typeof v === 'string' ? `"${v}"` : String(v));
</script>

<ul class="tree" class:root={depth === 0}>
	{#each entries as [key, v] (key)}
		<li>
			{#if isBranch(v)}
				<details open={depth < openDepth}>
					<summary><span class="k">{key}</span><span class="count">{Array.isArray(v) ? v.length : Object.keys(v ?? {}).length}</span></summary>
					<svelte:self value={v} path={join(key)} {openDepth} depth={depth + 1} on:pick />
				</details>
			{:else}
				<button class="leaf" title={`{{${join(key)}}}`} on:click={() => dispatch('pick', join(key))}>
					<span class="k">{key}</span><span class="v">{show(v)}</span>
				</button>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.tree { list-style: none; margin: 0; padding-left: 0.85rem; border-left: 1px solid color-mix(in srgb, currentColor 15%, transparent); }
	.tree.root { padding-left: 0; border-left: none; }
	summary { cursor: pointer; padding: 0.15rem 0.2rem; font-size: 0.75rem; border-radius: 0.2rem; }
	summary:hover, .leaf:hover { background: color-mix(in srgb, var(--secondary-color) 12%, transparent); }
	.count { margin-left: 0.4rem; font-size: 0.62rem; opacity: 0.4; }
	.leaf { display: flex; gap: 0.6rem; width: 100%; padding: 0.15rem 0.2rem 0.15rem 1rem; border-radius: 0.2rem; background: none; color: inherit; text-align: left; font-size: 0.72rem; }
	.k { font-family: monospace; }
	.v { margin-left: auto; opacity: 0.55; font-family: monospace; max-width: 55%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
