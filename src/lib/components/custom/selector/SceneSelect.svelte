<script lang="ts">
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { LiveStatsScene } from '$lib/types/enum';
	import { eventEmitter, statsScene } from '$lib/utils/store.svelte';

	export let selected: LiveStatsScene[] | undefined = undefined;
	export let defaultValue: LiveStatsScene | undefined = undefined;

	let tempSelected: boolean[] = [];
	console.log('selected', selected);
	selected?.forEach((s) => {
		tempSelected[s] = true;
	});
	console.log('temp', tempSelected);

	function updateSelected() {
		if (selected === undefined) return;
		selected =
			tempSelected
				.map((s, i) => {
					if (s === undefined || s === false) return;
					return i;
				})
				.filter((s) => s !== undefined) ?? [];
	}
	$: tempSelected, updateSelected();

	function updateLiveScene(scene: LiveStatsScene) {
		$eventEmitter.emit('electron', 'update-live-scene', scene);
	}

	// TODO: Notification when selecting a disabled scene
	// TODO: Refresh page on update

	let buttons = [
		{
			text: 'Waiting',
			liveScene: LiveStatsScene.WaitingForDolphin,
		},
		{
			text: 'Pre Game',
			liveScene: LiveStatsScene.PreGame,
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
			text: 'Rank Change',
			liveScene: LiveStatsScene.RankChange,
		},
	];
</script>

<div class="w-lg 3xl:w-full flex flex-wrap gap-2">
	{#each buttons as button}
		<div class="grid gap-2 justify-start items-start">
			{#if selected}
				<div title="test" class="w-4 h-4">
					<input
						disabled={button.liveScene === defaultValue}
						type="checkbox"
						value={button.liveScene}
						bind:checked={tempSelected[button.liveScene]}
					/>
				</div>
			{/if}
			<button
				class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border  rounded ${
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
