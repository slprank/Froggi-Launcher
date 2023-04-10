<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { obs } from '$lib/utils/store.svelte';
	import type { Scene } from '$lib/types/types';
	import { LiveStatsScene } from '$lib/types/enum';
	import BoardEdit from '$lib/components/custom/BoardEdit.svelte';
	import Board from './Board.svelte';

	const sceneId = parseInt($page.params.scene);

	console.log('sceneId', sceneId);

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

	function createNewScene() {
		let scene = $obs.scenes.find((scene) => scene.id === sceneId);
		if (scene) return;
		const newId = Math.max(...$obs.scenes.map((s) => s.id)) ?? 1;
		// TODO: Create default scene items in sperate file
		$obs.scenes.push({
			id: newId,
			title: 'New Title',
			description: 'Scene Description',
			default: LiveStatsScene.PlayerRankStats,
			preGame: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: {},
				layer2: {},
				layer3: {},
			},
			inGame: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: {},
				layer2: {},
				layer3: {},
			},
			postGame: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: {},
				layer2: {},
				layer3: {},
			},
			rankChange: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: {},
				layer2: {},
				layer3: {},
			},
		} as Scene);
		return $obs.scenes.find((scene) => scene.id === newId);
	}

	createNewScene();

	$: calculateBoardHeight(innerWidth);

	// TODO: Create element dropdown list
	// TODO: Create selected element preview and input fields (if customizable)
	// TODO: Create HEX Color editor with transparency
	// TODO: Image selector and uploader (base64)
	// TODO: Add/Remove elements
	// TODO: Resize elements on both corners
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
				<Board bind:height={boardHeight} />
			</div>
		</div>
		<div
			class="w-full h-full col-span-1 grid justify-center content-center border border-red-500"
		>
			<div
				class={`w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] border-4 border-zinc-700 overflow-hidden`}
			>
				<BoardEdit bind:height={boardHeight} />
			</div>
		</div>
	</div>
</main>
