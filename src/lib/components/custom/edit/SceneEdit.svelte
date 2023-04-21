<script lang="ts">
	import type { Overlay, Scene } from '$lib/types/types';
	import Select from '$lib/components/Select.svelte';
	import { getContext } from 'svelte';
	import { statsScene } from '$lib/utils/store.svelte';
	import { SceneBackground } from '$lib/types/enum';
	import ColorInput from '../input/ColorInput.svelte';

	export let scene: Scene;

	console.log('scene', scene);
	// TODO: Change scene name
	// TODO: Change scene background color/image and opacity
	// TODO: Select default scene, enable/disable different scenes
	// TODO: Font dropdown
	// TODO: Image selector and uploader (base64)
	// TODO: Add transitions
</script>

{#key scene}
	<h1 class="text-gray-500 text-lg font-medium text-shadow">Scene</h1>
	<div class="w-full flex gap-2">
		<div class="w-24">
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Default</h1>
			<Select bind:selected={scene.background}>
				<option value={SceneBackground.None}>None</option>
				<option value={SceneBackground.Image}>Image</option>
				<option value={SceneBackground.Color}>Color</option>
			</Select>
		</div>
		<div class="w-24">
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Background</h1>
			<Select bind:selected={scene.background}>
				<option value={SceneBackground.None}>None</option>
				<option value={SceneBackground.Image}>Image</option>
				<option value={SceneBackground.Color}>Color</option>
			</Select>
		</div>
		{#if scene.background === SceneBackground.Image}
			<div class="w-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Image</h1>
				<Select bind:selected={scene.backgroundImage}>
					<option selected value={SceneBackground.None}>Melee All</option>
					<option value={SceneBackground.Image}>Melee Green</option>
					<option value={SceneBackground.Color}>Melee Red</option>
				</Select>
			</div>
		{/if}
		{#if scene.background === SceneBackground.Color}
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Color</h1>
			<div class="w-24">
				<ColorInput bind:value={scene.backgroundColor} />
			</div>
		{/if}
	</div>
{/key}
