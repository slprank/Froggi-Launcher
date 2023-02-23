<script lang="ts">
	// https://socket.io/docs/v4/client-api/

	import { page } from '$app/stores';
	console.log($page.url.origin); // Current url device

	const socket = new WebSocket('ws://localhost:3100');

	// receive a message from the server
	socket.addEventListener('message', ({ data }) => {
		test = data;
	});

	let test: string;
</script>

<h1>Hello Test</h1>
<h1>{test}</h1>

<style>
</style>
