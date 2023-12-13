<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import type { Player } from '$lib/models/types/slippiData';
	import { getGameFrame, getPlayers } from '$lib/utils/fetchSubscriptions.svelte';
	import { getComboCount, hasStocksRemaining } from '$lib/utils/gamePredicates';
	import type { FrameEntryType } from '@slippi/slippi-js';

	export const inGamePlayer1VisibilityOption = (
		option: SelectedVisibilityOption,
		gameFrame: FrameEntryType | null | undefined,
		players: Player[],
	) => {
		const player = players?.at(0);

		if (option[VisibilityOption.InGamePlayer1Stock1] === VisibilityToggle.True)
			if (hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 1)) return true;
		if (option[VisibilityOption.InGamePlayer1Stock1] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 1)) return true;
		if (option[VisibilityOption.InGamePlayer1Stock2] === VisibilityToggle.True)
			if (hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 2)) return true;
		if (option[VisibilityOption.InGamePlayer1Stock2] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 2)) return true;
		if (option[VisibilityOption.InGamePlayer1Stock3] === VisibilityToggle.True)
			if (hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 3)) return true;
		if (option[VisibilityOption.InGamePlayer1Stock3] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 3)) return true;
		if (option[VisibilityOption.InGamePlayer1Stock4] === VisibilityToggle.True)
			if (hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 4)) return true;
		if (option[VisibilityOption.InGamePlayer1Stock4] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 4)) return true;
		if (option[VisibilityOption.InGamePlayer1Combo] === VisibilityToggle.True)
			if (getComboCount(gameFrame, player?.playerIndex ?? 0)) return true;
		if (option[VisibilityOption.InGamePlayer1Combo] === VisibilityToggle.False)
			if (!getComboCount(gameFrame, player?.playerIndex ?? 0)) return true;

		return false;
	};
</script>
