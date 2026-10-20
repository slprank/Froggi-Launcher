<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import type { SelectedAnimationTriggerCondition } from '$lib/models/types/animationOption';
	import type { ElementTrigger } from '$lib/models/types/overlay';
	import { fly } from 'svelte/transition';
	import AnimationTriggerCategorySelect from './animationTriggerCategories/AnimationTriggerCategorySelect.svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { ELEMENT_TRIGGER_WHEN, SELF, elementTriggerKey } from '$lib/utils/elementTriggers';

	export let selectedOption: SelectedAnimationTriggerCondition;
	export let elementTriggers: ElementTrigger[] = [];
	/** Triggers used by the element's other animations (named labels + elementTriggerKey) — one animation each. */
	export let taken: Set<string> = new Set();
	/** Elements of the scene a trigger can watch ("self" first). */
	export let elements: { value: string; label: string }[] = [];
	export let label = 'Apply Animation Triggers';

	let tempSelectedOptions = selectedOption;
	let tempElementTriggers: ElementTrigger[] = [];
	let open: boolean = false;

	const takenStore = writable(taken);
	$: takenStore.set(taken);
	setContext('animationTriggerTaken', takenStore);

	const dispatch = createEventDispatcher<{ update: { selectedOptions: SelectedAnimationTriggerCondition; elementTriggers: ElementTrigger[] } }>();

	function openModal() {
		tempSelectedOptions = { ...selectedOption };
		tempElementTriggers = (elementTriggers ?? []).map((t) => ({ ...t }));
		open = true;
	}

	function handleUpdate() {
		const seen = new Set<string>();
		const unique = tempElementTriggers.filter((t) => !seen.has(elementTriggerKey(t)) && !taken.has(elementTriggerKey(t)) && seen.add(elementTriggerKey(t)));
		dispatch('update', { selectedOptions: tempSelectedOptions, elementTriggers: unique });
		open = false;
	}

	const addElementTrigger = () => (tempElementTriggers = [...tempElementTriggers, { source: SELF, when: 'change' }]);
	const removeElementTrigger = (i: number) => (tempElementTriggers = tempElementTriggers.filter((_, j) => j !== i));
	const elementLabel = (source: string) => elements.find((e) => e.value === source)?.label ?? 'a removed element';
	const whenLabel = (when: ElementTrigger['when']) => ELEMENT_TRIGGER_WHEN.find((w) => w.value === when)?.label ?? when;

	$: tempActiveOption = [
		...tempElementTriggers.map((t) => `${elementLabel(t.source)} ${whenLabel(t.when)}`),
		...Object.entries(tempSelectedOptions)
			.filter(([_, value]) => value)
			.map(([key]) => key),
	];
	$: duplicate = (t: ElementTrigger, i: number) =>
		taken.has(elementTriggerKey(t)) || tempElementTriggers.some((o, j) => j < i && elementTriggerKey(o) === elementTriggerKey(t));
</script>

<div class="grid grid-flow-col gap-2 items-center">
	<button class="btn text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border-secondary" on:click={openModal}>
		{label}
	</button>
</div>

<Modal bind:open on:close={() => (open = false)}>
	<div class="w-[80vw] h-[80vh] bg-cover bg-center p-4 overflow-auto flex flex-col gap-4 background-primary-color">
		<div class="flex flex-col gap-2">
			<h1 class="text-lg font-medium text-secondary-color">Element triggers</h1>
			<p class="text-secondary-color text-xs opacity-60">
				Replays when an element of this scene changes what it shows. Appearing never counts — scene animations and visibility conditions handle that.
			</p>
			{#each tempElementTriggers as t, i}
				<div class="flex gap-2 items-center">
					<div class="flex-1">
						<Select bind:selected={t.source}>
							{#each elements as e}<option value={e.value}>{e.label}</option>{/each}
						</Select>
					</div>
					<div class="w-40">
						<Select bind:selected={t.when}>
							{#each ELEMENT_TRIGGER_WHEN as w}<option value={w.value}>{w.label}</option>{/each}
						</Select>
					</div>
					<button class="btn h-10 px-3 border-secondary rounded" title="Remove" on:click={() => removeElementTrigger(i)}>✕</button>
				</div>
				{#if duplicate(t, i)}
					<p class="text-xs" style="color: var(--danger-color, #f87171)">Already used by {taken.has(elementTriggerKey(t)) ? 'another animation of this element' : 'this animation'} — it is dropped on Update.</p>
				{/if}
			{/each}
			<div>
				<button class="btn text-sm h-9 px-4 border-secondary rounded" on:click={addElementTrigger}>+ Add element trigger</button>
			</div>
		</div>

		<div class="flex-1 overflow-auto">
			<AnimationTriggerCategorySelect bind:selectedOption={tempSelectedOptions} />
		</div>

		<h1 class="text-secondary-color text-sm font-bold">Triggers:</h1>
		{#if tempActiveOption.length}
			<div in:fly={{ duration: 250, x: 100, delay: 250 }} out:fly={{ duration: 250, x: 100 }} class="max-h-24 overflow-auto">
				{#each tempActiveOption as activeOption, i}
					<span class="text-secondary-color text-sm"><b>{activeOption}</b></span>
					{#if tempActiveOption.length != i + 1}
						<span class="text-secondary-color text-sm">{'or '}</span>
					{/if}
				{/each}
			</div>
		{/if}

		<div class="w-48 flex items-end">
			<button class="w-full btn text-md whitespace-nowrap h-12 px-2 xl:text-xl border-secondary" on:click={handleUpdate}>
				Update
			</button>
		</div>
	</div>
</Modal>
