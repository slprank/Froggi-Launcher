<script lang="ts">
	import { ConnectionState } from '$lib/models/enum';
	import { electronEmitter, obsConnection } from '$lib/utils/store.svelte';
	import { notifications } from '../notification/Notifications.svelte';

	const saveReplayBuffer = () => {
		if ($obsConnection.state !== ConnectionState.Connected) {
			notifications.warning('OBS is not running', 3000);
			return;
		}
		if (!$obsConnection.replayBufferState.outputActive) {
			notifications.warning('Replay Buffer is not active', 3000);
			return;
		}
		$electronEmitter.emit('ExecuteObsCommand', 'SaveReplayBuffer');
	};
</script>

<div class="flex flex-col gap-2">
	<button
		class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
		on:click={saveReplayBuffer}
	>
		Save Replay Buffer
	</button>
</div>
