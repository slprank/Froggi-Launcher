<script lang="ts" context="module">
	import { initElectronEvents, initEventListener } from '$lib/utils/initEventListener.svelte';
	import { initNoSleep } from '$lib/utils/noSleep.svelte';
	import { isBrowser, isElectron } from '$lib/utils/store.svelte';
	import { WEBSOCKET_PORT } from '$lib/models/const';
	import { getEventEmitter, getPage } from './FetchSubscriptions.svelte';
	import { extendStringFormat } from './extendString';

	export const initClient = async () => {
		await initEventListener();
		await initDevices();

		extendStringFormat();
	};

	const initDevices = async () => {
		const _eventEmitter = await getEventEmitter();
		const isBrowserWindow = await new Promise<boolean>((resolve) =>
			isBrowser.subscribe((x: boolean) => resolve(x)),
		);
		const isElectronWindow = await new Promise<boolean>((resolve) =>
			isElectron.subscribe((x: boolean) => resolve(x)),
		);
		if (isBrowserWindow) {
			initNoSleep();
			await initWebSocket();
			initServiceWorker();
		}

		if (isElectronWindow) {
			await initElectronEvents();
			_eventEmitter.emit('electron', 'init-data-electron');
		}
	};

	const initWebSocket = async () => {
		const _eventEmitter = await getEventEmitter();
		const _page = await getPage();
		console.log('Initializing websocket');
		const socket = new WebSocket(`ws://${_page.url.hostname}:${WEBSOCKET_PORT}`);
		socket.onopen = () => {
			_eventEmitter.on('electron', (topic, payload) => {
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
				_eventEmitter.emit(key, value);
			}
		});
	};

	const initServiceWorker = () => {
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('./../../../service-worker.js');
			});
		}
	};

	const reload = () => {
		window.location.reload();
	};
</script>
