<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	const socket = writable<WebSocket>();
	export { socket };
</script>
