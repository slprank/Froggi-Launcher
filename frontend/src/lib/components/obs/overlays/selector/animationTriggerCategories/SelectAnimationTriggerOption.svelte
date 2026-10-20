<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { readable, type Readable } from 'svelte/store';
	import { LEGACY_TRIGGERS } from '$lib/utils/elementTriggers';
	import type { AnimationTrigger } from '$lib/models/types/animationOption';

	const dispatch = createEventDispatcher();

	export let value: AnimationTrigger;
	export let description: string;
	export let selected: boolean = false;

	// Legacy "value changed" triggers (an element trigger does the same) only show where already used;
	// a trigger used by another animation of the element can't be picked here.
	const taken = getContext<Readable<Set<string>> | undefined>('animationTriggerTaken') ?? readable(new Set<string>());
	$: legacy = LEGACY_TRIGGERS.has(value);
	$: usedElsewhere = $taken.has(value) && !selected;
</script>

{#if !legacy || selected}
	<button
		class="option-row border-secondary"
		class:option-row--active={selected}
		class:option-row--disabled={usedElsewhere}
		disabled={usedElsewhere}
		on:click={() => dispatch('select', value)}
	>
		<span class="indicator" class:indicator--active={selected} />
		<div class="option-text">
			<span class="option-label"><slot />{legacy ? ' (legacy)' : ''}</span>
			<span class="option-desc">
				{usedElsewhere ? 'Used by another animation of this element' : legacy ? 'Old trigger — use an element trigger instead. Untick to remove.' : description}
			</span>
		</div>
	</button>
{/if}

<style>
	.option-row {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.6rem;
		border-radius: 0.25rem;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: border-color 0.1s;
	}

	.option-row--disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.option-row--active {
		border-color: var(--success-color);
	}

	.indicator {
		width: 0.35rem;
		height: 0.35rem;
		border-radius: 50%;
		flex-shrink: 0;
		background: var(--secondary-color);
		opacity: 0.3;
		transition: background 0.1s, opacity 0.1s;
	}

	.indicator--active {
		background: var(--success-color);
		opacity: 1;
	}

	.option-text {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
	}

	.option-label {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--secondary-color);
		white-space: nowrap;
	}

	.option-desc {
		font-size: 0.65rem;
		color: var(--secondary-color);
		opacity: 0.5;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
