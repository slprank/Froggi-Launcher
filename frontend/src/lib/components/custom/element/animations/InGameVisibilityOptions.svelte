<script lang="ts" context="module">
	import { InGameState } from '$lib/models/enum';
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import { gameFrame, gameSettings, gameState } from '$lib/utils/store.svelte';
	import type { FrameEntryType, GameStartType } from '@slippi/slippi-js';

	export const inGameVisibilityOption = async (option: SelectedVisibilityOption) => {
		const gameFrame = await getGameFrame();
		const gameSettings = await getGameSettings();
		const gameState = await getGameState();

		if (option[VisibilityOption.GameRunning] === VisibilityToggle.True)
			if (gameState === InGameState.Running) return true;
		if (option[VisibilityOption.GameRunning] === VisibilityToggle.False)
			if (gameState !== InGameState.Running) return true;

		if (option[VisibilityOption.GamePaused] === VisibilityToggle.True)
			if (gameState === InGameState.Paused) return true;
		if (option[VisibilityOption.GamePaused] === VisibilityToggle.False)
			if (gameState !== InGameState.Paused) return true;

		if (option[VisibilityOption.GameReady] === VisibilityToggle.True)
			if (isGameReady(gameFrame)) return true;
		if (option[VisibilityOption.GameReady] === VisibilityToggle.False)
			if (!isGameReady(gameFrame)) return true;

		if (option[VisibilityOption.GameGo] === VisibilityToggle.True)
			if (isGameGo(gameFrame)) return true;
		if (option[VisibilityOption.GameGo] === VisibilityToggle.False)
			if (!isGameGo(gameFrame)) return true;

		const seconds = (gameSettings?.startingTimerSeconds ?? 480) - (gameFrame?.frame ?? 0) / 60;
		if (option[VisibilityOption.GameCountdown] === VisibilityToggle.True) {
			if (isGameCountdown(seconds)) return true;
		}
		if (option[VisibilityOption.GameCountdown] === VisibilityToggle.False) {
			if (!isGameCountdown(seconds)) return true;
		}

		if (option[VisibilityOption.GameEnd] === VisibilityToggle.True)
			if (isGameEnd(gameState)) return true;
		if (option[VisibilityOption.GameEnd] === VisibilityToggle.False)
			if (!isGameEnd(gameState)) return true;

		if (option[VisibilityOption.GameTime] === VisibilityToggle.True)
			if (isGameTime(gameState)) return true;
		if (option[VisibilityOption.GameTime] === VisibilityToggle.False)
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

	async function getGameFrame(): Promise<FrameEntryType | null> {
		return await new Promise<FrameEntryType | null>((resolve) => {
			gameFrame.subscribe((gameFrame) => {
				resolve(gameFrame);
			});
		});
	}
	async function getGameSettings(): Promise<GameStartType> {
		return await new Promise<GameStartType>((resolve) => {
			gameSettings.subscribe((gameSettings) => {
				resolve(gameSettings);
			});
		});
	}
	async function getGameState(): Promise<InGameState> {
		return await new Promise<InGameState>((resolve) => {
			gameState.subscribe((gameState) => {
				resolve(gameState);
			});
		});
	}
</script>
