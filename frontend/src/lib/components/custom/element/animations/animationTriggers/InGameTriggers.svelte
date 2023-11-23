<script lang="ts" context="module">
	import {
		AnimationTrigger,
		type SelectedAnimationTriggerOption,
	} from '$lib/models/types/animationOption';
	import type {
		CurrentPlayer,
		GameStartTypeExtended,
		Player,
	} from '$lib/models/types/slippiData';
	import type { FrameEntryType } from '@slippi/slippi-js';

	let prevSecond: number;
	export const inGameStateTrigger = (
		option: SelectedAnimationTriggerOption,
		gameSettings: GameStartTypeExtended,
		gameFrame: FrameEntryType | null,
	) => {
		if (!gameFrame) return;
		let trigger = false;
		const currentSecond = Math.ceil(
			(gameSettings?.startingTimerSeconds ?? 480) - (gameFrame?.frame ?? 0) / 60,
		);
		setTimeout(() => (prevSecond = currentSecond));

		if (option[AnimationTrigger.InGameGameCountdown])
			trigger =
				(currentSecond > 0 && currentSecond < 6 && currentSecond < (prevSecond ?? 0)) ||
				trigger;

		return trigger;
	};

	let prevCurrentPlayerFrame: FrameEntryType;
	export const currentPlayerInGameTrigger = (
		option: SelectedAnimationTriggerOption,
		player: CurrentPlayer | undefined,
		gameFrame: FrameEntryType | null,
	) => {
		if (!player || !gameFrame) return;
		let trigger = false;
		setTimeout(() => (prevCurrentPlayerFrame = gameFrame));

		if (option[AnimationTrigger.InGameCurrentPlayerPercent])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
					(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) ||
				trigger;

		if (option[AnimationTrigger.InGameCurrentPlayerStockLost])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
					(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.post.stocksRemaining ??
						0) || trigger;

		if (option[AnimationTrigger.InGameCurrentPlayerCharacterChange])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.internalCharacterId ?? 0) !==
					(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.post
						.internalCharacterId ?? 0) || trigger;

		return trigger;
	};

	let prevPlayer1Frame: FrameEntryType;
	export const player1InGameTrigger = (
		option: SelectedAnimationTriggerOption,
		player: Player | undefined,
		gameFrame: FrameEntryType | null,
	) => {
		if (!player || !gameFrame) return;
		let trigger: boolean = false;
		setTimeout(() => (prevPlayer1Frame = gameFrame));

		if (option[AnimationTrigger.InGamePlayer1Percent])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
					(prevPlayer1Frame?.players?.[player.playerIndex]?.pre.percent ?? 0) || trigger;

		if (option[AnimationTrigger.InGamePlayer1StockLost])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
					(prevPlayer1Frame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) ||
				trigger;

		if (option[AnimationTrigger.InGamePlayer1CharacterChange]) {
			trigger =
				gameFrame?.players?.[player.playerIndex]?.post.internalCharacterId !==
					prevPlayer1Frame?.players?.[player.playerIndex]?.post.internalCharacterId ||
				trigger;
		}

		return trigger;
	};

	let prevPlayer2Frame: FrameEntryType;
	export const player2InGameTrigger = (
		option: SelectedAnimationTriggerOption,
		player: Player | undefined,
		gameFrame: FrameEntryType | null,
	) => {
		if (!player || !gameFrame) return;
		let trigger = false;
		setTimeout(() => (prevPlayer2Frame = gameFrame));

		if (option[AnimationTrigger.InGamePlayer2Percent])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
					(prevPlayer2Frame?.players?.[player.playerIndex]?.pre.percent ?? 0) || trigger;

		if (option[AnimationTrigger.InGamePlayer2StockLost])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
					(prevPlayer2Frame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) ||
				trigger;

		if (option[AnimationTrigger.InGamePlayer2CharacterChange])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.internalCharacterId ?? 0) !==
					(prevPlayer2Frame?.players?.[player.playerIndex]?.post.internalCharacterId ??
						0) || trigger;

		prevPlayer2Frame = gameFrame;
		return trigger;
	};
</script>
