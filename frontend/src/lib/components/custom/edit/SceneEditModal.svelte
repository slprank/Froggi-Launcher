<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { LiveStatsScene, SceneBackground } from '$lib/models/enum';
	import type { Overlay } from '$lib/models/types';
	import { statsScene } from '$lib/utils/store.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import SceneSelect from '$lib/components/custom/selector/SceneSelect.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { updateOverlay } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import FileToBase64Input from '$lib/components/input/FileToBase64Input.svelte';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import FontSelectorLayer from '../selector/FontSelectLayer.svelte';
	import AnimationInput from '$lib/components/input/AnimationInput.svelte';

	export let open: boolean;
	export let overlay: Overlay;

	$: curScene = overlay[$statsScene];
	$: previewBackgroundType = curScene.background.type;
	let tempActiveScenes = overlay?.activeScenes;

	let imageOptions: string[] = [];

	function getImageOptions() {
		const modules = import.meta.glob('../../../../../static/image/backgrounds/**/**.png');
		for (let image in modules) {
			imageOptions.push(image);
		}

		imageOptions = imageOptions
			.filter((i) => i !== undefined)
			.map((imageString: string) => `${imageString.split('/').slice(-1).pop()}`)
			.filter((image) => image !== undefined);
	}
	getImageOptions();

	function clear() {
		open = false;
	}

	async function handleUpdate() {
		notifications.success('Overlay updated!', 3000);
		open = false;
		overlay.activeScenes = tempActiveScenes;
		await updateOverlay(overlay);
	}

	function enableDefault() {
		if (tempActiveScenes[overlay.defaultScene]) return;
		tempActiveScenes[overlay.defaultScene] = true;
	}
	$: overlay.defaultScene, enableDefault();

	let autofocus: number = 0;
</script>

