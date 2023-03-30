<script lang="ts">
	import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';

	// TODO add filter dropdowns
	// Add and generate 500 lines of dummy data
</script>

<main
	class="fixed h-screen w-screen max-h-full max-w-full bg-cover bg-center lg:flex justify-center"
	style="background-image: url('./background/MeleeMenuGreen.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="place-items-start px-2 md:px-20 w-full h-full max-h-full max-w-full">
		<div class="w-full h-12 grid content-center">
			<h1 class="text-white text-md md:text-xl">Leaderboard</h1>
		</div>
		<div class="w-full h-16 flex">
			<div class="w-16 h-full border">Region</div>
			<div class="w-16 h-full border">Character</div>
			<div class="w-16 h-full border">Something</div>
		</div>

		<div class="overflow-scroll">
			<div class="w-full h-12 grid grid-cols-12 col-span-12 min-w-2xl max-w-6xl">
				<div
					class="w-full h-full grid grid-cols-12 col-span-12 border-b-1 border-gray-500 rounded-t-md bg-black bg-opacity-50"
				>
					<div class="w-full h-12 col-span-2 grid content-center justify-center">
						<TextFitMulti textClass="text-white text-xl">RANK</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-3 grid content-center justify-start">
						<TextFitMulti textClass="text-white text-xl">PLAYER</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-3 grid content-center justify-start">
						<TextFitMulti textClass="text-white text-xl">CHARACTERS</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-2 grid content-center justify-center">
						<TextFitMulti textClass="text-white text-xl">RATING</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-2 grid content-center justify-center">
						<TextFitMulti textClass="text-white text-xl">W/L</TextFitMulti>
					</div>
				</div>
			</div>
			<div
				class="w-full grid grid-cols-12 max-h-full overflow-scroll min-w-2xl max-w-6xl
			[&>*:nth-child(odd)]:bg-black [&>*:nth-child(odd)]:bg-opacity-25 
			[&>*:nth-child(even)]:bg-black [&>*:nth-child(even)]:bg-opacity-50"
			>
				{#each Array.from(Array(10)) as _, i}
					<LeaderboardRow
						player={{
							rank: i + 1,
							nickname: (Math.random() + 1).toString(36).substring(3),
							connectCode: `${Math.random()
								.toString(36)
								.substring(7, 11)}#${Math.floor(Math.random() * 800 + 100)}`,
							characters: Array.from(
								Array(Math.floor(Math.random() * 2 + 1)).keys(),
							).map(() => Math.floor(Math.random() * 24)),
							rating: 2500,
							winLoss: '1024/32',
						}}
					/>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
</style>
