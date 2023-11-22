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

		if (option[AnimationTrigger.GameCountdown])
			trigger =
				(currentSecond > 0 && currentSecond < 6 && currentSecond < (prevSecond ?? 0)) ||
				trigger;

		prevSecond = currentSecond;
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
		if (option[AnimationTrigger.CurrentPlayerPercent])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
					(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) ||
				trigger;

		if (option[AnimationTrigger.CurrentPlayerStockLost])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
					(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.post.stocksRemaining ??
						0) || trigger;

		if (option[AnimationTrigger.CurrentPlayerCharacterChange])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.internalCharacterId ?? 0) !==
					(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.post
						.internalCharacterId ?? 0) || trigger;

		prevCurrentPlayerFrame = gameFrame;
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

		if (option[AnimationTrigger.Player1Percent])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
					(prevPlayer1Frame?.players?.[player.playerIndex]?.pre.percent ?? 0) || trigger;

		if (option[AnimationTrigger.Player1StockLost])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
					(prevPlayer1Frame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) ||
				trigger;

		if (option[AnimationTrigger.Player1CharacterChange])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.internalCharacterId ?? 0) !==
					(prevPlayer1Frame?.players?.[player.playerIndex]?.post.internalCharacterId ??
						0) || trigger;

		prevPlayer1Frame = gameFrame;
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

		if (option[AnimationTrigger.Player2Percent])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
					(prevPlayer2Frame?.players?.[player.playerIndex]?.pre.percent ?? 0) || trigger;

		if (option[AnimationTrigger.Player2StockLost])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
					(prevPlayer2Frame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) ||
				trigger;

		if (option[AnimationTrigger.Player2CharacterChange])
			trigger =
				(gameFrame?.players?.[player.playerIndex]?.post.internalCharacterId ?? 0) !==
					(prevPlayer2Frame?.players?.[player.playerIndex]?.post.internalCharacterId ??
						0) || trigger;

		prevPlayer2Frame = gameFrame;
		return trigger;
	};
</script>
