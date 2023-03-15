<script lang="ts">
	import { isMobile } from '$lib/utils/store.svelte';
	import CurrentSet from '$lib/components/CurrentSet.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import PlayerRank from '$lib/components/PlayerRank.svelte';
	import CharacterIcon from '$lib/components/CharacterIcon.svelte';
</script>

<div class="fixed place-items-start h-screen w-screen grid gap-y-0 z-3">
	<div class="w-full mt-2 z-20 px-2 md:px-16">
		<CurrentSet />
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-10 gap-2 lg:gap-1 place-items-center justify-items-stretch"
		>
			<TextFitMulti
				text={'2464.3'}
				divClass="grid justify-items-end col-span-4"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'RATING'}
				divClass="grid justify-items-center col-span-2"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'2932.1'}
				divClass="grid justify-items-start col-span-4"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
		</div>
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-10 gap-2 lg:gap-1 place-items-center justify-items-stretch"
		>
			<TextFitMulti
				text={'#17 [EU]'}
				divClass="grid justify-items-end col-span-4"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'RANK'}
				divClass="grid justify-items-center col-span-2"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'#3 [NA]'}
				divClass="grid justify-items-start col-span-4"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
		</div>
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-10 gap-2 lg:gap-1 place-items-center justify-items-stretch"
		>
			<TextFitMulti
				text={'1024/42'}
				divClass="grid justify-items-end col-span-4"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'W/L'}
				divClass="grid justify-items-center col-span-2"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'69/4'}
				divClass="grid justify-items-start col-span-4"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
		</div>
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-10 gap-2 lg:gap-1 place-items-center justify-items-stretch"
		>
			<div class="flex justify-end col-span-4 gap-2 h-full w-full">
				{#each [[20, 0], [0, 0]] as character}
					<CharacterIcon
						{character}
						imgClass="w-7 sm:8 sm:w-10 lg:w-12"
						divClass="ml-2"
					/>
				{/each}
			</div>
			<TextFitMulti
				text={''}
				divClass="grid justify-items-center col-span-2"
				textClass={`text-white ${
					$isMobile
						? 'text-[1.5rem] sm:text-[2rem]'
						: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<div class="flex justify-start col-span-4 gap-2 h-full w-full">
				{#each [[14, 0], [21, 0]] as character}
					<CharacterIcon
						{character}
						imgClass="w-7 sm:8 sm:w-10 lg:w-12"
						divClass="mr-2"
					/>
				{/each}
			</div>
		</div>
	</div>
	<PlayerRank player1Rank="DIAMOND 2" player2Rank="DIAMOND 3" />
</div>
