<script lang="ts">
	import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
	import MultiSelect from '$lib/components/input/MultiSelect.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { eventEmitter, isMobile } from '$lib/utils/store.svelte';
	import { fade, fly } from 'svelte/transition';
	import LazyLoad from '@dimfeld/svelte-lazyload';

	$: selectedRegions = [];
	$: selectedCharacters = [];

	// TODO: add filter dropdown
	// TODO: fill dropdown options
	// TODO: use array of filters to filter
	// Add horizontal scroll bar on PC
</script>

<main
	class="fixed h-screen w-screen max-h-full max-w-full bg-cover bg-center lg:flex justify-center"
	style="background-image: url('/image/backgrounds/MeleeMenuGreen.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div
		class={`place-items-start px-2 ${
			!$isMobile ? 'md:px-20' : ''
		} w-full h-full max-h-full max-w-6xl pb-12 overflow-hidden`}
	>
		<div class="w-full h-12 grid content-center" in:fly={{ y: 100, duration: 1500 }}>
			<h1 class="text-white text-md md:text-xl whitespace-nowrap m-0 font-medium text-shadow">
				Leaderboard
			</h1>
		</div>
		<div class="w-full h-16 flex" in:fly={{ y: 100, duration: 1500, delay: 150 }}>
			<div class="w-32 mr-2">
				<MultiSelect bind:value={selectedRegions} label="Regions">
					<option value={'NA'}>North America</option>
					<option value={'EU'}>Europe</option>
					<option value={'Other'}>Other</option>
					<option value={'Friends'}>Favorites</option>
				</MultiSelect>
			</div>
			<div class="w-32 mr-2">
				<MultiSelect
					bind:value={selectedCharacters}
					placeholder="Characters"
					isCharacter={true}
				>
					<option value={20}>Falco</option>
					<option value={4}>Kirby</option>
				</MultiSelect>
			</div>
		</div>
		<div class="max-h-full overflow-scroll" in:fly={{ y: 100, duration: 1500, delay: 300 }}>
			<div class="w-full h-12 grid grid-cols-12 col-span-12 min-w-2xl max-w-6xl">
				<div
					class="w-full h-full grid grid-cols-12 col-span-12 border-b-1 border-gray-500 rounded-t-md bg-black bg-opacity-50"
				>
					<div class="w-full h-12 col-span-2 grid content-center justify-center">
						<TextFitMulti
							class="text-white text-xl whitespace-nowrap m-0 font-medium text-shadow"
						>
							RANK
						</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-3 grid content-center justify-start">
						<TextFitMulti
							class="text-white text-xl whitespace-nowrap m-0 font-medium text-shadow"
						>
							PLAYER
						</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-3 grid content-center justify-start">
						<TextFitMulti
							class="text-white text-xl whitespace-nowrap m-0 font-medium text-shadow"
						>
							CHARACTERS
						</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-2 grid content-center justify-center">
						<TextFitMulti
							class="text-white text-xl whitespace-nowrap m-0 font-medium text-shadow"
						>
							RATING
						</TextFitMulti>
					</div>
					<div class="w-full h-12 col-span-2 grid content-center justify-center">
						<TextFitMulti
							class="text-white text-xl whitespace-nowrap m-0 font-medium text-shadow"
						>
							W/L
						</TextFitMulti>
					</div>
				</div>
			</div>
			<div
				class="w-full grid grid-cols-12 min-w-2xl max-w-6xl h-full 
			[&>*:nth-child(odd)]:bg-black [&>*:nth-child(odd)]:bg-opacity-25 
			[&>*:nth-child(even)]:bg-black [&>*:nth-child(even)]:bg-opacity-50"
			>
				{#each Array.from(Array(200)) as _, i}
					<LeaderboardRow
						player={{
							rank: i + 1,
							nickname: (Math.random() + 1).toString(36).substring(3),
							connectCode: `${Math.random()
								.toString(36)
								.substring(7, 11)}#${Math.floor(Math.random() * 800 + 100)}`,
							characters: Array.from(
								Array(Math.floor(Math.random() * 3 + 1)).keys(),
							).map(() => Math.floor(Math.random() * 24)),
							rating: 2500,
							winLoss: '1024/32',
						}}
					/>
				{/each}
			</div>
			<!-- TODO: Replace "true" with leaderboard array -->
			<!-- Updating the leaderboard array will then re-render the elements and cause a new trigger -->
			{#key true}
				<!-- TODO: Render if not end of database* -->
				{#if true}
					<LazyLoad
						class="w-full h-36 md:h-16 grid justify-center content-center mb-36 md:mb-16"
						on:visible={() => console.log('trigger request')}
					>
						<h1 class="text-white text-shadow text-md">Loading..</h1>
					</LazyLoad>
				{/if}
			{/key}
		</div>
	</div>
</main>

<style>
</style>
