<script lang="ts">
	import { isMobile } from '$lib/utils/store.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
</script>

<div
	class="h-20 sm:h-24 md:h-26 lg:h-28 w-full grid grid-cols-10 gap-4 lg:gap-1 place-items-center justify-items-stretch z-20"
>
	<TextFitMulti
		text={'FluentCoding'}
		divClass="grid justify-items-end col-span-4"
		textClass={`text-white text-shadow ${
			$isMobile ? 'text-[2rem] sm:text-[2.5rem]' : 'text-4xl md:text-5xl lg:md:text-6xl'
		}`}
	/>
	<TextFitMulti
		text={'1 - 0'}
		divClass="grid justify-items-center col-span-2"
		textClass={`text-white text-shadow ${
			$isMobile ? 'text-[2rem] sm:text-[2.5rem]' : 'text-4xl md:text-5xl lg:md:text-6xl'
		}`}
	/>
	<TextFitMulti
		text={'Ginger'}
		divClass="grid justify-items-start col-span-4"
		textClass={`text-white text-shadow ${
			$isMobile ? 'text-[2rem] sm:text-[2.5rem]' : 'text-4xl md:text-5xl lg:md:text-6xl'
		}`}
	/>
</div>
