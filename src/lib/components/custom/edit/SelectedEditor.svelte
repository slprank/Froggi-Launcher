<script lang="ts">
	import { page } from '$app/stores';
	import { COL, ROW, MIN } from '$lib/types/const';
	import type { Scene } from '$lib/types/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';

	const sceneId = parseInt($page.params.scene);

	export let selectedId: string | undefined;
	export let selectedLayer: number | undefined;
	let selectedItem: any;
	let selectedItemIndex: number;

	$: curScene = $obs?.scenes?.find((scene) => scene.id === sceneId) ?? undefined;

	function getItemById() {
		if (!curScene || selectedLayer === undefined || selectedId === undefined) return;
		selectedItemIndex = curScene[$statsScene]?.layers[selectedLayer]
			.map((i) => i.id)
			.indexOf(selectedId);
		selectedItem = curScene[$statsScene]?.layers[selectedLayer][selectedItemIndex];
	}
	$: selectedId, getItemById();

	function fixOverflow() {
		if (selectedItem[COL].x < 0) selectedItem[COL].x = 0;
		if (selectedItem[COL].y < 0) selectedItem[COL].y = 0;
		if (selectedItem[COL].x >= COL) selectedItem[COL].x = COL - MIN;
		if (selectedItem[COL].y >= ROW) selectedItem[COL].y = ROW - MIN;
		if (selectedItem[COL].x + selectedItem[COL].w > COL)
			selectedItem[COL].w = COL - selectedItem[COL].x;
		if (selectedItem[COL].y + selectedItem[COL].h > ROW)
			selectedItem[COL].h = ROW - selectedItem[COL].y;
	}

	function updateObs() {
		if (!curScene || selectedLayer === undefined || selectedId === undefined) return;
		fixOverflow();

		curScene[$statsScene].layers[selectedLayer][selectedItemIndex] = selectedItem;

		let scene = $obs.scenes.find((scene) => scene.id === sceneId) ?? ({} as Scene);
		const index = $obs.scenes.indexOf(scene);
		$obs.scenes[index] = curScene;

		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}
	$: selectedItem, updateObs();
</script>

{#if selectedItem !== undefined}
	<div class="w-full flex gap-2">
		<div class="relative w-16 bg-white rounded-md" in:fly={{ duration: 250, y: 50 }}>
			<input
				type="number"
				class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
				id="exampleFormControlInputNumber"
				placeholder="Example label"
				bind:value={selectedItem[COL].x}
			/>
			<label
				for="exampleFormControlInputNumber"
				class="absolute left-3 top-0 mb-0 max-w-[90%] w-8 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white text-shadow transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none"
			>
				X
			</label>
		</div>
		<div class="relative w-16 bg-white rounded-md" in:fly={{ duration: 250, y: 50, delay: 50 }}>
			<input
				type="number"
				class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
				id="exampleFormControlInputNumber"
				placeholder="Example label"
				bind:value={selectedItem[COL].y}
			/>
			<label
				for="exampleFormControlInputNumber"
				class="absolute left-3 top-0 mb-0 max-w-[90%] w-8 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white text-shadow transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none"
			>
				Y
			</label>
		</div>
		<div
			class="relative w-16 bg-white rounded-md"
			in:fly={{ duration: 250, y: 50, delay: 100 }}
		>
			<input
				type="number"
				class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
				id="exampleFormControlInputNumber"
				placeholder="Example label"
				bind:value={selectedItem[COL].h}
			/>
			<label
				for="exampleFormControlInputNumber"
				class="absolute left-3 top-0 mb-0 max-w-[90%] w-8 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white text-shadow transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none"
			>
				H
			</label>
		</div>
		<div
			class="relative w-16 bg-white rounded-md"
			in:fly={{ duration: 250, y: 50, delay: 150 }}
		>
			<input
				type="number"
				class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
				id="exampleFormControlInputNumber"
				placeholder="Example label"
				bind:value={selectedItem[COL].w}
			/>
			<label
				for="exampleFormControlInputNumber"
				class="absolute left-3 top-0 mb-0 max-w-[90%] w-8 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white text-shadow transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none"
			>
				W
			</label>
		</div>
	</div>
{/if}
