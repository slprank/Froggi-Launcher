<script lang="ts">
	import AddControllerCommandModal from "$lib/components/dashboard/Modals/AddControllerCommandModal.svelte";
	import { notifications } from "$lib/components/notification/Notifications.svelte";
	import { obsControllerCommands } from "$lib/utils/store.svelte";

	let isNewCommandModalOpen = false;

	const deleteCommand = async () => {
		notifications.success('Command Deleted', 1500);
	}
	// TODO: Delete Command
	// TODO: Toggle Controller State
</script>

<div class="flex flex-col gap-2">
<h1 class="text-2xl font-bold text-white shadow-md">Controller Commands</h1>
	<div class="flex justify-between">
		{#each $obsControllerCommands as controllerCommand}
			<h1 class="text-xl text-white">{controllerCommand}</h1>
			<h1 class="text-xl text-white">{controllerCommand.command}</h1>
		{/each}
	</div>
	<div class="flex justify-center">
		<button class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-full h-12 px-2 xl:text-xl border border-white rounded"
			on:click={() => isNewCommandModalOpen = true}	
		>
			Add New Command
		</button>
	</div>
</div>
<AddControllerCommandModal bind:open={isNewCommandModalOpen} />