<script lang="ts">
	export let player1Rank: string;
	export let player2Rank: string;
</script>

<div class="absolute w-full mt-2 z-10">
	<div
		class="w-full h-28 grid grid-cols-2 gap-2 place-items-center justify-items-stretch opacity-80"
	>
		<div class="grid justify-start col-span-1 w-full h-28">
			<img
				src={`./rank-icons/${player1Rank}.svg`}
				alt="rank"
				class="aspect-square w-20 sm:w-24 md:w-26 lg:w-28 ml-2 md:ml-8 lg:ml-6"
			/>
		</div>
		<div class="grid justify-end col-span-1 w-full h-28">
			<img
				src={`./rank-icons/${player2Rank}.svg`}
				alt="rank"
				class="aspect-square w-20 sm:w-24 md:w-26 lg:w-28 mr-2 md:mr-8 lg:mr-6"
			/>
		</div>
	</div>
</div>
