<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import { getGameFrame, getPlayers } from '$lib/utils/fetchSubscriptions.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';

	export const inGamePlayer1VisibilityOption = async (option: SelectedVisibilityOption) => {
		const gameFrame = await getGameFrame();
		const players = await getPlayers();

		const player = players?.at(0);

		if (option[VisibilityOption.InGamePlayer1Combo] === VisibilityToggle.True)
			if (getComboCount(gameFrame, player?.playerIndex ?? 0) >= 3) return true;
		if (option[VisibilityOption.InGamePlayer1Combo] === VisibilityToggle.False)
			if (getComboCount(gameFrame, player?.playerIndex ?? 0) < 3) return true;

		return false;
	};

	const getComboCount = (frame: FrameEntryType | null, playerIndex: number) => {
		return frame?.players[playerIndex]?.post.currentComboCount ?? 0;
	};
</script>
