<script lang="ts">
	import { fade } from 'svelte/transition';
	import OngoingGame from '$lib/components/live/OngoingGame/OngoingGame.svelte';
	import PlayerRankStats from '$lib/components/live/PlayerRankStats/PlayerRankStats.svelte';
	import PostGameStats from '$lib/components/live/PostGameStats/PostGameStats.svelte';
	import RankChange from '$lib/components/live/RankChange/RankChange.svelte';
	import WaitingDolphin from '$lib/components/live/WaitingDolphin/WaitingDolphin.svelte';
	import { LiveStatsScene } from '$lib/models/enum';
	import { statsScene } from '$lib/utils/store.svelte';

	import { fly } from 'svelte/transition';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	{#if $statsScene === LiveStatsScene.WaitingForDolphin}
		<div
			in:fly={{ y: -200, duration: 300, delay: SCENE_TRANSITION_DELAY }}
			out:fly={{ y: -200, duration: 300 }}
		>
			<WaitingDolphin />
		</div>
	{/if}
	{#if $statsScene === LiveStatsScene.PreGame}
		<div
			in:fly={{ y: -200, duration: 300, delay: SCENE_TRANSITION_DELAY }}
			out:fly={{ y: -200, duration: 300 }}
		>
			<PlayerRankStats />
		</div>
	{/if}
	{#if $statsScene === LiveStatsScene.InGame}
		<div
			in:fly={{ y: -200, duration: 300, delay: SCENE_TRANSITION_DELAY }}
			out:fly={{ y: -200, duration: 300 }}
		>
			<OngoingGame />
		</div>
	{/if}
	{#if $statsScene === LiveStatsScene.PostGame}
		<div
			in:fly={{ y: -200, duration: 300, delay: SCENE_TRANSITION_DELAY }}
			out:fly={{ y: -200, duration: 300, delay: 300 }}
		>
			<PostGameStats />
		</div>
	{/if}
	{#if $statsScene === LiveStatsScene.RankChange}
		<div
			in:fly={{ y: -200, duration: 300, delay: SCENE_TRANSITION_DELAY }}
			out:fly={{ y: -200, duration: 300 }}
		>
			<RankChange />
		</div>
	{/if}
</main>

<style>
</style>
