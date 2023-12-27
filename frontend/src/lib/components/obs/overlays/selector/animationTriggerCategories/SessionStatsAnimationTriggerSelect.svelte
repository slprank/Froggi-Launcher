<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		AnimationTrigger,
		type SelectedAnimationTriggerOption,
	} from '$lib/models/types/animationOption';
	import SelectAnimationTriggerOption from './SelectAnimationTriggerOption.svelte';

	export let selectedOption: SelectedAnimationTriggerOption;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<AnimationTrigger>) {
		dispatch('select', event.detail);
	}
</script>

<SelectAnimationTriggerOption
	description="When Session Wins Change"
	value={AnimationTrigger.SessionWins}
	bind:selected={selectedOption[AnimationTrigger.SessionWins]}
	on:select={select}
>
	Session Wins Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When Session Losses Change"
	value={AnimationTrigger.SessionLosses}
	bind:selected={selectedOption[AnimationTrigger.SessionLosses]}
	on:select={select}
>
	Session Losses Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When Session Games Change"
	value={AnimationTrigger.SessionGames}
	bind:selected={selectedOption[AnimationTrigger.SessionGames]}
	on:select={select}
>
	Session Games Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When Session Rating Change"
	value={AnimationTrigger.SessionRating}
	bind:selected={selectedOption[AnimationTrigger.SessionRating]}
	on:select={select}
>
	Session Rating Change
</SelectAnimationTriggerOption>
