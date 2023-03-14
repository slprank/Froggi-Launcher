<script lang="ts">
	import { isMobile } from '$lib/utils/store.svelte';
	import TextFitMulti from '../TextFitMulti.svelte';
</script>

<div class="fixed place-items-start h-screen w-screen grid gap-y-0 z-3">
	<div class="w-full mt-5 z-20 px-2 md:px-16">
		<div class="h-32 w-full grid grid-cols-12 gap-2 place-items-center justify-items-stretch">
			<TextFitMulti
				text={'FluentCoding'}
				divClass="grid justify-items-end col-span-5"
				textClass="text-white font-black text-3xl sm:text-4xl md:text-5xl lg:md:text-6xl text-shadow"
			/>
			<TextFitMulti
				text={'1 - 0'}
				divClass="grid justify-items-center col-span-2"
				textClass="text-white font-black text-3xl sm:text-4xl md:text-5xl lg:md:text-6xl text-shadow"
			/>
			<TextFitMulti
				text={'Ginger'}
				divClass="grid justify-items-start col-span-5"
				textClass="text-white font-black text-3xl sm:text-4xl md:text-5xl lg:md:text-6xl text-shadow"
			/>
		</div>
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-3 gap-2 place-items-center justify-items-stretch"
		>
			<TextFitMulti
				text={'2464.3'}
				divClass="grid justify-items-end col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'RATING'}
				divClass="grid justify-items-center col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'2932.1'}
				divClass="grid justify-items-start col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
		</div>
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-3 gap-2 place-items-center justify-items-stretch"
		>
			<TextFitMulti
				text={'#17 [EU]'}
				divClass="grid justify-items-end col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'RANK'}
				divClass="grid justify-items-center col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'#3 [NA]'}
				divClass="grid justify-items-start col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
		</div>
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-3 gap-2 place-items-center justify-items-stretch"
		>
			<TextFitMulti
				text={'1024/42'}
				divClass="grid justify-items-end col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'W/L'}
				divClass="grid justify-items-center col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'69/4'}
				divClass="grid justify-items-start col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
		</div>
		<div
			class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-3 gap-2 place-items-center justify-items-stretch"
		>
			<TextFitMulti
				text={'IMG FIT'}
				divClass="grid justify-items-end col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'CHARACTERS'}
				divClass="grid justify-items-center col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
			<TextFitMulti
				text={'IMG FIT'}
				divClass="grid justify-items-start col-span-1"
				textClass={`text-white font-black ${
					$isMobile ? 'text-[1.5rem]' : 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
				} text-shadow`}
			/>
		</div>
	</div>
	<div class="fixed w-full mt-7 z-10">
		<div
			class="w-full grid grid-cols-2 gap-2 place-items-center justify-items-stretch opacity-80"
		>
			<div class="grid justify-items-start col-span-1">
				<img
					src="./rank-icons/DIAMOND 2.svg"
					alt="rank"
					class="aspect-square w-28 h-28 ml-2"
				/>
			</div>
			<div class="grid justify-items-end col-span-1">
				<img
					src="./rank-icons/DIAMOND 2.svg"
					alt="rank"
					class="aspect-square w-28 h-28 mr-2"
				/>
			</div>
		</div>
	</div>
</div>
