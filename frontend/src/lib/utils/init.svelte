<script lang="ts" context="module">
	import {
		initElectronEvents,
		initEventListener,
		initWebSocket,
	} from '$lib/utils/initEventListener.svelte';
	import { initNoSleep } from '$lib/utils/noSleep.svelte';
	import { isBrowser, isElectron } from '$lib/utils/store.svelte';
	import { WEBSOCKET_PORT } from '$lib/models/const';
	import { getEventEmitter, getPage } from '$lib/utils/fetchSubscriptions.svelte';
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
			_eventEmitter.emit('InitElectron');
		}
	};

	const initServiceWorker = () => {
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('./../../../service-worker.js');
			});
		}
	};
</script>
