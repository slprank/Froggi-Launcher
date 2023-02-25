<script lang="ts">
	import { socket } from '$lib/utils/store.svelte';
	import { browser } from '$app/environment';

	// receive a message from the server
	if (window.electron && browser) {
		window.electron.receive('game_start', (data: any) => {
			player1CharacterId = data?.players[0].characterId;
			player1CharacterColor = data?.players[0].characterColor;
		});
		window.electron.receive('game_frame', (data: any) => {
			player1Percent = data.players[0].post.percent;
			player1ShieldSize = data.players[0].post.shieldSize;
			player1PositionX = data.players[0].post.positionX;
		});
	} else {
		$socket.addEventListener('message', ({ data }) => {
			let parse = JSON.parse(data);
			if (parse.game_start) {
				player1CharacterId = parse?.game_start?.players[0].characterId;
				player1CharacterColor = parse?.game_start?.players[0].characterColor;
			}
			if (parse.game_frame) {
				player1Percent = parse.game_frame.players[0].post.percent;
				player1ShieldSize = parse.game_frame.players[0].post.shieldSize;
				player1PositionX = parse.game_frame.players[0].post.positionX;
			}
		});
	}
	$: player1CharacterId = '';
	$: player1CharacterColor = '';
	$: gameFrame = '';
	$: player1Percent = '';
	$: player1ShieldSize = '';
	$: player1PositionX = '';
</script>

<h1>Hello Test</h1>
<h1>Game frame: {gameFrame}</h1>
<h1>Player 1 CharacterId: {player1CharacterId}</h1>
<h1>Player 1 CharacterColor: {player1CharacterColor}</h1>
<h1>Player 1 Percent: {player1Percent}</h1>
<h1>Player 1 Shield Size: {player1ShieldSize}</h1>
<h1>Player 1 Position X: {player1PositionX}</h1>

<style>
</style>
