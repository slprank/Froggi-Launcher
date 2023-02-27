<script lang="ts">
	import { eventEmitter } from '$lib/utils/store.svelte';

	$eventEmitter.on('game_start', (data: any) => {
		player1CharacterId = data?.players[0].characterId;
		player1CharacterColor = data?.players[0].characterColor;
		gameStatus = 'start';
	});

	$eventEmitter.on('game_frame', (data: any) => {
		gameFrame = data.start.frame;
		player1Percent = data.players[0].post.percent;
		player1ShieldSize = data.players[0].post.shieldSize;
		player1PositionX = data.players[0].post.positionX;
	});

	$eventEmitter.on('game_end', (data: any) => {
		gameStatus = 'End';
	});

	$: gameStatus = '';
	$: gameFrame = '';
	$: player1CharacterId = '';
	$: player1CharacterColor = '';
	$: player1Percent = '';
	$: player1ShieldSize = '';
	$: player1PositionX = '';
</script>

<h1>Game status: {gameStatus}</h1>
<h1>Game frame: {gameFrame}</h1>
<h1>Player 1 CharacterId: {player1CharacterId}</h1>
<h1>Player 1 CharacterColor: {player1CharacterColor}</h1>
<h1>Player 1 Percent: {player1Percent}</h1>
<h1>Player 1 Shield Size: {player1ShieldSize}</h1>
<h1>Player 1 Position X: {player1PositionX}</h1>

<style>
</style>
