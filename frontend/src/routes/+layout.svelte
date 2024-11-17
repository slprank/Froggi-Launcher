<script lang="ts">
	import '../app.css';
	import 'svooltip/styles.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/scrollbar.css';
	import '$lib/styles/styles.css';
	import '$lib/styles/tooltip.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { isElectron, isOverlayPage, localEmitter } from '$lib/utils/store.svelte';
	import GlobalModal from '$lib/components/global/GlobalModal.svelte';
	import Toast from '$lib/components/notification/Toast.svelte';
	import { initClient } from '$lib/utils/init.svelte';
	import { page } from '$app/stores';
	import { ScreenWakeLock } from 'svelte-screen-wake-lock';

	let ready: boolean = false;

	onMount(async () => {
		await initClient();
		ready = true;

		return () => {
			$localEmitter.removeAllListeners();
		};
	});

	const updateBackgroundColor = (url: string) => {
		if ($isOverlayPage && !$isElectron) {
			document.body.style.backgroundColor = 'transparent';
		} else {
			document.body.style.backgroundColor = 'black';
		}
	};
	$: updateBackgroundColor($page.url.pathname);
</script>

{#if $isElectron}
	<div class="w-screen px-16">
		<div class="dragbar" />
	</div>
{/if}

{#if ready}
	<Navbar />
	<GlobalModal />
	<Toast />
	<slot />
{/if}

<ScreenWakeLock />

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
