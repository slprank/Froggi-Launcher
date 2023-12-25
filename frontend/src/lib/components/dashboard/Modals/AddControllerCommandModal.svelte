<script lang="ts">
	import Select from '$lib/components/input/Select.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { ControllerButtons } from '$lib/models/types/controller';
	import { ObsControllerCommand } from '$lib/models/types/obsTypes';
	import { electronEmitter } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';

	export let open: boolean;

	const updatePayload = () => {
		switch (controllerCommand.command) {
			case 'SetCurrentProgramScene':
				controllerCommand.payload = {
					sceneName: '',
				};
				break;
			case 'ToggleInputMute':
				controllerCommand.payload = {
					inputName: '',
				};
				break;
			default:
				controllerCommand.payload = {};
				break;
		}
	};

	const addCommand = async () => {
		console.log('controllerCommand', controllerCommand);
		if (!controllerCommand) return;
		if (!Object.values(controllerCommand.inputs).some((input) => input)) return;
		$electronEmitter.emit('ObsControllerCommandAdd', controllerCommand);
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

	const filterKey = (key: string) => {
		const pattern = /is(.*?)Pressed/;
		const match = key.match(pattern);
		return match ? match[1] : key;
	};

	const getKeys = (): (keyof ControllerButtons)[] => {
		return Object.keys(controllerCommand.inputs) as (keyof ControllerButtons)[];
	};
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="max-h-[80vh] max-w-[800px] w-full h-full min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<h1 class="flex text-2xl font-bold text-white shadow-md">Button Combinations</h1>
		<div class="flex flex-col flex-1 overflow-scroll gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					{#each getKeys() as key}
						<div class="flex justify-between items-center gap-2">
							<h1 class="text-xl text-white">{filterKey(key)}</h1>
							<input
								type="checkbox"
								class="w-12 h-12"
								bind:checked={controllerCommand.inputs[key]}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<h1 class="text-2xl font-bold text-white shadow-md">Command</h1>
			<Select bind:selected={controllerCommand.command} on:change={updatePayload}>
				<option value="SaveReplayBuffer">Save Replay Buffer</option>
				<option value="SetCurrentProgramScene">Change Obs Scene</option>
				<option value="ToggleInputMute">Toggle Input Mute</option>
			</Select>
		</div>
		{#if controllerCommand.command === 'SetCurrentProgramScene'}
			<div
				class="flex flex-col gap-4"
				in:fly={{ duration: 250, x: -150, delay: 151 }}
				out:fly={{ duration: 150, x: -150 }}
			>
				<h1 class="text-2xl font-bold text-white shadow-md">Change Scene</h1>
				<TextInput
					bind:value={controllerCommand.payload.sceneName}
					placeholder="scene name"
				/>
			</div>
		{/if}
		{#if controllerCommand.command === 'ToggleInputMute'}
			<div
				class="flex flex-col gap-4"
				in:fly={{ duration: 250, x: -150, delay: 151 }}
				out:fly={{ duration: 150, x: -150 }}
			>
				<h1 class="text-2xl font-bold text-white shadow-md">Input Mute</h1>
				<TextInput
					bind:value={controllerCommand.payload.inputName}
					placeholder="input name"
				/>
			</div>
		{/if}
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
