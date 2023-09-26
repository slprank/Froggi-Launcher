<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CustomElement } from '$lib/models/constants/customElement';
	import ElementCategorySelect from './elementCategories/ElementCategorySelect.svelte';

	export let selectedElementId: CustomElement;
	let open: boolean = !selectedElementId;
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
		class="w-full h-full bg-cover bg-center p-16"
		style="background-image: url('/image/backgrounds/MeleeMenuGreen.png')"
	>
		<ElementCategorySelect bind:selectedElementId bind:open />
	</div>
</Modal>
