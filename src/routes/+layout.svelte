<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { socket } from '$lib/utils/store.svelte';

	let ready: boolean = false;
	onMount(() => {
		ready = true;
		$socket = new WebSocket(`ws://${$page.url.hostname}:3100`);
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
