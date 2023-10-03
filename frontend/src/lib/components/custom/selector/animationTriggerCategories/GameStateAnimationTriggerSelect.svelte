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
	description="While Game Is Counting Down From 5"
	value={AnimationTrigger.GameCountdown}
	bind:selected={selectedOption[AnimationTrigger.GameCountdown]}
	on:select={select}
>
	Game Countdown
</SelectAnimationTriggerOption>
