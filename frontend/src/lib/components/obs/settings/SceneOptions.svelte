<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import AddSceneCommandModal from '$lib/components/dashboard/Modals/AddSceneCommandModal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { LiveStatsScene } from '$lib/models/enum';
	import { ObsSceneSwitch } from '$lib/models/types/obsTypes';
	import { electronEmitter, obsSceneSwitch } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';

	let sceneOptions: ObsSceneSwitch | undefined = $obsSceneSwitch;
	let isSceneCommandModalOpen = false;
	let isDeleteCommandModalOpen = false;

	let selectedScene: LiveStatsScene = LiveStatsScene.WaitingForDolphin;
	let selectedCommand: string = '';

	$: console.log('scene options', sceneOptions);

	const deleteCommand = () => {
		if (isNil(sceneOptions)) return;
		delete sceneOptions[selectedScene][selectedCommand];
		isDeleteCommandModalOpen = false;
		updateSceneOptions();
	};

	const updateSceneOptions = () => {
		if (isNil(sceneOptions)) return;
		$electronEmitter.emit('ObsSceneSwitchUpdate', sceneOptions);
		notifications.success('Scene Options Updated', 2000);
	};

	const scenes: LiveStatsScene[] = Object.values(LiveStatsScene);

	$: sceneOptions = $obsSceneSwitch;
</script>

{#if !isNil(sceneOptions)}
	<div class="flex flex-col gap-2 font-bold">
		<h1 class="text-2xl font-bold text-white shadow-md text-center">Scene Switching</h1>
		<div class="flex flex-col justify-between gap-8 items-center">
			{#each scenes as scene}
				<h1 class="text-white text-xl">{scene}</h1>
				{#each Object.keys(sceneOptions?.[scene] ?? {}) as command}
					<div class="flex">
						<h1 class="text-white text-md">{command}</h1>
						<h1 class="text-white text-md">
							{JSON.stringify(sceneOptions[scene][command].payload)}
						</h1>
					</div>
					<button
						class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border border-white rounded"
						on:click={() => {
							selectedScene = scene;
							selectedCommand = command;
							isDeleteCommandModalOpen = true;
						}}
					>
						Delete
					</button>
				{/each}
			{/each}
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border border-white rounded"
				on:click={() => {
					isSceneCommandModalOpen = true;
				}}
			>
				Add Command
			</button>
		</div>
	</div>
{/if}

<AddSceneCommandModal bind:open={isSceneCommandModalOpen} />
<ConfirmModal bind:open={isDeleteCommandModalOpen} on:confirm={deleteCommand}>
	Delete Command
</ConfirmModal>
