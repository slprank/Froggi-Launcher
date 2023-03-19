<script lang="ts">
	import { fly } from 'svelte/transition';

	// TODO: Use actual player rank data
	let rank = {
		prev: { rating: 1650.2, rank: 'GOLD 2' },
		cur: { rating: 1670.2, rank: 'DIAMOND 3' },
	};

	let rankDisplay = rank.prev;
	let rankDifference = 0;

	async function RunSequence() {
		await new Promise((resolve) => {
			setTimeout(resolve, 2500);
		});
		rankDifference = rank.cur.rating - rank.prev.rating;
		await new Promise((resolve) => {
			setTimeout(resolve, 1500);
		});
		rankDisplay = rank.cur;
	}

	RunSequence();
</script>

<div class="fixed place-items-center justify-center h-screen w-screen grid z-2">
	<div
		class="flex flex-col w-80 h-80 place-items-center justify-center space-y-0 rounded-lg bg-zinc-900 bg-opacity-60 border border-zinc-800"
	>
		<div class="flex flex-col space-y-2">
			{#key rankDisplay.rank}
				<div
					class="w-full h-44 place-items-center justify-center max-h-full max-w-md grid px-16 opacity-100"
					in:fly={{ y: -25, duration: 350 }}
				>
					<img src={`./rank-icons/${rankDisplay.rank}.svg`} alt="rank icon" />
				</div>
			{/key}
			<div class="grid grid-cols-12 w-full h-16 max-h-full max-w-md">
				<div class="grid col-span-4 place-items-center justify-center" />
				<div class="grid col-span-4 place-items-center justify-center">
					{#key rankDisplay}
						<h1
							class="text-white text-4xl font-medium whitespace-nowrap"
							in:fly={{ y: -25, duration: 350 }}
						>
							{rankDisplay.rating}
						</h1>
					{/key}
				</div>
				<div class="grid col-span-4 place-items-center justify-center">
					{#key rankDifference}
						{#if rankDifference}
							<h1
								class="text-white text-3xl font-medium whitespace-nowrap"
								in:fly={{ x: 25, duration: 350 }}
							>
								{rankDifference >= 0 ? '+' : '-'}{rankDifference}
							</h1>
						{/if}
					{/key}
				</div>
			</div>
		</div>
	</div>
</div>
