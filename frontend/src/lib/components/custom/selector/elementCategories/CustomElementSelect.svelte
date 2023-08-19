<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import { createEventDispatcher } from 'svelte';
	import ElementOption from './ElementOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<ElementOption
		description="description"
		customElement={CustomElement.CustomBox}
		on:select={select}
	>
		Custom box
	</ElementOption>
	<ElementOption
		description="description"
		customElement={CustomElement.CustomImage}
		on:select={select}
	>
		Custom image
	</ElementOption>
	<ElementOption
		description="description"
		customElement={CustomElement.CustomString}
		on:select={select}
	>
		Custom text
	</ElementOption>
</div>