<Modal bind:open class="w-[80vw] h-[80vh] min-w-72 rounded-lg" on:close={clear}>
	<div
		class=" w-full h-full min-w-lg place-items-center bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		{#key $statsScene}
			<div class="w-full h-full grid grid-cols-2">
				<div class="w-ful p-4 px-8 col-span-1 overflow-scroll enable-scrollbar">
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

						<FontSelectorLayer bind:font={curScene.font} fontId={'custom'} />
						<h1 class="text-gray-500 text-2xl font-medium text-shadow">Scene:</h1>
						<div
							class="w-28"
							data-tooltip={`Selected scene will be displayed instead of disabled scenes`}
						>
							<Select bind:selected={overlay.defaultScene} label="Default scene">
								<option value={LiveStatsScene.WaitingForDolphin}>Waiting</option>
								<option selected value={LiveStatsScene.Menu}>Menu</option>
								<option value={LiveStatsScene.InGame}>In Game</option>
								<option value={LiveStatsScene.PostGame}>Post Game</option>
								<option value={LiveStatsScene.RankChange}>Rank Change</option>
							</Select>
						</div>
						<h1 class="text-gray-500 text-lg font-medium text-shadow">Active scenes</h1>
						<SceneSelect
							bind:selected={tempActiveScenes}
							bind:defaultValue={overlay.defaultScene}
						/>
						<h1 class="text-gray-500 text-lg font-medium text-shadow">Background</h1>
						<div class="w-full flex gap-2">
							<div class="w-48">
								<Select bind:selected={curScene.background.type} label="Type">
									<option value={SceneBackground.None}>None</option>
									<option value={SceneBackground.Color}>Color</option>
									<option value={SceneBackground.Image}>Image</option>
									<option value={SceneBackground.ImageCustom}>
										Custom Image
									</option>
									{#if $statsScene === LiveStatsScene.InGame}
										<option value={SceneBackground.InGameImageStage}>
											Stage
										</option>
									{/if}
									{#if [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene)}
										<option value={SceneBackground.PostGameImageStage}>
											Stage
										</option>
									{/if}
								</Select>
							</div>
							{#if curScene.background.type === SceneBackground.Image}
								<div class="w-24">
									<Select
										bind:selected={curScene.background.image.src}
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
							{#if curScene.background.type === SceneBackground.ImageCustom}
								<div class="w-24">
									<FileToBase64Input
										bind:base64={curScene.background.customImage.src}
										label="Upload"
										acceptedExtensions={'.jpg, .jpeg, .png, .gif, .svg'}
									/>
								</div>
								<div class="w-24">
									<Select
										bind:selected={curScene.background.customImage.objectFit}
										label="Object fit"
									>
										<option selected value="cover">Cover</option>
										<option value="contain">Contain</option>
									</Select>
								</div>
							{/if}
							{#if curScene.background.type === SceneBackground.Color}
								<div class="w-24">
									<ColorInput
										bind:value={curScene.background.color}
										label="Color"
									/>
								</div>
							{/if}
							{#if curScene.background.type !== SceneBackground.None}
								<div class="w-24">
									<NumberInput
										bind:value={curScene.background.opacity}
										label="Opacity"
										max={100}
										bind:autofocus
										autoFocusValue={2}
									/>
								</div>
							{/if}
						</div>

						{#if curScene.background.type !== SceneBackground.None}
							<div class="flex">
								<div class="w-full">
									<h1 class="text-gray-500 text-lg font-medium text-shadow">
										Background Transition - In
									</h1>
									<div class="w-48">
										<AnimationInput
											bind:animation={curScene.background.animation.in}
										/>
									</div>
								</div>
								<div class="w-full">
									<h1 class="text-gray-500 text-lg font-medium text-shadow">
										Background Transition - Out
									</h1>
									<div class="w-48">
										<AnimationInput
											bind:animation={curScene.background.animation.out}
										/>
									</div>
								</div>
							</div>
						{/if}

						<h1
							class="text-gray-500 text-lg font-medium text-shadow"
							data-tooltip={`Delay between each layer to render when displayed`}
						>
							Layers Rendering Delay
						</h1>
						<div class="w-full flex gap-2">
							<div class="w-48">
								<NumberInput
									bind:value={curScene.animation.layerRenderDelay}
									max={SCENE_TRANSITION_DELAY}
									label="Delay"
								/>
							</div>
						</div>
						<div class="flex">
							<div class="w-full">
								<h1 class="text-gray-500 text-lg font-medium text-shadow">
									Element Transition - In
								</h1>
								<div class="w-48">
									<AnimationInput
										bind:animation={curScene.animation.in}
										isSceneElementAnimation={true}
									/>
								</div>
							</div>
							<div class="w-full">
								<h1 class="text-gray-500 text-lg font-medium text-shadow">
									Element Transition - Out
								</h1>
								<div class="w-48">
									<AnimationInput
										bind:animation={curScene.animation.out}
										isSceneElementAnimation={true}
									/>
								</div>
							</div>
						</div>

						<div class="w-48 flex items-end">
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
						class="bg-center aspect-video w-[35vw] max-w-[500px] border"
						style={`
						${
							previewBackgroundType === SceneBackground.Color
								? `background: ${curScene.background.color};`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.Image
								? `background-image: url('/image/backgrounds/${
										curScene.background.image.src
								  }');
									background-size: ${curScene.background.image.objectFit ?? 'cover'};`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.ImageCustom
								? `background-image: url('${curScene.background.customImage.src}');
									background-size: ${curScene.background.customImage.objectFit};`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.InGameImageStage
								? `background-image: url('/image/stages/8.png');`
								: ''
						}
						${
							previewBackgroundType === SceneBackground.PostGameImageStage
								? `background-image: url('/image/stages/8.png');`
								: ''
						}
						${curScene.background.opacity !== undefined ? `opacity: ${curScene.background.opacity / 100};` : ''}
						background-repeat: no-repeat;`}
					/>
				</div>
			</div>
		{/key}
	</div>
</Modal>
