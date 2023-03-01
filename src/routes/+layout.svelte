<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { paramRedirect } from '$lib/utils/routeHandler.svelte';
	import {
		isMobile,
		isTablet,
		isBrowser,
		eventEmitter,
		isElectron,
	} from '$lib/utils/store.svelte';
	import { initNoSleep } from '$lib/utils/noSleep.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';

	let ready: boolean = false;

	if ($isBrowser) {
		initNoSleep();
		initWebSocket();
		initServiceWorker();
	}

	if ($isElectron) {
		initElectronEvents();
	}

	function initWebSocket() {
		paramRedirect();
		const socket = new WebSocket(`ws://${$page.url.hostname}:3100`);
		socket.onclose = () => {
			setTimeout(reload, 1000);
		};
		socket.addEventListener('message', ({ data }) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				$eventEmitter.emit(key, value);
			}
		});
	}

	function initElectronEvents() {
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				$eventEmitter.emit(key, value);
			}
		});
	}

	function initServiceWorker() {
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('./../service-worker.js');
			});
		}
	}

	function reload() {
		window.location.reload();
	}

	onMount(() => {
		ready = true;
	});
</script>

<div class="dragbar" />

{#if ready}
	<Navbar />
	<slot />
{/if}

<style>
	.dragbar {
		-webkit-app-region: drag;
		position: absolute;
		z-index: 100;
		height: 40px;
		width: 100%;
	}
</style>
