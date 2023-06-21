<script lang="ts">
	import { SceneBackground, Transition } from '$lib/models/enum';
	import type { Scene } from '$lib/models/types';
	import { gameSettings } from '$lib/utils/store.svelte';
	import { fade, fly, scale, slide, blur } from 'svelte/transition';

	export let scene: Scene;
	export let preview: boolean = false;

	const animate = (node: Element) => {
		if (!preview || !scene) return;
		switch (scene.background.transition) {
			case Transition.None:
				return;
			case Transition.Fade:
				return fade(node, { duration: scene.background.duration ?? 250 });
			case Transition.Scale:
				return scale(node, { duration: scene.background.duration ?? 250 });
			case Transition.Fly:
				return fly(node, { duration: scene.background.duration ?? 250, y: -50 });
			case Transition.Slide:
				return slide(node, { duration: scene.background.duration ?? 250 });
			case Transition.Blur:
				return blur(node, { duration: scene.background.duration ?? 250 });
		}
	};

	// TODO: Add support for "Stage" option
</script>

<div
	in:animate
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
