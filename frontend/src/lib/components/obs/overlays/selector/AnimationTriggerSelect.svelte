<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { SelectedAnimationTriggerCondition } from '$lib/models/types/animationOption';
	import AnimationTriggerCategorySelect from './animationTriggerCategories/AnimationTriggerCategorySelect.svelte';
	import { createEventDispatcher } from 'svelte';

	export let selectedOption: SelectedAnimationTriggerCondition;
	let tempSelectedOptions = selectedOption;
	let open: boolean = false;

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
		class="w-[70vw] h-[70vh] bg-cover bg-center p-4 overflow-auto grid gap-8 background-primary-color"
	>
		<div>
			<AnimationTriggerCategorySelect bind:selectedOption={tempSelectedOptions} />
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
