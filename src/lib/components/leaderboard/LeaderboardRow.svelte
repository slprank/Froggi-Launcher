<script>
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	// TODO: Implement player type
	export let player;
</script>

<div class="w-full h-12 grid grid-cols-12 col-span-12 border-b-1 border-gray-500">
	<div class="w-full h-12 col-span-2 grid content-center justify-center">
		<TextFitMulti textClass="text-white text-xl">{player.rank}</TextFitMulti>
	</div>
	<div class="w-full h-12 col-span-3 grid grid-rows-5 content-center">
		<TextFitMulti divClass="w-full max-w-full row-span-3 text-white text-[36px]">
			{player.nickname}
		</TextFitMulti>
		<TextFitMulti divClass="w-full max-w-full row-span-2 text-gray-500 text-[12px]">
			{player.connectCode}
		</TextFitMulti>
	</div>
	<div class="w-full h-12 col-span-3 grid content-center justify-start">
		<TextFitMulti textClass="text-white text-xl">ICO</TextFitMulti>
	</div>
	<div class="w-full h-12 col-span-2 grid content-center justify-center">
		<TextFitMulti textClass="text-white text-xl">{player.rating}</TextFitMulti>
	</div>
	<div class="w-full h-12 col-span-2 grid content-center justify-center">
		<TextFitMulti textClass="text-white text-xl">{player.winLoss}</TextFitMulti>
	</div>
</div>
