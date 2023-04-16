<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { eventEmitter, obs } from '$lib/utils/store.svelte';
	import { LiveStatsScene } from '$lib/types/enum';
	import BoardEdit from '$lib/components/custom/edit/BoardEdit.svelte';
	import Select from '$lib/components/Select.svelte';
	import { getNewScene } from './CreateScene.svelte';
	import Preview from './Preview.svelte';
	import NewElementModal from '$lib/components/custom/edit/NewElementModal.svelte';

	const sceneId = parseInt($page.params.scene);

	let selectedLayer = 0;
	let isElementModalOpen = false;

	let boardHeight: number;
	let innerWidth: number;

	function createNewScene() {
		/*
		let scene = $obs.scenes.find((scene) => scene.id === sceneId);
		if (scene) return;
		const newId = Math.max(...$obs.scenes.map((s) => s.id)) ?? 1;
		$obs.scenes.push(getNewScene(newId));
		*/
		$obs.scenes[0] = getNewScene(1); // Remove this
		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}

	createNewScene();

	$: calculateBoardHeight(innerWidth);

	function updateLiveScene(scene: LiveStatsScene) {
		$eventEmitter.emit('electron', 'update-live-scene', scene);
	}

	function calculateBoardHeight(value: number) {
		boardHeight = 225;
		if (value > 1280) boardHeight = 280;
		if (value > 1536) boardHeight = 340;
		if (value > 1800) boardHeight = 390;
		if (value > 2000) boardHeight = 450;
		if (value > 2200) boardHeight = 505;
	}
	// TODO: Change scene name
	// TODO: Change scene background color/image and opacity
	// TODO: Select default scene, enable/disable different scenes
	// TODO: Font dropdown
	// TODO: Display size and position of selected element in an editable window
	// TODO: Selected element delete button
	// TODO: Image selector and uploader (base64)
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

		<div class="w-[400px] xl:w-full h-full grid justify-center content-center">
			<div class="flex gap-2 mb-4">
				<div>
					<Select bind:selected={selectedLayer}>
						<option selected value={0}>Layer 1</option>
						<option value={1}>Layer 2</option>
						<option value={2}>Layer 3</option>
					</Select>
				</div>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						isElementModalOpen = true;
					}}
				>
					Add New
				</button>
			</div>
			<div
				class={`w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] border-4 border-zinc-700 overflow-hidden`}
			>
				<BoardEdit bind:height={boardHeight} bind:layer={selectedLayer} />
			</div>
			<div class="w-lg 3xl:w-full flex flex-wrap gap-2">
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded  mt-4"
					on:click={() => {
						updateLiveScene(LiveStatsScene.WaitingForDolphin);
					}}
				>
					Waiting
				</button>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded  mt-4"
					on:click={() => {
						updateLiveScene(LiveStatsScene.PreGame);
					}}
				>
					Pre Game
				</button>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded mt-4"
					on:click={() => {
						updateLiveScene(LiveStatsScene.InGame);
					}}
				>
					In Game
				</button>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded mt-4"
					on:click={() => {
						updateLiveScene(LiveStatsScene.PostGame);
					}}
				>
					Post Game
				</button>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded mt-4"
					on:click={() => {
						updateLiveScene(LiveStatsScene.RankChange);
					}}
				>
					Rank Change
				</button>
			</div>
		</div>
	</div>
	<NewElementModal bind:open={isElementModalOpen} bind:layer={selectedLayer} />
</main>
