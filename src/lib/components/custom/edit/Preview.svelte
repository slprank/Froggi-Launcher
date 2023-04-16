<script lang="ts">
	import Board from '$lib/components/custom/Board.svelte';

	export let boardHeight: number;
</script>

<div class="w-full h-full grid grid-flow-row grid-rows-8">
	<div class="row-span-2" />
	<div
		class={`row-span-5 w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] border-4 border-zinc-700 overflow-hidden`}
	>
		<Board bind:height={boardHeight} />
	</div>
	<div class="row-span-1">
		<h1 class="text-white">OBS url</h1>
	</div>
</div>
