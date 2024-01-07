<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CustomElement } from '$lib/models/constants/customElement';
	import ElementCategorySelect from './elementCategories/ElementCategorySelect.svelte';

	export let selectedElementId: CustomElement;
	export let open: boolean = !Boolean(selectedElementId);
</script>

<Modal bind:open on:close={() => (open = false)} class="">
	<div
		class="bg-cover bg-center p-16 w-[70vw] h-[70vh]"
		style="background-image: url('/image/backgrounds/MeleeMenuGreen.png')"
	>
		<ElementCategorySelect bind:selectedElementId bind:open />
	</div>
</Modal>
