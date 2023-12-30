<script lang="ts">
	import AddControllerCommandModal from '$lib/components/dashboard/Modals/AddControllerCommandModal.svelte';
	import ButtonCommand from '$lib/components/dashboard/ObsCommands/ButtonCommand.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { electronEmitter, obsController } from '$lib/utils/store.svelte';

	let isNewCommandModalOpen = false;

	const toggleControllerCommandState = () => {
		$electronEmitter.emit('ControllerCommandStateToggle');
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
			<ButtonCommand {controllerCommand} />
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
