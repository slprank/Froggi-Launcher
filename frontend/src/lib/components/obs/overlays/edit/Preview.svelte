<script lang="ts">
	import { page } from '$app/stores';
	import { isElectron, urls } from '$lib/utils/store.svelte';
	import NonInteractiveIFrame from '../preview/NonInteractiveIFrame.svelte';

	const overlayId = $page.params.overlay;
	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/overlay/${overlayId}/layers`;
</script>

<div class={`w-full h-full border-2 border-zinc-700 overflow-hidden shadow-md my-2`}>
	<NonInteractiveIFrame {src} title="preview" class="w-full h-full" />
</div>
