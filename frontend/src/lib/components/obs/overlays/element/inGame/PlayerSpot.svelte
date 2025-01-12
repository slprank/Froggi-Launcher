<script lang="ts">
	import { onDestroy } from 'svelte';
	import { gameFrame, currentPlayers } from '$lib/utils/store.svelte';
	import type { PlayerFrameType } from '$lib/models/types/slippiData';
	import { get } from 'svelte/store';

	let player1Frame: PlayerFrameType | null | undefined;
	let player2Frame: PlayerFrameType | null | undefined;

	const unsubscribeGameFrame = gameFrame.subscribe(($gameFrame) => {
		const players = get(currentPlayers);

		const p1Index = players?.[0]?.playerIndex ?? 0;
		const p2Index = players?.[1]?.playerIndex ?? 1;

		player1Frame = $gameFrame?.players?.[p1Index];
		player2Frame = $gameFrame?.players?.[p2Index];
	});

	onDestroy(() => {
		unsubscribeGameFrame();
	});
</script>

<!-- Two circles for the player positions -->
<circle
	cx={player1Frame?.pre?.positionX ?? 0}
	cy={(player1Frame?.pre?.positionY ?? 0) + 5}
	r="5"
	fill="blue"
/>
<circle
	cx={player2Frame?.pre?.positionX ?? 0}
	cy={(player2Frame?.pre?.positionY ?? 0) + 5}
	r="5"
	fill="red"
/>
