<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CustomElement } from '$lib/models/constants/customElement';
	import ElementCategorySelect from './elementCategories/ElementCategorySelect.svelte';

	export let selectedElementId: CustomElement;
	export let open: boolean = !Boolean(selectedElementId);
</script>

<Modal bind:open on:close={() => (open = false)} class="">
	<div class="bg-cover bg-center p-4 w-[70vw] h-[70vh] border-secondary background-primary-color">
		<ElementCategorySelect bind:selectedElementId bind:open />
	</div>
</Modal>
