<script lang="ts">
	import { page } from '$app/stores';
	import type { Scene } from '$lib/types/types';
	import { obs } from '$lib/utils/store.svelte';
	import Board from './Board.svelte';

	const sceneId = parseInt($page.params.scene);
	export let height: number | undefined = undefined;

	// TODO: Use sceneId if data is not provided
</script>

<Board bind:height {sceneId} />
