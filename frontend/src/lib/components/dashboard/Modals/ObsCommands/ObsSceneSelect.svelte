<script lang="ts">
	import { ObsCommandType } from '$lib/models/types/obsTypes';
	import { electronEmitter, obsConnection } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';

	const SwitchScene = (sceneName: string) => {
		$electronEmitter.emit('ExecuteObsCommand', ObsCommandType.Obs, 'SetCurrentProgramScene', {
			sceneName: sceneName,
		});
	};

	$: scenes = $obsConnection.scenes?.scenes.sort((a, b) =>
		a.sceneName.localeCompare(b.sceneName),
	);
</script>

<div class="flex flex-wrap gap-2">
	{#each scenes ?? [] as scene}
		<div class="flex gap-2 justify-start items-center" in:fly={{ duration: 250, x: 150 }}>
			<button
				class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
					$obsConnection.scenes?.currentProgramSceneName === scene.sceneName
						? 'border-red-500'
						: 'border-white'
				}`}
				on:click={() => {
					SwitchScene(scene?.sceneName);
				}}
			>
				{scene?.sceneName}
			</button>
		</div>
	{/each}
</div>
