<script lang="ts" context="module">
	import type EventEmitter from 'events';
	import { initElectronEvents, initEventListener } from '$lib/utils/initEventListener.svelte';
	import { initNoSleep } from '$lib/utils/noSleep.svelte';
	import { eventEmitter, isBrowser, isElectron, obs } from '$lib/utils/store.svelte';
	import type { Obs } from '$lib/models/types';
	import { page } from '$app/stores';
	import type { Page } from '@sveltejs/kit';
	import { WEBSOCKET_PORT } from '$lib/models/const';

	export const initClient = async () => {
		await initEventListener();
		await initDevices();

		if (!String.format) {
			String.format = function (format) {
				var args = Array.prototype.slice.call(arguments, 1);
				return format.replace(/{(\d+)}/g, function (match, number) {
					return typeof args[number] != 'undefined' ? args[number] : match;
				});
			};
		}
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
			initEventListener();
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
		initEventListener();
	};

	const initServiceWorker = () => {
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('./../../../service-worker.js');
			});
		}
	};

	export const getEventEmitter = async (): Promise<EventEmitter> => {
		return await new Promise<EventEmitter>((resolve) => {
			eventEmitter.subscribe((eventEmitter) => {
				resolve(eventEmitter);
			});
		});
	};

	export const getObs = async (): Promise<Obs> => {
		return await new Promise<Obs>((resolve) => {
			obs.subscribe((o) => {
				resolve(o);
			});
		});
	};

	export const getPage = async () => {
		return await new Promise<Page>((resolve) => {
			page.subscribe((p) => {
				resolve(p);
			});
		});
	};

	const reload = () => {
		window.location.reload();
	};
</script>
