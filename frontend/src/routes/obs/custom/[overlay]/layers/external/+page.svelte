<script lang="ts">
	import { page } from '$app/stores';
	import LayerToggle from '$lib/components/custom/preview/LayerToggle.svelte';
	import NonInteractiveIFrame from '$lib/components/custom/preview/NonInteractiveIFrame.svelte';
	import FileToBase64Input from '$lib/components/input/FileToBase64Input.svelte';
	import SliderInput from '$lib/components/input/SliderInput.svelte';
	import { isElectron, isMobile, urls } from '$lib/utils/store.svelte';

	const overlayId: string | undefined = $page.params.overlay;

	let base64: string | undefined;
	let imageOpacity: number = 1;

	let innerWidth: number;
	let innerHeight: number;
	$: isVerticalScreen = innerHeight > innerWidth;
	$: isHorizontalScreen = !isVerticalScreen;

	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/custom/${overlayId}/layers`;
	$: console.log('src', src);

	const reset = () => {
		base64 = undefined;
		imageOpacity = 1;
	};
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if isVerticalScreen}
	<div
		class={`flex flex-col bg-cover bg-center items-start`}
		style={`height: 100svh; background-image: url('/image/backgrounds/MeleeMenuGreen.png'); padding-bottom: ${
			$isMobile ? '5' : '4'
		}em`}
	>
		<div>
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
			<div class="h-16 grid grid-flow-row grid-cols-8 gap-2 items-center px-2">
				<div class="w-full col-span-2 grid items-center">
					<FileToBase64Input
						bind:base64
						acceptedExtensions={'.jpg, .jpeg, .png, .gif, .svg'}
					/>
				</div>
				<div class="w-full col-span-2 grid items-center">
					<SliderInput min={0} max={1} step={0.01} bind:value={imageOpacity} />
				</div>
				<button
					class="col-start-6 col-end-8 transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
					on:click={reset}
				>
					Reset
				</button>
			</div>
		</div>
		<div class={`w-full h-full overflow-y-scroll`}>
			<LayerToggle />
		</div>
	</div>
{/if}

<style>
	:global(body) {
		background: transparent;
	}
</style>
