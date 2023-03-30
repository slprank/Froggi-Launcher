<script>
	import CharacterIcon from '$lib/components/leaderboard/CharacterIcon.svelte';
	import LazyLoad from '@dimfeld/svelte-lazyload';
	import { fade } from 'svelte/transition';

	// TODO: Click on name directs to profile page
	// TODO: Implement player type
	export let player;
</script>

<LazyLoad class="w-full h-12 col-span-12 border-b-1 border-gray-500">
	<div class="w-full h-12 grid grid-cols-12 gap-1" in:fade={{ duration: 100 }}>
		<div class="w-full h-12 col-span-2 grid content-center justify-center">
			<h1 class="whitespace-nowrap m-0 font-medium text-white text-xl">{player.rank}</h1>
		</div>
		<div class="w-full h-12 col-span-3 grid grid-rows-6 content-center">
			<div class="w-full h-full max-w-full row-span-3">
				<h1 class="w-full max-w-full text-white text-xl">
					{player.nickname}
				</h1>
			</div>
			<div class="w-full h-full max-w-full row-span-2">
				<h1 class="w-full max-w-full text-gray-500 text-md">
					{player.connectCode}
				</h1>
			</div>
		</div>
		<div class="w-full h-12 col-span-3 flex flex-row gap-2">
			{#each player.characters as characterId}
				<CharacterIcon {characterId} imgClass="w-7 h-7" />
			{/each}
		</div>
		<div class="w-full h-12 col-span-2 grid content-center justify-center">
			<h1 class="whitespace-nowrap m-0 font-medium text-white text-xl">{player.rating}</h1>
		</div>
		<div class="w-full h-12 col-span-2 grid content-center justify-center">
			<h1 class="whitespace-nowrap m-0 font-medium text-white text-xl">{player.winLoss}</h1>
		</div>
	</div>
</LazyLoad>
