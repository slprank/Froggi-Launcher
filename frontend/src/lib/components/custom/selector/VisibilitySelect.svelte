<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { SelectedVisibilityOption } from '$lib/models/types/animationOption';
	import { flip } from 'svelte/animate';
	import VisibilityCategorySelect from './visibilityCategories/VisibilityCategorySelect.svelte';
	import { createEventDispatcher } from 'svelte';

	export let selectedVisibilityOptions: SelectedVisibilityOption[] = [];
	let tempVisibilityOptions = selectedVisibilityOptions;
	let open: boolean = false;

	const addNewOption = () => {
		tempVisibilityOptions.push({} as SelectedVisibilityOption);
	};

	const dispatch = createEventDispatcher();

	function handleUpdate() {
		dispatch('update', tempVisibilityOptions);
		open = false;
	}
</script>

<div class="grid grid-flow-col gap-2 items-center">
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
		on:click={() => (open = true)}
	>
		Select
	</button>
</div>

<Modal bind:open on:close={() => (open = false)} class="w-[70vw] h-[70vh]">
	<div
		class="w-full h-full bg-cover bg-center p-16 overflow-auto grid gap-8"
		style="background-image: url('/image/backgrounds/MeleeMenuGreen.png')"
	>
		{#each tempVisibilityOptions as option, i (i)}
			<div animate:flip={{ duration: 250 }}>
				<VisibilityCategorySelect
					bind:selectedVisibilityOption={option}
					on:newOption={addNewOption}
				/>
			</div>
		{/each}
		<div class="w-48 flex items-end">
			<button
				class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border border-white rounded"
				on:click={addNewOption}
			>
				New Options
			</button>
		</div>
		<div class="w-48 flex items-end">
			<button
				class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border border-white rounded"
				on:click={handleUpdate}
			>
				Update
			</button>
		</div>
	</div>
</Modal>
