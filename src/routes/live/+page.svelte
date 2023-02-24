<script lang="ts">
	import { socket } from '$lib/utils/store.svelte';
	import { browser } from '$app/environment';

	// receive a message from the server
	if (window.electron && browser) {
		window.electron.receive('message', (data: any) => {
			message = data;
		});
		window.electron.receive('test', (data: any) => {
			test = data;
		});
	} else {
		$socket.addEventListener('message', ({ data }) => {
			let parse = JSON.parse(data); // "{"test", "test"}"
			console.log(parse); // {test: test}
			console.log(parse?.message); // undefined
			console.log(parse['test']); // undefined
			if (parse.message) message = parse.message;
			if (parse.test) test = parse.test;
		});
	}

	let message: string;
	let test: string;
</script>

<h1>Hello Test</h1>
<h1>Message topic: {message}</h1>
<h1>Test topic: {test}</h1>

<style>
</style>
