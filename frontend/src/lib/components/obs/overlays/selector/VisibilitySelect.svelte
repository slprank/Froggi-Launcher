<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { SelectedVisibilityCondition } from '$lib/models/types/animationOption';
	import VisibilityCategorySelect from './visibilityCategories/VisibilityCategorySelect.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let selectedVisibilityOptions: SelectedVisibilityCondition[] = [];
	let tempSelectedOptions: SelectedVisibilityCondition[] = selectedVisibilityOptions;
	let open: boolean = false;

	const addNewCondition = () => {
		tempSelectedOptions = [...tempSelectedOptions, {} as SelectedVisibilityCondition];
	};

	const removeOption = (index: number) => {
		tempSelectedOptions = tempSelectedOptions.filter((_, i: number) => i !== index);
	};

	const dispatch = createEventDispatcher();

	function handleUpdate() {
		dispatch('update', tempSelectedOptions);
		open = false;
	}
</script>

<div class="grid grid-flow-col gap-2 items-center">
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border-secondary"
		on:click={() => (open = true)}
	>
		Select
	</button>
</div>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="w-[70vw] h-[70vh] bg-cover bg-center p-16 overflow-auto grid gap-8 divide-y-1 background-primary-color"
	>
		{#each tempSelectedOptions as option, i (i)}
			<div transition:fly={{ duration: 250, x: 150 }}>
				<div>
					<VisibilityCategorySelect bind:selectedVisibilityOption={option} />
				</div>

				{#if tempSelectedOptions.length}
					<div class="w-48 flex items-end">
						<button
							class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border-secondary"
							on:click={() => removeOption(i)}
						>
							Delete
						</button>
					</div>
				{/if}
				<br />
			</div>
		{/each}
		<div class="w-48 flex items-end">
			<button
				class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border-secondary"
				on:click={addNewCondition}
			>
				New Condition
			</button>
		</div>
		<div class="w-48 flex items-end">
			<button
				class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border-secondary"
				on:click={handleUpdate}
			>
				Update
			</button>
		</div>
	</div>
</Modal>
