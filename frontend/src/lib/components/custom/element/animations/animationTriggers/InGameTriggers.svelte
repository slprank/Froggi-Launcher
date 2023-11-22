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
			if (currentSecond > 0 && currentSecond < 6 && currentSecond < (prevSecond ?? 0))
				trigger = true;

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
		if (option[AnimationTrigger.CurrentPlayerPercent]) {
			if (
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
				(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.pre.percent ?? 0)
			)
				trigger = true;
		}
		if (option[AnimationTrigger.CurrentPlayerStockLost])
			if (
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
				(prevCurrentPlayerFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0)
			)
				trigger = true;

		// TODO: Character Switch

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
		let trigger = false;

		if (option[AnimationTrigger.Player1Percent]) {
			if (
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
				(prevPlayer1Frame?.players?.[player.playerIndex]?.pre.percent ?? 0)
			)
				trigger = true;
		}
		if (option[AnimationTrigger.Player1StockLost])
			if (
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
				(prevPlayer1Frame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0)
			)
				trigger = true;

		// TODO: Character Switch

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

		if (option[AnimationTrigger.Player2Percent]) {
			if (
				(gameFrame?.players?.[player.playerIndex]?.pre.percent ?? 0) >
				(prevPlayer2Frame?.players?.[player.playerIndex]?.pre.percent ?? 0)
			)
				trigger = true;
		}

		if (option[AnimationTrigger.Player2StockLost])
			if (
				(gameFrame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0) >
				(prevPlayer2Frame?.players?.[player.playerIndex]?.post.stocksRemaining ?? 0)
			)
				trigger = true;

		// TODO: Character Switch

		prevPlayer2Frame = gameFrame;
		return trigger;
	};
</script>
