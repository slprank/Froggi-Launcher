<script lang="ts">
	import { currentPlayers, gameFrame } from '$lib/utils/store.svelte';

	$: player1Frame = $gameFrame?.players?.[$currentPlayers.at(0)?.playerIndex ?? 0];
	$: player2Frame = $gameFrame?.players?.[$currentPlayers.at(1)?.playerIndex ?? 1];
</script>

<circle
	cx={player1Frame?.pre.positionX}
	cy={(player1Frame?.pre.positionY ?? 0) + 5}
	r="5"
	fill="blue"
/>
<circle
	cx={player2Frame?.pre.positionX}
	cy={(player2Frame?.pre.positionY ?? 0) + 5}
	r="5"
	fill="red"
/>
