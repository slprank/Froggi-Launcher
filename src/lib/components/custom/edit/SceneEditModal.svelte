<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { LiveStatsScene, SceneBackground, Transition } from '$lib/types/enum';
	import type { Overlay } from '$lib/types/types';
	import { statsScene } from '$lib/utils/store.svelte';
	import { getContext } from 'svelte';
	import Select from '$lib/components/input/Select.svelte';
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import ImageInput from '$lib/components/input/ImageInput.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';

	const { updateOverlay, refreshOverlay } = getContext('custom-obs');

	export let open: boolean;
	export let overlay: Overlay;

	$: previewBackgroundType = overlay[$statsScene].backgroundType;
	let tempActiveScenes = overlay.activeScenes;

	let imageOptions: string[] = [];
	function getImageOptions() {
		const modules = import.meta.glob('../../../../../static/image/backgrounds/**/**.png');
		for (let image in modules) {
			imageOptions.push(image);
		}

		imageOptions = imageOptions
			.filter((i) => i !== undefined)
			.map((imageString: string) => imageString.split('/').slice(-1).pop())
			.filter((image) => image !== undefined);
		console.log(imageOptions);
	}
	getImageOptions();

	function clear() {
		refreshOverlay();
		open = false;
	}

	function handleUpdate() {
		updateActiveScenes();
		updateOverlay();
		notifications.success('Overlay updated!', 3000);
		open = false;
	}

	function updateActiveScenes() {
		overlay.activeScenes = tempActiveScenes;
	}

	function enableDefault() {
		if (overlay.activeScenes?.includes(overlay.default)) return;
		overlay.activeScenes?.push(overlay.default);
	}
	$: overlay.default, enableDefault();

	let autofocus: number = 0;
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
						<label class="text-gray-500 text-2xl font-medium text-shadow">Scene:</label>
						<div
							class="w-28"
							data-tooltip={`Selected scene will be displayed instead of disabled scenes`}
						>
							<Select bind:selected={overlay.default} label="Default scene">
								<option value={LiveStatsScene.WaitingForDolphin}>Waiting</option>
								<option selected value={LiveStatsScene.PreGame}>Pre Game</option>
								<option value={LiveStatsScene.InGame}>In Game</option>
								<option value={LiveStatsScene.PostGame}>Post Game</option>
								<option value={LiveStatsScene.RankChange}>Rank Change</option>
							</Select>
						</div>
						<h1 class="text-gray-500 text-lg font-medium text-shadow">Active scenes</h1>
						<SceneSelect
							bind:selected={tempActiveScenes}
							bind:defaultValue={overlay.default}
						/>
						<h1 class="text-gray-500 text-lg font-medium text-shadow">Background</h1>
						<div class="w-full flex gap-2">
							<div class="w-24">
								<Select
									bind:selected={overlay[$statsScene].backgroundType}
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
							{#if overlay[$statsScene].backgroundType === SceneBackground.Image}
								<div class="w-24">
									<Select
										bind:selected={overlay[$statsScene].backgroundImage.src}
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
							{#if overlay[$statsScene].backgroundType === SceneBackground.ImageCustom}
								<div class="w-24">
									<ImageInput
										bind:image={overlay[$statsScene].backgroundCustomImage.src}
										label="Upload"
									/>
								</div>
								<div class="w-24">
									<Select
										bind:selected={overlay[$statsScene].backgroundCustomImage
											.objectFit}
										label={'Object fit'}
									>
										<option selected value="cover">Cover</option>
										<option value="contain">Contain</option>
									</Select>
								</div>
							{/if}
							{#if overlay[$statsScene].backgroundType === SceneBackground.Color}
								<div class="w-24">
									<ColorInput
										bind:value={overlay[$statsScene].backgroundColor}
										label="Color"
									/>
								</div>
							{/if}
							{#if overlay[$statsScene].backgroundType !== SceneBackground.None}
								<div class="w-24">
									<NumberInput
										bind:value={overlay[$statsScene].backgroundOpacity}
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
									bind:selected={overlay[$statsScene].elementTransition}
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
							{#if overlay[$statsScene].elementTransition !== Transition.None}
								<div class="w-24">
									<NumberInput
										bind:value={overlay[$statsScene].elementDuration}
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
									bind:selected={overlay[$statsScene].backgroundTransition}
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
							{#if overlay[$statsScene].backgroundTransition !== Transition.None}
								<div class="w-24">
									<NumberInput
										bind:value={overlay[$statsScene].backgroundDuration}
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
						class="bg-center aspect-video w-[80%] border"
						style={`
						${
							previewBackgroundType === SceneBackground.Color
								? `background: ${overlay[$statsScene].backgroundColor};`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.Image
								? `background-image: url('/image/backgrounds/${
										overlay[$statsScene].backgroundImage.src
								  }');
									background-size: ${overlay[$statsScene].backgroundImage.objectFit ?? 'cover'};`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.ImageCustom
								? `background-image: url('${overlay[$statsScene].backgroundCustomImage.src}');
									background-size: ${overlay[$statsScene].backgroundCustomImage.objectFit};`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.ImageStage
								? `background-image: url('/image/stages/8.png');`
								: ''
						}
						${
							overlay[$statsScene].backgroundOpacity !== undefined
								? `opacity: ${overlay[$statsScene].backgroundOpacity};`
								: ''
						}
						background-repeat: no-repeat;`}
					/>
				</div>
			</div>
		{/key}
	</div>
</Modal>
