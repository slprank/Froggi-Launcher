<script lang="ts">
	import { page } from '$app/stores';
	import type { Scene } from '$lib/types/types';
	import Board from './Board.svelte';

	const sceneId = $page.params.scene;
	export let height: number | undefined = undefined;
	export const data = {} as Scene;

	// TODO: Use sceneId if data is not provided
</script>

<Board bind:height />
