<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import AddSceneCommandModal from '$lib/components/dashboard/Modals/AddSceneCommandModal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { LiveStatsScene } from '$lib/models/enum';
	import { Command, SceneSwitchCommands } from '$lib/models/types/commandTypes';
	import { electronEmitter, obsSceneSwitch } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';

	let sceneCommands: SceneSwitchCommands | undefined = $obsSceneSwitch;
	let isSceneCommandModalOpen = false;
	let isDeleteCommandModalOpen = false;

	let selectedScene: LiveStatsScene = LiveStatsScene.WaitingForDolphin;
	let selectedCommand: Command;

	const deleteSceneCommand = () => {
		if (isNil(sceneCommands) || isNil(selectedCommand)) return;
		$electronEmitter.emit('SceneSwitchCommandDelete', selectedScene, selectedCommand?.id);
		isDeleteCommandModalOpen = false;
		notifications.success('Scene Command Deleted', 2000);
	};

	const scenes: LiveStatsScene[] = Object.values(LiveStatsScene);

	$: sceneCommands = $obsSceneSwitch;
</script>

{#if !isNil(sceneCommands)}
	<div class="flex flex-col gap-2 font-bold">
		<h1 class="text-3xl font-bold text-white shadow-md text-center">Scene Switching</h1>
		<div class="flex flex-col justify-between gap-8 items-center">
			{#each scenes as scene}
				<div class="w-full flex flex-col gap-4">
					<h1 class="text-white text-2xl">{scene}:</h1>
					{#each sceneCommands[scene] ?? [] as command}
						<div class="flex flex-col w-full">
							<h1 class="text-white text-lg">{command.requestType}:</h1>
							{#each Object.keys(command?.payload ?? {}) as key}
								<div class="flex gap-2 justify-between">
									<h1 class="text-white text-md">
										{key}
									</h1>
									<h1 class="text-white text-md">
										{command?.payload?.[key]}
									</h1>
								</div>
							{/each}
							<button
								class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 text-xl border border-white rounded"
								on:click={() => {
									selectedScene = scene;
									selectedCommand = command;
									isDeleteCommandModalOpen = true;
								}}
							>
								Delete
							</button>
						</div>
					{/each}
				</div>
			{/each}
			<button
				class="transition w-full bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 text-2xl border border-white rounded"
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
<ConfirmModal bind:open={isDeleteCommandModalOpen} on:confirm={deleteSceneCommand}>
	Delete Command
</ConfirmModal>
