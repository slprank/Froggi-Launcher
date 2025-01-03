<script lang="ts">
	import { electronEmitter } from '$lib/utils/store.svelte';

	const saveLogs = () => {
		$electronEmitter.emit('SaveLogs');
	};
</script>

<div
	class="flex flex-col gap-4 w-full items-center justify-start overflow-auto py-4 border-secondary rounded-md p-4"
>
	<div>
		<h1 class="text-4xl font-bold color-secondary">Logs</h1>
	</div>
	<div class="w-full flex justify-center">
		<button
			class="rounded-md p-2 bg-green-500 border-secondary text-white hover:cursor-pointer disabled:bg-gray-700 disabled:hover:scale-0"
			on:click={saveLogs}
		>
			Save logs
		</button>
	</div>
</div>
