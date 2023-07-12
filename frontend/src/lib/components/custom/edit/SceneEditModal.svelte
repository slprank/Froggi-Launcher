<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { LiveStatsScene, SceneBackground, Transition } from '$lib/models/enum';
	import type { Overlay } from '$lib/models/types';
	import { statsScene } from '$lib/utils/store.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import SceneSelect from '$lib/components/custom/selector/SceneSelect.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { updateOverlay } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import FileToBase64Input from '$lib/components/input/FileToBase64Input.svelte';
	import CustomFontHandler from '$lib/components/custom/CustomFontHandler.svelte';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';

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
		if (overlay.activeScenes?.includes(overlay.default)) return;
		overlay.activeScenes?.push(overlay.default);
	}
	$: overlay.default, enableDefault();

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
						<div class="w-full flex gap-2">
							<div class="w-36 h-full">
								<h1 class="text-gray-500 text-sm font-medium text-shadow">Font</h1>
								<Select bind:selected={curScene.font.family}>
									<option value={undefined} selected>Default</option>
									<option value={'Melee'}>Melee</option>
									<option value={'Ultimate'}>Ultimate</option>
									<option value={'A-OTF Folk Pro M'}>A-OTF Folk Pro M</option>
									<option value={'Roboto'}>Roboto</option>
									<option value={'Roboto Bold Italic'}>Roboto</option>
									<option value={'Wix'}>Wix</option>
									<option value={'Custom'}>Custom</option>
								</Select>
							</div>
							<FileToBase64Input
								label="Custom"
								acceptedExtensions=".woff2, .woff, .otf, .ttf"
								bind:base64={curScene.font.base64}
							/>
							<TextFitMulti
								class="w-36 h-full pt-[1.25em] grid justify-center items-center text-gray-500 text-shadow"
								style={`font-family: ${curScene.font.family}`}
							>
								Super Smash Bros
							</TextFitMulti>
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
								<Select bind:selected={curScene.background.type} label="Type">
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
							<h1 class="text-gray-500 text-lg font-medium text-shadow">
								Transition Background
							</h1>
							<div class="w-full flex gap-2">
								<div class="w-24">
									<Select
										bind:selected={curScene.background.transition}
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
								{#if curScene.background.transition !== Transition.None}
									<div class="w-24">
										<NumberInput
											bind:value={curScene.background.duration}
											label="Duration - ms"
											max={1000}
											bind:autofocus
											autoFocusValue={4}
										/>
									</div>
								{/if}
							</div>
						{/if}

						<h1
							class="text-gray-500 text-lg font-medium text-shadow"
							data-tooltip={`Delay between each layer to render when displayed`}
						>
							Layers Rendering Delay
						</h1>
						<div class="w-full flex gap-2">
							<div class="w-24">
								<NumberInput
									bind:value={curScene.layerRenderDelay}
									max={1000}
									label="Delay"
								/>
							</div>
						</div>

						<h1 class="text-gray-500 text-lg font-medium text-shadow">
							Transition Elements
						</h1>
						<div class="w-full flex gap-2">
							<div class="w-24">
								<Select bind:selected={curScene.element.transition} label="Type">
									<option value={Transition.None}>None</option>
									<option value={Transition.Blur}>Blur</option>
									<option value={Transition.Fade}>Fade</option>
									<option value={Transition.Fly}>Fly</option>
									<option value={Transition.Scale}>Scale</option>
									<option value={Transition.Slide}>Slide</option>
								</Select>
							</div>
							{#if curScene.element.transition !== Transition.None}
								<div class="w-24">
									<NumberInput
										bind:value={curScene.element.duration}
										label="Duration - ms"
										max={SCENE_TRANSITION_DELAY}
										bind:autofocus
										autoFocusValue={3}
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
							previewBackgroundType === SceneBackground.ImageStage
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
	{#key curScene.font.base64}
		<CustomFontHandler bind:base64={curScene.font.base64} />
	{/key}
</Modal>
