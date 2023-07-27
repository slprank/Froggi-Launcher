<script lang="ts">
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { Animation } from '$lib/models/enum';
	export let animationType: Animation;
	export let duration: number | undefined = undefined;
</script>

<div class="w-24">
	<Select bind:selected={animationType} label="Type">
		<option value={Animation.None}>None</option>
		<option value={Animation.Blur}>Blur</option>
		<option value={Animation.Fade}>Fade</option>
		<option value={Animation.Fly}>Fly</option>
		<option value={Animation.Scale}>Scale</option>
		<option value={Animation.Slide}>Slide</option>
	</Select>
</div>
{#if animationType !== Animation.None && duration !== undefined}
	<div class="w-24">
		<NumberInput
			bind:value={duration}
			label="Duration - ms"
			max={SCENE_TRANSITION_DELAY}
			autoFocusValue={3}
		/>
	</div>
{/if}
