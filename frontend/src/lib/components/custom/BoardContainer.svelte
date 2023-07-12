<script lang="ts">
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { SceneBackground, Transition } from '$lib/models/enum';
	import type { Scene } from '$lib/models/types';
	import { gameSettings, statsScene } from '$lib/utils/store.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly, scale, slide, blur } from 'svelte/transition';

	export let edit: boolean = false;
	export let preview: boolean = false;
	export let scene: Scene;

	const animate = (node: Element, transitionDelay: number) => {
		if (preview || edit || !scene) return;
		switch (scene.background.transition) {
			case Transition.None:
				return;
			case Transition.Fade:
				return fade(node, {
					delay: transitionDelay,
					duration: scene.background.duration ?? 250,
				});
			case Transition.Scale:
				return scale(node, {
					delay: transitionDelay,
					duration: scene.background.duration ?? 250,
				});
			case Transition.Fly:
				return fly(node, {
					delay: transitionDelay,
					duration: scene.background.duration ?? 250,
					y: -50,
					easing: sineInOut,
				});
			case Transition.Slide:
				return slide(node, {
					delay: transitionDelay,
					duration: scene.background.duration ?? 250,
				});
			case Transition.Blur:
				return blur(node, {
					delay: transitionDelay,
					duration: scene.background.duration ?? 250,
				});
			default:
				return;
		}
	};
	const animateIn = (node: Element) => {
		return animate(node, SCENE_TRANSITION_DELAY);
	};
	const animateOut = (node: Element) => {
		return animate(node, 0);
	};

	// TODO: Add support for "Stage" option
</script>

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
