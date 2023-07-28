<script lang="ts">
	import { SceneBackground } from '$lib/models/enum';
	import type { Scene } from '$lib/models/types';
	import { gameSettings } from '$lib/utils/store.svelte';
	import { createElementAnimation } from './element/animations/AnimationExport.svelte';

	export let boardHeight: number | undefined = undefined;
	export let boardWidth: number | undefined = undefined;
	export let edit: boolean = false;
	export let preview: boolean = false;
	export let scene: Scene;

	let innerHeight: number;
	let innerWidth: number;

	const animateIn = (node: Element) => {
		if (preview || edit || !scene) return;
		console.log('In:', scene);
		return createElementAnimation(
			node,
			scene.background.animation.in,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
		);
	};
	const animateOut = (node: Element) => {
		if (preview || edit || !scene) return;
		console.log('board', boardHeight, boardWidth);
		console.log('Out:', scene);
		return createElementAnimation(
			node,
			scene.background.animation.out,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
		);
	};

	// TODO: Add support for "Stage" option
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div
	in:animateIn
	out:animateOut
	class={`w-full h-full bg-center absolute z-0`}
	style={`
				${scene?.background.type === SceneBackground.Color ? `background: ${scene.background.color};` : ''};
				${
					scene?.background.type === SceneBackground.Image
						? `background-image: url('/image/backgrounds/${
								scene.background.image.src
						  }');
						background-size: ${scene.background.image.objectFit ?? 'cover'};`
						: ''
				}
				${
					scene?.background.type === SceneBackground.ImageCustom
						? `background-image: url('${scene.background.customImage.src}'); 
						background-size: ${scene.background.customImage.objectFit ?? 'cover'};`
						: ''
				}
				${
					scene?.background.type === SceneBackground.ImageStage
						? `background-image: url('/image/stages/${$gameSettings.stageId}.png');
						background-size: ${scene.background.image.objectFit ?? 'cover'};`
						: ''
				}
				${scene?.background.opacity !== undefined ? `opacity: ${scene.background.opacity / 100};` : ''}
				background-repeat: no-repeat;`}
>
	<slot />
</div>
