<script lang="ts">
	import { fade } from 'svelte/transition';
	import OngoingGame from '$lib/components/live/OngoingGame/OngoingGame.svelte';
	import PlayerRankStats from '$lib/components/live/PlayerRankStats/PlayerRankStats.svelte';
	import PostGameStats from '$lib/components/live/PostGameStats/PostGameStats.svelte';
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
		console.log(data);
	});

	setTimeout(() => {
		$statsScene = 6;
	}, 2000);
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('./background/MeleeMenuAll.png')"
	in:fade={{ delay: 150, duration: 150 }}
	out:fade={{ duration: 150 }}
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
</main>

<style>
</style>
