<script lang="ts">
	import CharacterIcon from '$lib/components/live/OngoingGame/CharacterIcon.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { isMobile } from '$lib/utils/store.svelte';

	// TODO: use character typing and figure out if using Id or object
	export let charactersLeft: any[];
	export let textCenter: string = '';
	export let charactersRight: any[];
</script>

<div
	class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-10 gap-2 lg:gap-1 place-items-center justify-items-stretch"
>
	<div class="flex justify-end col-span-4 gap-2 h-full w-full">
		{#each charactersLeft as character}
			<CharacterIcon {character} imgClass="w-7 sm:w-9 lg:w-10 xl:w-12" divClass="ml-2" />
		{/each}
	</div>
	<TextFitMulti
		class={`grid justify-items-center col-span-2 text-white ${
			$isMobile
				? 'text-[1.5rem] sm:text-[2rem]'
				: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
		} text-shadow`}
	>
		{textCenter}
	</TextFitMulti>
	<div class="flex justify-start col-span-4 gap-2 h-full w-full">
		{#each charactersRight as character}
			<CharacterIcon {character} imgClass="w-7 sm:w-9 lg:w-10 xl:w-12" divClass="mr-2" />
		{/each}
	</div>
</div>
