<script lang="ts">
	import { page } from '$app/stores';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import ExternalPreviewSettings from '$lib/components/custom/preview/ExternalPreviewSettings.svelte';
	import LayerToggle from '$lib/components/custom/preview/LayerToggle.svelte';
	import NonInteractiveIFrame from '$lib/components/custom/preview/NonInteractiveIFrame.svelte';
	import SceneSelect from '$lib/components/custom/selector/SceneSelect.svelte';
	import type { Overlay } from '$lib/models/types/overlay';
	import { isElectron, isMobile, urls } from '$lib/utils/store.svelte';

	const overlayId: string | undefined = $page.params.overlay;
	let curOverlay: Overlay | undefined = undefined;

	const getOverlay = async () => {
		curOverlay = await getOverlayById(overlayId);
	};
	$: $page.params.overlay, getOverlay();

	let base64: string;
	let imageOpacity: number = 1;

	let innerWidth: number;
	let innerHeight: number;
	$: isVerticalScreen = innerHeight > innerWidth;
	$: isHorizontalScreen = !isVerticalScreen;

	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/overlay/${overlayId}/layers`;
	$: console.log('src', src);

	const reset = () => {
		base64 = '';
		imageOpacity = 1;
	};

	let parentDiv: HTMLElement;

	$: maxHeight = innerHeight - parentDiv?.clientHeight;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if isVerticalScreen}
	<div
		class={`flex flex-col bg-cover bg-center items-start md:px-16 md:pb-${
			$isMobile ? '18' : '16'
		}`}
		style={`height: 100svh; background-image: url('/image/backgrounds/MeleeMenuGreen.png')`}
	>
		<div class="w-full flex flex-col justify-center" bind:this={parentDiv}>
			<div>
				<TextFitMulti
					class="h-16 w-full text-gray-500 text-md font-medium text-shadow justify-center underline"
				>
					{curOverlay?.title ?? 'Preview'}
				</TextFitMulti>
			</div>
			<div class="w-full aspect-video border-2 border-zinc-800 relative">
				<div class="w-full h-full absolute bg-black" />
				<div
					class="w-full h-full absolute bg-black bg-cover bg-center"
					style={`background-image: url('${
						base64 || '/image/backgrounds/MeleeMenuAll.png'
					}');
					opacity: ${imageOpacity}`}
				/>
				<div class="w-full h-full absolute">
					<NonInteractiveIFrame {src} title="preview" class="w-full h-full" />
				</div>
			</div>
			<div class="w-full p-2 grid grid-flow-row gap-2">
				<SceneSelect />
				<ExternalPreviewSettings bind:base64 bind:imageOpacity {reset} />
			</div>
		</div>
		<div class={`w-full pb-16`} style={`max-height: ${maxHeight}px`}>
			<LayerToggle />
		</div>
	</div>
{/if}
{#if isHorizontalScreen}
	<div
		class={`flex flex-row bg-cover bg-center items-center py-4 px-18 gap-2`}
		style={`height: 100svh; background-image: url('/image/backgrounds/MeleeMenuGreen.png'); padding-bottom: ${
			$isMobile && '5em'
		}`}
	>
		<div class="w-full gap-2 flex flex-col justify-center">
			<TextFitMulti
				class="h-16 w-full text-gray-500 text-md font-medium text-shadow justify-center underline"
			>
				{curOverlay?.title ?? 'Preview'}
			</TextFitMulti>
			<div class="w-full h-full aspect-video max-h-full border-2 border-zinc-800 relative">
				<div class="w-full h-full absolute bg-black" />
				<div
					class="w-full h-full absolute bg-black bg-cover bg-center"
					style={`background-image: url('${
						base64 || '/image/backgrounds/MeleeMenuAll.png'
					}');
					opacity: ${imageOpacity}`}
				/>
				<div class="w-full h-full absolute">
					<NonInteractiveIFrame {src} title="preview" class="w-full h-full" />
				</div>
			</div>
			<div class="w-full p-2 grid grid-flow-row gap-2">
				<SceneSelect />
				<ExternalPreviewSettings bind:base64 bind:imageOpacity {reset} />
			</div>
		</div>
		<div class={`w-[50em] h-full overflow-y-scroll`}>
			<LayerToggle />
		</div>
	</div>
{/if}
