<script lang="ts">
	import AnimationInput from '$lib/components/input/AnimationInput.svelte';
	import type { AnimationSettings } from '$lib/models/types';

	export let animation: AnimationSettings;
</script>

<div class="w-full">
	<AnimationInput bind:animation isSceneAnimation={true} />
</div>
