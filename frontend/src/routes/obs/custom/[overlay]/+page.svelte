<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import { isElectron } from '$lib/utils/store.svelte';

	$: isSubRoute = $page.url.pathname.split('/').at(-1) === 'layers';
</script>

<MainOverlay />
