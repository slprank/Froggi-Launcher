<script lang="ts" context="module">
	import {
		AnimationTrigger,
		type SelectedAnimationTriggerOption,
	} from '$lib/models/types/animationOption';

	let prevScore: number[];
	export const matchStateTrigger = (option: SelectedAnimationTriggerOption, score: number[]) => {
		let trigger = false;
		setTimeout(() => (prevScore = score));

		if (option[AnimationTrigger.MatchPlayer1ScoreChange])
			trigger = prevScore[0] !== score[0] || trigger;

		if (option[AnimationTrigger.MatchPlayer2ScoreChange])
			trigger = prevScore[1] !== score[1] || trigger;

		return trigger;
	};
</script>
