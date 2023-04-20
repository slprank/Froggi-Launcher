<script lang="ts">
	import { LiveStatsScene } from '$lib/types/enum';
	import { eventEmitter } from '$lib/utils/store.svelte';

	function updateLiveScene(scene: LiveStatsScene) {
		$eventEmitter.emit('electron', 'update-live-scene', scene);
	}
</script>

<div class="w-lg 3xl:w-full flex flex-wrap gap-2">
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded  mt-4"
		on:click={() => {
			updateLiveScene(LiveStatsScene.WaitingForDolphin);
		}}
	>
		Waiting
	</button>
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded  mt-4"
		on:click={() => {
			updateLiveScene(LiveStatsScene.PreGame);
		}}
	>
		Pre Game
	</button>
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded mt-4"
		on:click={() => {
			updateLiveScene(LiveStatsScene.InGame);
		}}
	>
		In Game
	</button>
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded mt-4"
		on:click={() => {
			updateLiveScene(LiveStatsScene.PostGame);
		}}
	>
		Post Game
	</button>
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded mt-4"
		on:click={() => {
			updateLiveScene(LiveStatsScene.RankChange);
		}}
	>
		Rank Change
	</button>
</div>
