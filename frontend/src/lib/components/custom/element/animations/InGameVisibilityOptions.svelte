<script lang="ts" context="module">
	import { InGameState } from '$lib/models/enum';
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import {
		getGameFrame,
		getGameSettings,
		getGameState,
	} from '$lib/utils/FetchSubscriptions.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';

	export const inGameVisibilityOption = async (option: SelectedVisibilityOption) => {
		const gameFrame = await getGameFrame();
		const gameSettings = await getGameSettings();
		const gameState = await getGameState();

		if (option[VisibilityOption.InGameRunning] === VisibilityToggle.True)
			if (gameState === InGameState.Running) return true;
		if (option[VisibilityOption.InGameRunning] === VisibilityToggle.False)
			if (gameState !== InGameState.Running) return true;

		if (option[VisibilityOption.InGamePaused] === VisibilityToggle.True)
			if (gameState === InGameState.Paused) return true;
		if (option[VisibilityOption.InGamePaused] === VisibilityToggle.False)
			if (gameState !== InGameState.Paused) return true;

		if (option[VisibilityOption.InGameReady] === VisibilityToggle.True)
			if (isGameReady(gameFrame)) return true;
		if (option[VisibilityOption.InGameReady] === VisibilityToggle.False)
			if (!isGameReady(gameFrame)) return true;

		if (option[VisibilityOption.InGameGo] === VisibilityToggle.True)
			if (isGameGo(gameFrame)) return true;
		if (option[VisibilityOption.InGameGo] === VisibilityToggle.False)
			if (!isGameGo(gameFrame)) return true;

		const seconds = (gameSettings?.startingTimerSeconds ?? 480) - (gameFrame?.frame ?? 0) / 60;
		if (option[VisibilityOption.InGameCountdown] === VisibilityToggle.True) {
			if (isGameCountdown(seconds)) return true;
		}
		if (option[VisibilityOption.InGameCountdown] === VisibilityToggle.False) {
			if (!isGameCountdown(seconds)) return true;
		}

		if (option[VisibilityOption.InGameEnd] === VisibilityToggle.True)
			if (isGameEnd(gameState)) return true;
		if (option[VisibilityOption.InGameEnd] === VisibilityToggle.False)
			if (!isGameEnd(gameState)) return true;

		if (option[VisibilityOption.InGameTime] === VisibilityToggle.True)
			if (isGameTime(gameState)) return true;
		if (option[VisibilityOption.InGameTime] === VisibilityToggle.False)
			if (!isGameTime(gameState)) return true;

		return false;
	};

	const isGameReady = (gameFrame: FrameEntryType | null) => {
		return (gameFrame?.frame ?? 0) <= -36;
	};

	const isGameGo = (gameFrame: FrameEntryType | null) => {
		return (gameFrame?.frame ?? 0) >= -36 && (gameFrame?.frame ?? 0) < 0;
	};

	const isGameCountdown = (seconds: number) => {
		return seconds >= 0 && seconds < 5;
	};

	const isGameEnd = (gameState: InGameState) => {
		return gameState === InGameState.End;
	};

	const isGameTime = (gameState: InGameState) => {
		return gameState === InGameState.Time;
	};
</script>
