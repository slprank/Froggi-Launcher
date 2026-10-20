<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../visibilityCategories/SelectVisibilityOption.svelte';

	const dispatch = createEventDispatcher();
	const select = (e: CustomEvent<CustomElement>) => dispatch('select', e.detail);
</script>

<div class="flex flex-col gap-2">
	<p class="text-xs opacity-50">
		Plays the video a flow points a key at — a highlight reel from OBS's replay buffer (flow "Highlights")
		or any video file ("Set video"). In sync on every screen.
	</p>
	<SelectOption description="A video by key: a highlight reel or a file a flow sets — every screen plays it in sync" value={CustomElement.PostGameHighlightVideo} on:select={select}>
		Video
	</SelectOption>
</div>
