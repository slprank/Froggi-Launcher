<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { socket } from '$lib/utils/store.svelte';
	import { browser } from '$app/environment';
	import { paramRedirect } from '$lib/utils/routeHandler.svelte';
	import { goto } from '$app/navigation';

	if (!window.electron && browser) {
		connectWebSocket();
	}

	function connectWebSocket() {
		paramRedirect();
		$socket = new WebSocket(`ws://${$page.url.hostname}:3100`);
		$socket.onclose = () => {
			// Handle reconnect by refreshing
			setTimeout(() => {
				const route = localStorage.getItem('recentRoute') ?? '';
				if (!route) window.location.href = $page.url.origin;
				window.location.href = `${$page.url.origin}?route=${route}`;
			}, 1000);
		};
	}

	let ready: boolean = false;
	onMount(() => {
		ready = true;
	});
</script>

<div class="dragbar" />

{#if ready}
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
