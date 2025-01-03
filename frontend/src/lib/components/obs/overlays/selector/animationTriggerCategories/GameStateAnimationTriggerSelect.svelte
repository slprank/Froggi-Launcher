<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		AnimationTrigger,
		type SelectedAnimationTriggerCondition,
	} from '$lib/models/types/animationOption';
	import SelectAnimationTriggerOption from './SelectAnimationTriggerOption.svelte';

	export let selectedOption: SelectedAnimationTriggerCondition;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<AnimationTrigger>) {
		dispatch('select', event.detail);
	}
</script>

<SelectAnimationTriggerOption
	description="Every second counting down from 5"
	value={AnimationTrigger.InGameGameCountdown}
	bind:selected={selectedOption[AnimationTrigger.InGameGameCountdown]}
	on:select={select}
>
	Game Countdown
</SelectAnimationTriggerOption>
