<script lang="ts">
	import { LiveStatsScene } from '$lib/types/enum';
	import { eventEmitter, statsScene } from '$lib/utils/store.svelte';
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

	function testStats() {
		$eventEmitter.emit('send-message', 'test-live-stats', null);
	}

	$eventEmitter.on('game_frame', (data: FrameEntryType) => {
		gameFrame = data?.start?.frame ?? 0;
		player1Percent = data?.players[0]?.post.percent ?? 0;
		player1ShieldSize = data?.players[0]?.post.shieldSize ?? 0;
		player1PositionX = data?.players[0]?.post.positionX ?? 0;
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
	{#if $statsScene == LiveStatsScene.WaitingForDolphin}
		<h1>Waiting for dolphin</h1>
		<h1 class="text-white">Game status: {gameStatus}</h1>
		<h1 class="text-white">Game frame: {gameFrame}</h1>
		<h1 class="text-white">Player 1 CharacterId: {player1CharacterId}</h1>
		<h1 class="text-white">Player 1 CharacterColor: {player1CharacterColor}</h1>
		<h1 class="text-white">Player 1 Percent: {player1Percent}</h1>
		<h1 class="text-white">Player 1 Shield Size: {player1ShieldSize}</h1>
		<h1 class="text-white">Player 1 Position X: {player1PositionX}</h1>
	{/if}
	{#if $statsScene == LiveStatsScene.PlayerRankedStats}
		<h1 class="text-white">Player rank</h1>
		<h1 class="text-white">GM</h1>
		<h1 class="text-white">Yadda</h1>
	{/if}
	{#if $statsScene == LiveStatsScene.OngoingGame}
		<h1 class="text-white">Player</h1>
		<h1 class="text-white">Score</h1>
		<h1 class="text-white">Bleh</h1>
	{/if}
	{#if $statsScene == LiveStatsScene.PostGameStats}
		<h1 class="text-white">Player</h1>
		<h1 class="text-white">Total damage</h1>
		<h1 class="text-white">Stocks</h1>
	{/if}
	{#if $statsScene == LiveStatsScene.PostGameStats}
		<h1 class="text-white">Player</h1>
		<h1 class="text-white">Total damage</h1>
		<h1 class="text-white">Stocks</h1>
	{/if}
	{#if $statsScene == LiveStatsScene.RankChange}
		<h1 class="text-white">RANKING UP!?!</h1>
		<h1 class="text-white">Poggers</h1>
		<h1 class="text-white">Nice</h1>
	{/if}
	<button on:click={testStats}>Test Stats</button>
</div>

<style>
</style>
