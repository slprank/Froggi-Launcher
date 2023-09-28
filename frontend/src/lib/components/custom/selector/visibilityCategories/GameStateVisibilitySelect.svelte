<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../SelectOption.svelte';
	import { VisibilityOption } from '$lib/models/enum';
	import type { SelectedVisibilityOption } from '$lib/models/types/animationOption';

	export let selectedVisibilityOptions: SelectedVisibilityOption;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<VisibilityOption>) {
		dispatch('select', event.detail);
	}
</script>

<SelectOption
	description="While Game Is Running"
	value={VisibilityOption.GameRunning}
	bind:selected={selectedVisibilityOptions[VisibilityOption.GameRunning]}
	on:select={select}
>
	Game Active
</SelectOption>
<SelectOption
	description="While Game Is Paused"
	value={VisibilityOption.GamePaused}
	bind:selected={selectedVisibilityOptions[VisibilityOption.GamePaused]}
	on:select={select}
>
	Game Paused
</SelectOption>
<SelectOption
	description="When 'Ready' Is Being Displayed Before Game Starts"
	value={VisibilityOption.GameReady}
	bind:selected={selectedVisibilityOptions[VisibilityOption.GameReady]}
	on:select={select}
>
	Ready
</SelectOption>
<SelectOption
	description="When 'Go' Is Being Displayed Before Game Starts"
	value={VisibilityOption.GameGo}
	bind:selected={selectedVisibilityOptions[VisibilityOption.GameGo]}
	on:select={select}
>
	Go
</SelectOption>
<SelectOption
	description="When The Timer Has 5 Seconds Remaining"
	value={VisibilityOption.GameCountdown}
	bind:selected={selectedVisibilityOptions[VisibilityOption.GameCountdown]}
	on:select={select}
>
	Countdown
</SelectOption>
<SelectOption
	description="When Game Ends"
	value={VisibilityOption.GameEnd}
	bind:selected={selectedVisibilityOptions[VisibilityOption.GameEnd]}
	on:select={select}
>
	Game
</SelectOption>
