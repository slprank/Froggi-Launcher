<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import type { Player } from '$lib/models/types/slippiData';
	import { getComboCount, hasStocksRemaining, isPlayerAlive } from '$lib/utils/gamePredicates';
	import type { FrameEntryType } from '@slippi/slippi-js';

	export const inGamePlayer2VisibilityOption = (
		option: SelectedVisibilityOption,
		gameFrame: FrameEntryType | null | undefined,
		players: Player[],
	) => {
		const player = players?.at(1);

		if (option[VisibilityOption.InGamePlayer2Alive] === VisibilityToggle.True)
			if (isPlayerAlive(gameFrame, player?.playerIndex ?? 1)) return true;
		if (option[VisibilityOption.InGamePlayer2Stock1] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 1)) return true;
		if (option[VisibilityOption.InGamePlayer2Stock2] === VisibilityToggle.True)
			if (hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 2)) return true;
		if (option[VisibilityOption.InGamePlayer2Stock2] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 2)) return true;
		if (option[VisibilityOption.InGamePlayer2Stock3] === VisibilityToggle.True)
			if (hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 3)) return true;
		if (option[VisibilityOption.InGamePlayer2Stock3] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 3)) return true;
		if (option[VisibilityOption.InGamePlayer2Stock4] === VisibilityToggle.True)
			if (hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 4)) return true;
		if (option[VisibilityOption.InGamePlayer2Stock4] === VisibilityToggle.False)
			if (!hasStocksRemaining(gameFrame, player?.playerIndex ?? 0, 4)) return true;
		if (option[VisibilityOption.InGamePlayer2Combo] === VisibilityToggle.True)
			if (getComboCount(gameFrame, player?.playerIndex ?? 0) >= 3) return true;
		if (option[VisibilityOption.InGamePlayer2Combo] === VisibilityToggle.False)
			if (getComboCount(gameFrame, player?.playerIndex ?? 0) < 3) return true;

		return false;
	};
</script>
