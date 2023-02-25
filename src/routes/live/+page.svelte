<script lang="ts">
	import { socket } from '$lib/utils/store.svelte';
	import { browser } from '$app/environment';

	// receive a message from the server
	if (window.electron && browser) {
		window.electron.receive('game_start', (data: any) => {
			gameStart(data);
		});
		window.electron.receive('game_frame', (data: any) => {
			gameFrameData(data);
		});
		window.electron.receive('game_end', (data: any) => {
			gameEnd(data);
		});
	} else {
		$socket.addEventListener('message', ({ data }) => {
			let parse = JSON.parse(data);
			gameStart(parse?.game_start);
			gameFrameData(parse?.game_frame);
			gameEnd(parse?.game_end);
		});
	}

	function gameStart(data: any) {
		if (!data) return;
		player1CharacterId = data?.players[0].characterId;
		player1CharacterColor = data?.players[0].characterColor;
		gameStatus = 'start';
	}
	function gameFrameData(data: any) {
		if (!data) return;
		gameFrame = data.start.frame;
		player1Percent = data.players[0].post.percent;
		player1ShieldSize = data.players[0].post.shieldSize;
		player1PositionX = data.players[0].post.positionX;
	}
	function gameEnd(data: any) {
		if (!data) return;
		gameStatus = 'End';
	}

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
