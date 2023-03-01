<script lang="ts">
	import { eventEmitter } from '$lib/utils/store.svelte';
	import type {
		ActionCountsType,
		ComboType,
		ConversionType,
		FrameEntryType,
		GameEndType,
		GameStartType,
		OverallType,
		StatsType,
		StockType,
	} from '@slippi/slippi-js';

	$eventEmitter.on('game_start', (data: GameStartType) => {
		console.log(data);
		player1CharacterId = data?.players[0].characterId ?? 0;
		player1CharacterColor = data?.players[0].characterColor ?? 0;
		gameStatus = 'start';
	});

	$eventEmitter.on('game_frame', (data: FrameEntryType) => {
		console.log(data);
		gameFrame = data?.start?.frame ?? 0;
		player1Percent = data?.players[0]?.post.percent ?? 0;
		player1ShieldSize = data?.players[0]?.post.shieldSize ?? 0;
		player1PositionX = data?.players[0]?.post.positionX ?? 0;
	});

	$eventEmitter.on('game_end', (data: GameEndType) => {
		console.log(data);
		gameStatus = 'End';
	});

	$: gameStatus = '';
	$: gameFrame = 0;
	$: player1CharacterId = 0;
	$: player1CharacterColor = 0;
	$: player1Percent = 0;
	$: player1ShieldSize = 0;
	$: player1PositionX = 0;
</script>

<div
	class="h-screen w-screen bg-cover bg-center pl-20"
	style="background-image: url('./background/MeleeMenuAll.png')"
>
	<h1 class="text-white">Game status: {gameStatus}</h1>
	<h1 class="text-white">Game frame: {gameFrame}</h1>
	<h1 class="text-white">Player 1 CharacterId: {player1CharacterId}</h1>
	<h1 class="text-white">Player 1 CharacterColor: {player1CharacterColor}</h1>
	<h1 class="text-white">Player 1 Percent: {player1Percent}</h1>
	<h1 class="text-white">Player 1 Shield Size: {player1ShieldSize}</h1>
	<h1 class="text-white">Player 1 Position X: {player1PositionX}</h1>
</div>

<style>
</style>
