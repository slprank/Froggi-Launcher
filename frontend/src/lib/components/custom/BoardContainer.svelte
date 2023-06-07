<script lang="ts">
	import { SceneBackground, Transition } from '$lib/models/enum';
	import type { Scene } from '$lib/models/types';
	import { fade, fly, scale, slide, blur } from 'svelte/transition';

	export let scene: Scene;
	export let preview: boolean = false;

	const animate = (node: Element) => {
		if (!preview || !scene) return;
		switch (scene.backgroundTransition) {
			case Transition.None:
				return;
			case Transition.Fade:
				return fade(node, { duration: scene.backgroundDuration ?? 250 });
			case Transition.Scale:
				return scale(node, { duration: scene.backgroundDuration ?? 250 });
			case Transition.Fly:
				return fly(node, { duration: scene.backgroundDuration ?? 250, y: -50 });
			case Transition.Slide:
				return slide(node, { duration: scene.backgroundDuration ?? 250 });
			case Transition.Blur:
				return blur(node, { duration: scene.backgroundDuration ?? 250 });
		}
	};

	// TODO: Add support for "Stage" option
</script>

<div
	in:animate
	class={`w-full h-full bg-center absolute z-0`}
	style={`
				${scene?.backgroundType === SceneBackground.Color ? `background: ${scene.backgroundColor};` : ''};
				${
					scene?.backgroundType === SceneBackground.Image
						? `background-image: url('/image/backgrounds/${scene.backgroundImage.src}');
						background-size: ${scene.backgroundImage.objectFit ?? 'cover'};`
						: ''
				}
				${
					scene?.backgroundType === SceneBackground.ImageCustom
						? `background-image: url('${scene.backgroundCustomImage.src}'); 
						background-size: ${scene.backgroundCustomImage.objectFit ?? 'cover'};`
						: ''
				}
				${
					scene?.backgroundType === SceneBackground.ImageStage
						? `background-image: url('/image/backgrounds/8.png');`
						: ''
				}
				${scene?.backgroundOpacity !== undefined ? `opacity: ${scene.backgroundOpacity / 100};` : ''}
				background-repeat: no-repeat;`}
>
	<slot />
</div>
