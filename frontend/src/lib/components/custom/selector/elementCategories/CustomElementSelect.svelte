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
		description="Customizable box"
		customElement={CustomElement.CustomBox}
		on:select={select}
	>
		Custom Box
	</ElementOption>
	<ElementOption
		description="Upload and utilize a custom image"
		customElement={CustomElement.CustomImage}
		on:select={select}
	>
		Custom Image
	</ElementOption>
	<ElementOption
		description="Customizable text"
		customElement={CustomElement.CustomString}
		on:select={select}
	>
		Custom Text
	</ElementOption>
</div>
