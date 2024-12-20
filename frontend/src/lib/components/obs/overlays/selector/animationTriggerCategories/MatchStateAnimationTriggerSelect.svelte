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
	description="When changing the Best Of value"
	value={AnimationTrigger.MatchBestOfChange}
	bind:selected={selectedOption[AnimationTrigger.MatchBestOfChange]}
	on:select={select}
>
	Best Of Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When changing game mode"
	value={AnimationTrigger.MatchGameModeChange}
	bind:selected={selectedOption[AnimationTrigger.MatchGameModeChange]}
	on:select={select}
>
	Game Mode Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When Player 1 Tag Changes"
	value={AnimationTrigger.MatchPlayer1TagChange}
	bind:selected={selectedOption[AnimationTrigger.MatchPlayer1TagChange]}
	on:select={select}
>
	Player 1 Tag Change
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player 2 Tag Changes"
	value={AnimationTrigger.MatchPlayer2TagChange}
	bind:selected={selectedOption[AnimationTrigger.MatchPlayer2TagChange]}
	on:select={select}
>
	Player 2 Tag Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When Player 1 Connect Code Changes"
	value={AnimationTrigger.SlippiRankPlayer1ConnectCodeChange}
	bind:selected={selectedOption[AnimationTrigger.SlippiRankPlayer1ConnectCodeChange]}
	on:select={select}
>
	Player 1 Connect Code Change
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player 2 Connect Code Changes"
	value={AnimationTrigger.SlippiRankPlayer2ConnectCodeChange}
	bind:selected={selectedOption[AnimationTrigger.SlippiRankPlayer2ConnectCodeChange]}
	on:select={select}
>
	Player 2 Connect Code Change
</SelectAnimationTriggerOption>
<SelectAnimationTriggerOption
	description="When Player 1 Score Changes"
	value={AnimationTrigger.MatchPlayer1ScoreChange}
	bind:selected={selectedOption[AnimationTrigger.MatchPlayer1ScoreChange]}
	on:select={select}
>
	Player 1 Score Change
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player 2 Score Changes"
	value={AnimationTrigger.MatchPlayer2ScoreChange}
	bind:selected={selectedOption[AnimationTrigger.MatchPlayer2ScoreChange]}
	on:select={select}
>
	Player 2 Score Change
</SelectAnimationTriggerOption>
