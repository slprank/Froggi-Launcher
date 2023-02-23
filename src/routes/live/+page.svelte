<script lang="ts">
	import io from 'socket.io-client';

	const socket = io('http://localhost:3200');

	socket.connect();

	socket.on('connect', () => {
		console.log('Device connected');
		test = 'Connected';
	});

	let test: string;

	socket.on('message', (e: string) => {
		test = e;
	});
</script>

<h1>Hello Test</h1>
<h1>{test}</h1>

<style>
</style>
