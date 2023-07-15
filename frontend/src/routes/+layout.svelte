<script lang="ts">
	import '../app.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/scrollbar.css';
	import '$lib/styles/styles.css';
	import '$lib/styles/tooltip.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { paramRedirect } from '$lib/utils/routeHandler.svelte';
	import { initNoSleep } from '$lib/utils/noSleep.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { isBrowser, isElectron, eventEmitter } from '$lib/utils/store.svelte';
	import GlobalModal from '$lib/components/global/GlobalModal.svelte';
	import Toast from '$lib/components/notification/Toast.svelte';
	import { WEBSOCKET_PORT } from '$lib/models/const';
	import { initEventListener } from '$lib/utils/initEventListener.svelte';

	function initDevices() {
		if ($isBrowser) {
			initNoSleep();
			initWebSocket();
			initServiceWorker();
			paramRedirect();
		}

		if ($isElectron) {
			initElectronEvents();
			initEventListener();
			$eventEmitter.emit('electron', 'init-data-electron');
		}
	}

	function initElectronEvents() {
		console.log('Initializing electron');
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				$eventEmitter.emit(key, value);
			}
		});
		$eventEmitter.on('electron', (topic, payload) => {
			console.log('Sending electron message..', topic, payload);
			window.electron.send('message', JSON.stringify({ [topic]: payload ?? '' }));
		});
		$eventEmitter.on('global', (topic, payload) => {
			console.log('Sending global message..', topic, payload);
			window.electron.send('message', JSON.stringify({ [topic]: payload ?? '' }));
		});
		$eventEmitter.on('local', (topic, payload) => {
			$eventEmitter.emit(topic, payload);
		});
	}

	function initWebSocket() {
		console.log('Initializing websocket');
		const socket = new WebSocket(`ws://${$page.url.hostname}:${WEBSOCKET_PORT}`);
		socket.onopen = () => {
			$eventEmitter.on('electron', (topic, payload) => {
				console.log('Sending message..', topic, payload);
				socket.send(JSON.stringify({ [topic]: payload ?? '' }));
			});
		};
		socket.onclose = () => {
			setTimeout(reload, 1000);
		};
		socket.addEventListener('message', ({ data }) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				$eventEmitter.emit(key, value);
			}
		});
		initEventListener();
	}

	function initServiceWorker() {
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('./../service-worker.js');
			});
		}
	}

	const reload = () => {
		window.location.reload();
	};

	let ready: boolean = false;

	onMount(() => {
		initDevices();
		ready = true;
	});
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

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: black;
	}

	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
