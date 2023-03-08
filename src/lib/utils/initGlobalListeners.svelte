<script lang="ts">
	import {
		eventEmitter,
		currentPlayerRankStats,
		currentPlayersRankStats,
		gameScore,
		gameSettings,
		gameStats,
		recentRankedSets,
		sessionStats,
		statsScene,
		urls,
	} from '$lib/utils/store.svelte';

	$eventEmitter.on('initCurrentPlayerRankStats', (rankStats: any) => {
		$currentPlayerRankStats = rankStats;
	});
	$eventEmitter.on('initCurrentPlayersRankStats', (playersRankStats: any) => {
		$currentPlayersRankStats = playersRankStats;
	});
	$eventEmitter.on('initGameScore', (score: any) => {
		$gameScore = score;
	});
	$eventEmitter.on('initGameSettings', (settings: any) => {
		$gameSettings = settings;
	});
	$eventEmitter.on('initGameStats', (stats: any) => {
		$gameStats = stats;
	});
	$eventEmitter.on('initRecentRankedSets', (recentSets: any) => {
		$recentRankedSets = recentSets;
	});
	$eventEmitter.on('initSessionStats', (session: any) => {
		$sessionStats = session;
	});
	$eventEmitter.on('initStatsScene', (scene: any) => {
		$statsScene = scene;
	});
	$eventEmitter.on('initUrls', (data: any) => {
		$urls = data;
	});
</script>
