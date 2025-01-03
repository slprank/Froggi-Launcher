<script lang="ts">
	import { VisibilityToggle } from '$lib/models/types/animationOption';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: any) {
		dispatch('select', customElement);
	}

	export let value: any;
	export let description: string;
	export let selected: VisibilityToggle = VisibilityToggle.Disabled;
</script>

<div class="flex flex-row items-center gap-2">
	<button
		class={`w-80 transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-105 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl ${
			selected === VisibilityToggle.False && 'border-red-700'
		} ${selected === VisibilityToggle.True && 'border-green-700'}`}
		style={`${selected === VisibilityToggle.Disabled ? '' : 'border-width: 0.125em'}`}
		on:click={() => {
			select(value);
		}}
	>
		<slot />
	</button>
	<h1 class="color-secondary text-md font-medium">
		{description}
	</h1>
</div>
