<script>
	// TODO: Implement player type
	export let player;
</script>

<div class="w-full h-12 grid grid-cols-12 gap-1 col-span-12 border-b-1 border-gray-500">
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
	<div class="w-full h-12 col-span-3 grid content-center justify-start">
		<h1 class="whitespace-nowrap m-0 font-medium text-white text-xl">ICO</h1>
	</div>
	<div class="w-full h-12 col-span-2 grid content-center justify-center">
		<h1 class="whitespace-nowrap m-0 font-medium text-white text-xl">{player.rating}</h1>
	</div>
	<div class="w-full h-12 col-span-2 grid content-center justify-center">
		<h1 class="whitespace-nowrap m-0 font-medium text-white text-xl">{player.winLoss}</h1>
	</div>
</div>
