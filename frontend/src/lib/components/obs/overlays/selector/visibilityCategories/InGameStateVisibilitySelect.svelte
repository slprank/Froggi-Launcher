<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SelectOption from './SelectVisibilityOption.svelte';
	import {
		VisibilityOption,
		type SelectedVisibilityCondition,
	} from '$lib/models/types/animationOption';

	export let selectedVisibilityOption: SelectedVisibilityCondition;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<VisibilityOption>) {
		dispatch('select', event.detail);
	}
</script>

<SelectOption
	description="While Game Is Running"
	value={VisibilityOption.InGameRunning}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameRunning]}
	on:select={select}
>
	Game Running
</SelectOption>
<SelectOption
	description="While Game Is Paused"
	value={VisibilityOption.InGamePaused}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGamePaused]}
	on:select={select}
>
	Game Paused
</SelectOption>
<SelectOption
	description="When 'Ready' Is Being Displayed Before Game Starts"
	value={VisibilityOption.InGameReady}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameReady]}
	on:select={select}
>
	Ready
</SelectOption>
<SelectOption
	description="When 'Go' Is Being Displayed Before Game Starts"
	value={VisibilityOption.InGameGo}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameGo]}
	on:select={select}
>
	Go
</SelectOption>
<SelectOption
	description="When The Timer Has 5 Seconds Remaining"
	value={VisibilityOption.InGameCountdown}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameCountdown]}
	on:select={select}
>
	Countdown
</SelectOption>
<SelectOption
	description="When Game Ends By Defeat"
	value={VisibilityOption.InGameEnd}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameEnd]}
	on:select={select}
>
	Game
</SelectOption>
<SelectOption
	description="When Game Ends On Time"
	value={VisibilityOption.InGameTime}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameTime]}
	on:select={select}
>
	Time
</SelectOption>
<SelectOption
	description="When Game Ends On Tie"
	value={VisibilityOption.InGameTie}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameTie]}
	on:select={select}
>
	Tie
</SelectOption>
