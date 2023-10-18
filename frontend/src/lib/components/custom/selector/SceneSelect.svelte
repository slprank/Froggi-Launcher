<script lang="ts">
	import { LiveStatsScene } from '$lib/models/enum';
	import { eventEmitter, statsScene } from '$lib/utils/store.svelte';

	function updateLiveScene(scene: LiveStatsScene) {
		$eventEmitter.emit('electron', 'update-live-scene', scene);
	}

	let buttons = [
		{
			text: 'Waiting',
			liveScene: LiveStatsScene.WaitingForDolphin,
		},
		{
			text: 'Menu',
			liveScene: LiveStatsScene.Menu,
		},
		{
			text: 'In Game',
			liveScene: LiveStatsScene.InGame,
		},
		{
			text: 'Post Game',
			liveScene: LiveStatsScene.PostGame,
		},
		{
			text: 'Post Set',
			liveScene: LiveStatsScene.PostSet,
		},
		{
			text: 'Rank Change',
			liveScene: LiveStatsScene.RankChange,
		},
	];
</script>

<div class="w-lg 3xl:w-full flex flex-wrap gap-2">
	{#each buttons as button}
		<div class="grid gap-2 justify-start items-start">
			<button
				class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
					$statsScene === button.liveScene ? 'border-red-500' : 'border-white'
				}`}
				on:click={() => {
					updateLiveScene(button.liveScene);
				}}
			>
				{button.text}
			</button>
		</div>
	{/each}
</div>
