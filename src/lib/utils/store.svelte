<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { EventEmitter } from 'events';
	import Device from 'svelte-device-info';

	const eventEmitter = writable<EventEmitter>(new EventEmitter());
	const isBrowser = writable<boolean>(!window.electron && browser);
	const isElectron = writable<boolean>(window.electron && browser);
	const isMobile = writable<boolean>(Device.isMobile);
	const isTablet = writable<boolean>(Device.isMobile);

	export { eventEmitter, isBrowser, isElectron, isMobile, isTablet };
</script>
