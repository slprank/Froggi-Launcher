<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { LiveStatsScene, SceneBackground, Transition } from '$lib/types/enum';
	import type { Overlay } from '$lib/types/types';
	import { statsScene } from '$lib/utils/store.svelte';
	import { getContext } from 'svelte';
	import Select from '$lib/components/Select.svelte';
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import { fly } from 'svelte/transition';
	import ImageInput from '$lib/components/input/ImageInput.svelte';

	const { updateObs, refreshOverlay } = getContext('custom-obs');

	export let open: boolean;
	export let overlay: Overlay;

	$: previewBackgroundType = overlay[$statsScene].background;

	let imageOptions: string[] = [];

	function getImageOptions() {
		const modules = import.meta.glob('../../../../../static/image/backgrounds/**/**.png');
		for (let image in modules) {
			imageOptions.push(image);
		}

		imageOptions = imageOptions
			.map((imageString) => imageString.split('/').slice(-1).pop())
			.filter((image) => image !== undefined);
		console.log(imageOptions);
	}

	getImageOptions();

	// TODO: Update scene name
	// TODO: Update scene background
	// TODO: Update scene background opacity

	// TODO: Update

	let autofocus: number = 0;

	function clear() {
		refreshOverlay();
		open = false;
	}

	function handleUpdate() {
		updateObs();
		open = false;
	}

	// TODO: Add image upload
	// TODO: Add preview
</script>

<Modal bind:open class="w-[80%] h-[80%] min-w-72 rounded-lg" on:close={clear}>
	<div
		class=" w-full h-full min-w-lg place-items-center bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		{#key overlay[$statsScene]}
			<div class="w-full h-full grid grid-cols-2">
				<div class="w-ful p-4 px-8 col-span-1 overflow-scroll">
					<div class="w-full grid gap-4">
						<h1 class="text-gray-500 text-2xl font-medium text-shadow">Overlay:</h1>
						<div class="w-full flex gap-2">
							<div class="w-24">
								<TextInput
									bind:value={overlay.title}
									label="Title"
									bind:autofocus
									autoFocusValue={1}
								/>
							</div>
						</div>
						<h1 class="text-gray-500 text-2xl font-medium text-shadow">Scene:</h1>
						<h1 class="text-gray-500 text-lg font-medium text-shadow">Change scene</h1>
						<SceneSelect />
						<h1 class="text-gray-500 text-lg font-medium text-shadow">Background</h1>
						<div class="w-full flex gap-2">
							<div class="w-24">
								<Select
									bind:selected={overlay[$statsScene].background}
									label="Type"
								>
									<option value={SceneBackground.None}>None</option>
									<option value={SceneBackground.Color}>Color</option>
									<option value={SceneBackground.Image}>Image</option>
									<option value={SceneBackground.ImageCustom}>
										Custom Image
									</option>
									{#if $statsScene === LiveStatsScene.InGame || $statsScene === LiveStatsScene.PostGame}
										<option value={SceneBackground.ImageStage}>Stage</option>
									{/if}
								</Select>
							</div>
							{#if overlay[$statsScene].background === SceneBackground.Image}
								<div class="w-24">
									<Select
										bind:selected={overlay[$statsScene].backgroundImage}
										label="Image"
									>
										{#each imageOptions as image, i}
											<option selected={i === 0} value={image}>
												{image.split('.')[0]}
											</option>
										{/each}
									</Select>
								</div>
							{/if}
							{#if overlay[$statsScene].background === SceneBackground.ImageCustom}
								<div class="w-24">
									<ImageInput
										bind:image={overlay[$statsScene].backgroundCustomImage}
									/>
								</div>
							{/if}
							{#if overlay[$statsScene].background === SceneBackground.Color}
								<div class="w-24">
									<ColorInput
										bind:value={overlay[$statsScene].backgroundColor}
										label="Color"
									/>
								</div>
							{/if}
							{#if overlay[$statsScene].background !== SceneBackground.None}
								<div class="w-24">
									<NumberInput
										bind:value={overlay[$statsScene].opacity}
										label="Opacity"
										max={1}
										bind:autofocus
										autoFocusValue={2}
									/>
								</div>
							{/if}
						</div>
						<h1 class="text-gray-500 text-lg font-medium text-shadow">
							Transition elements
						</h1>
						<div class="w-full flex gap-2">
							<div class="w-24">
								<Select
									bind:selected={overlay[$statsScene].transition}
									label="Type"
								>
									<option value={Transition.None}>None</option>
									<option value={Transition.Blur}>Blur</option>
									<option value={Transition.Fade}>Fade</option>
									<option value={Transition.Fly}>Fly</option>
									<option value={Transition.Scale}>Scale</option>
									<option value={Transition.Slide}>Slide</option>
								</Select>
							</div>
							{#if overlay[$statsScene].transition !== Transition.None}
								<div class="w-24">
									<NumberInput
										bind:value={overlay[$statsScene].duration}
										label="Duration - ms"
										max={1500}
										min={0}
										bind:autofocus
										autoFocusValue={3}
									/>
								</div>
							{/if}
						</div>
						<h1 class="text-gray-500 text-lg font-medium text-shadow">
							Transition Background
						</h1>
						<div class="w-full flex gap-2">
							<div class="w-24">
								<Select
									bind:selected={overlay[$statsScene].transitionBackground}
									label="Type"
								>
									<option value={Transition.None}>None</option>
									<option value={Transition.Blur}>Blur</option>
									<option value={Transition.Fade}>Fade</option>
									<option value={Transition.Fly}>Fly</option>
									<option value={Transition.Scale}>Scale</option>
									<option value={Transition.Slide}>Slide</option>
								</Select>
							</div>
							{#if overlay[$statsScene].transition !== Transition.None}
								<div class="w-24">
									<NumberInput
										bind:value={overlay[$statsScene].durationBackground}
										label="Duration - ms"
										max={1500}
										min={0}
										bind:autofocus
										autoFocusValue={4}
									/>
								</div>
							{/if}
						</div>

						<div class="w-24 flex items-end">
							<button
								class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border border-white rounded"
								on:click={handleUpdate}
							>
								Update
							</button>
						</div>
					</div>
				</div>
				<div class="w-full h-full col-span-1 flex justify-center items-center">
					<div
						class="bg-cover bg-center aspect-video w-[80%] border"
						style={`
						${
							previewBackgroundType === SceneBackground.Color
								? `background: ${overlay[$statsScene].backgroundColor};`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.Image
								? `background-image: url('/image/backgrounds/${overlay[$statsScene].backgroundImage}');`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.ImageCustom
								? `background-image: url('${overlay[$statsScene].backgroundCustomImage}');`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.ImageStage
								? `background-image: url('/image/stages/8.png');`
								: ''
						}
						${overlay[$statsScene].opacity !== undefined ? `opacity: ${overlay[$statsScene].opacity};` : ''}`}
					/>
				</div>
			</div>
		{/key}
	</div>
</Modal>
