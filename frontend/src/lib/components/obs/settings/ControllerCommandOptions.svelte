<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import AddControllerCommandModal from '$lib/components/dashboard/Modals/AddControllerCommandModal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { ObsControllerCommand } from '$lib/models/types/obsTypes';
	import { electronEmitter, obsController } from '$lib/utils/store.svelte';

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
			<div class="flex gap-4">
				<div class="flex flex-col">
					<h1 class="text-xl text-white">{controllerCommand}</h1>
					<h1 class="text-xl text-white">{controllerCommand.command}</h1>
				</div>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-full h-12 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						selectedCommand = controllerCommand;
						isDeleteCommandModalOpen = true;
					}}
				>
					Delete
				</button>
			</div>
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
