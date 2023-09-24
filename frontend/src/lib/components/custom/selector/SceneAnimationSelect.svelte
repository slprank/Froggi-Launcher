<script lang="ts">
	import AnimationInput from '$lib/components/input/AnimationInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { Animation } from '$lib/models/enum';
	import type { AnimationSettings } from '$lib/models/types';

	export let animation: AnimationSettings;
	export let duration: number | undefined = undefined;
</script>

<div class="w-full">
	<AnimationInput bind:animation isSceneAnimation={true} />
</div>
