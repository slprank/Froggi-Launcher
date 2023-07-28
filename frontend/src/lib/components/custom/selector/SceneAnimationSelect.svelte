<script lang="ts">
	import AnimationInput from '$lib/components/input/AnimationInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { Animation } from '$lib/models/enum';
	import type { AnimationSettings } from '$lib/models/types';

	export let animation: AnimationSettings;
	export let duration: number | undefined = undefined;
	export let isSceneInAnimation: boolean = false;
</script>

<div class="w-full">
	<AnimationInput bind:animation isSceneAnimation={true} {isSceneInAnimation} />
</div>
{#if animation.type !== Animation.None && duration !== undefined}
	<div class="w-full">
		<NumberInput
			bind:value={duration}
			label="Duration - ms"
			max={SCENE_TRANSITION_DELAY}
			autoFocusValue={3}
		/>
	</div>
{/if}
