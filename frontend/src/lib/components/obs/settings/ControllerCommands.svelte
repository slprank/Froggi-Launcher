<script lang="ts">
	import AddControllerCommandModal from '$lib/components/dashboard/Modals/AddControllerCommandModal.svelte';
	import ButtonCommand from '$lib/components/dashboard/ObsCommands/ButtonCommand.svelte';
	import ToggleControllerCommand from '$lib/components/dashboard/ObsCommands/ToggleControllerCommand.svelte';
	import { controller } from '$lib/utils/store.svelte';

	let isNewCommandModalOpen = false;

	$: isControllerCommandEnabled = $controller.enabled;
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-2xl font-bold text-white shadow-md">Controller Commands</h1>
	<ToggleControllerCommand />
	<div class="flex flex-col gap-4" style={`opacity: ${isControllerCommandEnabled ? 1 : 0.5}`}>
		{#each $controller?.inputCommands ?? [] as controllerCommand}
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
