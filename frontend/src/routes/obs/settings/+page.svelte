<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border-secondary w-40 h-20 my-4"
		on:click={() => goto('/obs/settings/websocket')}
	>
		OBS Websocket
	</button>
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border-secondary w-40 h-20 my-4"
		on:click={() => goto('/obs/settings/scene')}
	>
		Scene Commands
	</button>
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border-secondary w-40 h-20 my-4"
		on:click={() => goto('/obs/settings/controller')}
	>
		Controller Commands
	</button>
</div>
