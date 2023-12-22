<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { LiveStatsScene } from '$lib/models/enum';
	import { ObsSceneSwitch } from '$lib/models/types/obsTypes';
	import { electronEmitter, obsSceneSwitch } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';

	const updateSceneOptions = () => {
		if (isNil(sceneOptions)) return;
		$electronEmitter.emit('ObsSceneSwitchUpdate', sceneOptions);
		notifications.success('Scene Options Updated', 2000);
	};

	let sceneOptions: ObsSceneSwitch | undefined = $obsSceneSwitch;

	$: sceneOptions = $obsSceneSwitch;
</script>

{#if !isNil(sceneOptions)}
	<div class="flex flex-col gap-2 font-bold">
		<h1 class="text-2xl font-bold text-white shadow-md text-center">Scene Switching</h1>
		<div class="flex justify-between gap-8 items-center">
			<h1 class="text-white text-lg">Waiting For Dolphin</h1>
			<TextInput bind:value={sceneOptions[LiveStatsScene.WaitingForDolphin].sceneName} />
		</div>
		<div class="flex justify-between gap-8 items-center">
			<h1 class="text-white text-lg">Menu</h1>
			<TextInput bind:value={sceneOptions[LiveStatsScene.Menu].sceneName} />
		</div>
		<div class="flex justify-between gap-8 items-center">
			<h1 class="text-white text-lg">In Game</h1>
			<TextInput bind:value={sceneOptions[LiveStatsScene.InGame].sceneName} />
		</div>
		<div class="flex justify-between gap-8 items-center">
			<h1 class="text-white text-lg">Post Game</h1>
			<TextInput bind:value={sceneOptions[LiveStatsScene.PostGame].sceneName} />
		</div>
		<div class="flex justify-between gap-8 items-center">
			<h1 class="text-white text-lg">Post Set</h1>
			<TextInput bind:value={sceneOptions[LiveStatsScene.PostSet].sceneName} />
		</div>
		<div class="flex justify-between gap-8 items-center">
			<h1 class="text-white text-lg">Rang Change</h1>
			<TextInput bind:value={sceneOptions[LiveStatsScene.RankChange].sceneName} />
		</div>
		<div class="flex justify-center">
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-12 my-4"
				on:click={updateSceneOptions}
			>
				Update
			</button>
		</div>
	</div>
{/if}
