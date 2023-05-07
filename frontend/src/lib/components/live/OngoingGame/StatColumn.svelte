<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { isMobile } from '$lib/utils/store.svelte';

	export let textLeft: string;
	export let textCenter: string;
	export let textRight: string;
</script>

<div
	class="h-12 md:h-16 lg:h-20 w-full grid grid-cols-10 gap-4 lg:gap-1 place-items-center justify-items-stretch"
>
	<TextFitMulti
		class={`grid justify-items-end col-span-4 text-white ${
			$isMobile
				? 'text-[1.5rem] sm:text-[2rem]'
				: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
		} text-shadow`}
	>
		{textLeft}
	</TextFitMulti>
	<TextFitMulti
		class={`grid justify-items-center col-span-2 text-white ${
			$isMobile
				? 'text-[1.5rem] sm:text-[2rem]'
				: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
		} text-shadow`}
	>
		{textCenter}
	</TextFitMulti>
	<TextFitMulti
		class={`grid justify-items-start col-span-4 text-white ${
			$isMobile
				? 'text-[1.5rem] sm:text-[2rem]'
				: 'text-2xl sm:text-3xl md:text-4xl lg:md:text-5xl'
		} text-shadow`}
	>
		{textRight}
	</TextFitMulti>
</div>
