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
	description="When Rank Icon Changes"
	value={AnimationTrigger.RankStatsIconChange}
	bind:selected={selectedOption[AnimationTrigger.RankStatsIconChange]}
	on:select={select}
>
	Rank Icon Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When Rank Rating Changes"
	value={AnimationTrigger.RankStatsRatingChange}
	bind:selected={selectedOption[AnimationTrigger.RankStatsRatingChange]}
	on:select={select}
>
	Rank Rating Change
</SelectAnimationTriggerOption>
