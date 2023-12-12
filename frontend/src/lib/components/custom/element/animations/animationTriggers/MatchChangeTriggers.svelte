<script lang="ts" context="module">
	import {
		AnimationTrigger,
		type SelectedAnimationTriggerOption,
	} from '$lib/models/types/animationOption';

	let prevScore: number[] | undefined;
	export const matchStateTrigger = (option: SelectedAnimationTriggerOption, score: number[]) => {
		let trigger = false;

		if (option[AnimationTrigger.MatchPlayer1ScoreChange])
			trigger = prevScore?.at(0) !== score.at(0) || trigger;

		if (option[AnimationTrigger.MatchPlayer2ScoreChange])
			trigger = prevScore?.at(1) !== score.at(1) || trigger;

		prevScore = score;
		return trigger;
	};
</script>
