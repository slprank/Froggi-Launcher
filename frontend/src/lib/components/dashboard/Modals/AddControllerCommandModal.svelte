<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { ObsControllerCommand } from '$lib/models/types/obsTypes';
	import { electronEmitter } from '$lib/utils/store.svelte';

	export let open: boolean;

	const addCommand = async () => {
		if (!controllerCommand) return;
		if (!Object.values(controllerCommand.inputs).some((input) => input)) return;
		$electronEmitter.emit('ObsControllerCommandNew', controllerCommand);
		notifications.success('Updated Commands', 1500);
		open = false;
	};

	let controllerCommand: ObsControllerCommand = {
		inputs: {
			isAPressed: false,
			isBPressed: false,
			isDPadLeftPressed: false,
			isDPadRightPressed: false,
			isDPadUpPressed: false,
			isDPadDownPressed: false,
			isLPressed: false,
			isRPressed: false,
			isStartPressed: false,
			isXPressed: false,
			isYPressed: false,
			isZPressed: false,
		},
		command: 'SetCurrentProgramScene',
		payload: {},
		id: undefined,
	};
</script>

<Modal
	bind:open
	on:close={() => (open = false)}
	class="w-[95vw] max-w-[600px] min-w-72 flex justify-center"
>
	<div
		class="w-full h-full min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="flex justify-center">
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-full h-12 px-2 xl:text-xl border border-white rounded"
				on:click={addCommand}
			>
				Add Command
			</button>
		</div>
	</div>
</Modal>
