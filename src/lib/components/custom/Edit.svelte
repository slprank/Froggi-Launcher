<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Preview from './Preview.svelte';
	import Board from './Board.svelte';

	const sceneId = $page.params.scene;
	// TODO: use sceneId to display given scene

	// TODO: If scene does not exist: create new
	let boardHeight: number;
	let innerWidth: number;
	function calculateBoardHeight(value: number) {
		boardHeight = 225;
		if (value > 1280) boardHeight = 280;
		if (value > 1536) boardHeight = 340;
		if (value > 1800) boardHeight = 390;
		if (value > 2000) boardHeight = 450;
		if (value > 2200) boardHeight = 505;
	}

	$: calculateBoardHeight(innerWidth);
	//$: console.log(boardWidth, boardHeight);
</script>

<svelte:window bind:innerWidth />

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full grid grid-cols-2 px-16">
		<div
			class="w-full h-full col-span-1 grid justify-center content-center border border-red-500"
		>
			<div
				class={`w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] border-4 border-zinc-700 overflow-hidden`}
			>
				<Preview bind:height={boardHeight} />
			</div>
		</div>
		<div
			class="w-full h-full col-span-1 grid justify-center content-center border border-red-500"
		>
			<div
				class={`w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] border-4 border-zinc-700 overflow-hidden`}
			>
				<Board editable={true} bind:height={boardHeight} />
			</div>
		</div>
	</div>
</main>
