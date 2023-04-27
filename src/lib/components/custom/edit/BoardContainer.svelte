<script lang="ts">
	import { SceneBackground } from '$lib/types/enum';
	import type { Scene } from '$lib/types/types';

	export let scene: Scene;

	// TODO: Add support for "Stage" option
</script>

<div
	class="w-full h-full bg-cover bg-center absolute z-0"
	style={`
				${scene.background === SceneBackground.Color ? `background: ${scene.backgroundColor};` : ''};
				${
					scene.background === SceneBackground.Image
						? `background-image: url('/image/backgrounds/${scene.backgroundImage}');`
						: ''
				}
				${
					scene.background === SceneBackground.ImageCustom
						? `background-image: url('${scene.backgroundCustomImage}');`
						: ''
				}
				${
					scene.background === SceneBackground.ImageStage
						? `background-image: url('/image/backgrounds/8.png');`
						: ''
				}
				${scene.opacity !== undefined ? `opacity: ${scene.opacity};` : ''}`}
>
	<slot />
</div>
