<script lang="ts">
	import { LiveStatsScene } from '$lib/models/enum';
	import Select from '$lib/components/input/Select.svelte';
	import { localEmitter, statsScene } from '$lib/utils/store.svelte';
	import type { Overlay } from '$lib/models/types/overlay';

	export let overlay: Overlay;

	function updateLiveScene(scene: LiveStatsScene) {
		$localEmitter.emit('LiveStatsSceneChange', scene);
	}

	let options = [
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

{#if overlay}
	<div class="w-lg 3xl:w-full grid grid-flow-row gap-2">
		{#each options as button}
			<div class="grid grid-flow-col gap-2 justify-start items-start w-full">
				<div class="w-4 h-4 grid justify-center items-center">
					<input
						type="checkbox"
						value={button.liveScene}
						bind:checked={overlay[button.liveScene].active}
					/>
				</div>
				<button
					class={`w-32 transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
						$statsScene === button.liveScene ? 'border-red-500' : 'border-white'
					}`}
					on:click={() => {
						updateLiveScene(button.liveScene);
					}}
				>
					{button.text}
				</button>
				{#if !overlay?.[button.liveScene].active}
					<div
						class="w-32"
						data-tooltip={`Selected scene will be displayed over expected scene`}
					>
						<Select bind:selected={overlay[button.liveScene].fallback}>
							{#each options as option}
								{#if overlay[option.liveScene].active}
									<option value={option.liveScene}>{option.text}</option>
								{/if}
							{/each}
						</Select>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}
