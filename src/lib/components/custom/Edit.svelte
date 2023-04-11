<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { eventEmitter, obs } from '$lib/utils/store.svelte';
	import { LiveStatsScene } from '$lib/types/enum';
	import BoardEdit from '$lib/components/custom/BoardEdit.svelte';
	import Select from '$lib/components/Select.svelte';
	import Board from './Board.svelte';
	import { getNewScene } from './DefaultScene.svelte';
	import Preview from './Preview.svelte';

	const sceneId = parseInt($page.params.scene);

	let selectedLayer = 'layer1';

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
		/*let scene = $obs.scenes.find((scene) => scene.id === sceneId);
		if (scene) return;
		const newId = Math.max(...$obs.scenes.map((s) => s.id)) ?? 1;
		$obs.scenes.push(getNewScene(newId));*/
		$obs.scenes[0] = getNewScene(1);
		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}

	createNewScene();

	$: calculateBoardHeight(innerWidth);

	// TODO: Display size and position of selected element in an editable window
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
		<div class="w-full h-full col-span-1 grid justify-center content-center">
			<Preview bind:boardHeight />
		</div>

		<div class="w-full h-full col-span-1 grid justify-center content-center">
			<div class="w-full h-full grid grid-flow-row grid-rows-8 gap-1">
				<div class="row-span-2">
					<Select bind:selected={selectedLayer}>
						<option selected value="layer1">Layer 1</option>
						<option value="layer2">Layer 2</option>
						<option value="layer3">Layer 3</option>
					</Select>
				</div>
				<div
					class={`row-span-5 w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] border-4 border-zinc-700 overflow-hidden`}
				>
					<BoardEdit bind:height={boardHeight} bind:layer={selectedLayer} />
				</div>
				<div class="row-span-1 flex gap-2">
					<button
						class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded  my-4"
						on:click={() => {
							$eventEmitter.emit(
								'electron',
								'update-live-scene',
								LiveStatsScene.PreGame,
							);
						}}
					>
						Pre Game
					</button>
					<button
						class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded my-4"
						on:click={() => {
							$eventEmitter.emit(
								'electron',
								'update-live-scene',
								LiveStatsScene.InGame,
							);
						}}
					>
						In Game
					</button>
					<button
						class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded my-4"
						on:click={() => {
							$eventEmitter.emit(
								'electron',
								'update-live-scene',
								LiveStatsScene.PostGame,
							);
						}}
					>
						Post Game
					</button>
					<button
						class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded my-4"
						on:click={() => {
							$eventEmitter.emit(
								'electron',
								'update-live-scene',
								LiveStatsScene.RankChange,
							);
						}}
					>
						Rank Change
					</button>
				</div>
			</div>
		</div>
	</div>
</main>
