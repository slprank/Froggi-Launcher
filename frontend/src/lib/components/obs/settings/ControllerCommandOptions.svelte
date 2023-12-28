<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import AddControllerCommandModal from '$lib/components/dashboard/Modals/AddControllerCommandModal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { ControllerButtons } from '$lib/models/types/controller';
	import { ObsControllerCommand } from '$lib/models/types/obsTypes';
	import { electronEmitter, memoryReadController, obsController } from '$lib/utils/store.svelte';

	let isNewCommandModalOpen = false;
	let isDeleteCommandModalOpen = false;
	let selectedCommand: ObsControllerCommand | undefined;

	const deleteCommand = async () => {
		if (!selectedCommand?.id) {
			notifications.danger('Could not delete command', 1500);
			return;
		}
		$electronEmitter.emit('ObsControllerCommandDelete', selectedCommand.id);
		notifications.success('Command Deleted', 1500);
	};

	const toggleControllerCommandState = () => {
		$electronEmitter.emit('ObsControllerCommandStateToggle');
		notifications.success(
			`Controller Command ${isControllerCommandEnabled ? 'Disabled' : 'Enabled'}`,
			1500,
		);
	};

	const getSelectedInputs = (
		controllerButtons: ControllerButtons,
	): [key: keyof ControllerButtons, value: boolean][] => {
		return Object.entries(controllerButtons).filter(([_, value]) => value) as [
			key: keyof ControllerButtons,
			value: boolean,
		][];
	};

	const getControllerIndex = (): number => {
		return Number(
			Object.entries($memoryReadController).find(([_, value]) => value.isConnected)?.[0],
		);
	};

	const filterKey = (key: string) => {
		const pattern = /is(.*?)Pressed/;
		const match = key.match(pattern);
		return match ? match[1] : key;
	};

	$: isControllerCommandEnabled = $obsController.enabled;
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-2xl font-bold text-white shadow-md">Controller Commands</h1>
	<div class="flex justify-left items-center gap-2">
		<input
			type="checkbox"
			class="w-12 h-12"
			checked={isControllerCommandEnabled}
			on:change={toggleControllerCommandState}
		/>
		<h1 class="text-xl font-semibold text-white">Enable Controller Commands</h1>
	</div>
	<div class="flex flex-col gap-4" style={`opacity: ${isControllerCommandEnabled ? 1 : 0.5}`}>
		{#each $obsController?.inputCommands ?? [] as controllerCommand}
			<div class="flex gap-4 justify-center items-center">
				<div class="flex flex-col flex-1 justify-center">
					<div class="flex gap-2">
						{#each getSelectedInputs(controllerCommand.inputs) as [key, value]}
							<img
								class="aspect-square w-12 h-12"
								style={`opacity: ${
									$memoryReadController?.[getControllerIndex()]?.buttons?.[key]
										? 1
										: 0.5
								}`}
								src={`/image/controller-buttons/${filterKey(key)}.svg`}
								alt={key}
							/>
						{/each}
					</div>
					<h1 class="text-xl text-white">
						{controllerCommand.command}
						{JSON.stringify(controllerCommand.payload)}
					</h1>
				</div>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-12 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						selectedCommand = controllerCommand;
						isDeleteCommandModalOpen = true;
					}}
				>
					Delete
				</button>
			</div>
			<hr />
		{/each}
	</div>
	<div class="flex justify-center" style={`opacity: ${isControllerCommandEnabled ? 1 : 0.5}`}>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-full h-12 px-2 xl:text-xl border border-white rounded"
			on:click={() => (isNewCommandModalOpen = true)}
		>
			Add New Command
		</button>
	</div>
</div>
<AddControllerCommandModal bind:open={isNewCommandModalOpen} />
<ConfirmModal bind:open={isDeleteCommandModalOpen} on:confirm={deleteCommand}>
	Delete Command
</ConfirmModal>
