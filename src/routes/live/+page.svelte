<script lang="ts">
	import OngoingGame from '$lib/components/live/OngoingGame.svelte';
	import PlayerRankStats from '$lib/components/live/PlayerRankStats.svelte';
	import PostGameStats from '$lib/components/live/PostGameStats.svelte';
	import RankChange from '$lib/components/live/RankChange.svelte';
	import WaitingDolphin from '$lib/components/live/WaitingDolphin.svelte';
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
	import { fly } from 'svelte/transition';

	function testStats() {
		$eventEmitter.emit('send-message', 'test-live-stats', 10);
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

	setTimeout(() => {
		$statsScene = 4;
	}, 2000);
</script>

<div
	class="h-screen w-screen bg-cover bg-center"
	style="background-image: url('./background/MeleeMenuAll.png')"
>
	{#if $statsScene == LiveStatsScene.WaitingForDolphin}
		<div in:fly={{ y: -200, duration: 300, delay: 1000 }} out:fly={{ y: -200, duration: 300 }}>
			<WaitingDolphin />
		</div>
	{/if}
	{#if $statsScene == LiveStatsScene.PlayerRankStats}
		<div in:fly={{ y: -200, duration: 300, delay: 1000 }} out:fly={{ y: -200, duration: 300 }}>
			<PlayerRankStats />
		</div>
	{/if}
	{#if $statsScene == LiveStatsScene.OngoingGame}
		<div in:fly={{ y: -200, duration: 300, delay: 1000 }} out:fly={{ y: -200, duration: 300 }}>
			<OngoingGame />
		</div>
	{/if}
	{#if $statsScene == LiveStatsScene.PostGameStats}
		<div in:fly={{ y: -200, duration: 300, delay: 1000 }} out:fly={{ y: -200, duration: 300 }}>
			<PostGameStats />
		</div>
	{/if}
	{#if $statsScene == LiveStatsScene.RankChange}
		<div in:fly={{ y: -200, duration: 300, delay: 1000 }} out:fly={{ y: -200, duration: 300 }}>
			<RankChange />
		</div>
	{/if}
	<button on:click={testStats}>Test Stats</button>
</div>

<style>
</style>
