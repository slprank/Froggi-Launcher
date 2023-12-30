<script lang="ts">
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { LiveStatsScene } from '$lib/models/enum';
	import {
		CustomCommands,
		CustomRequestOptions,
		ObsCommand,
		ObsCommandType,
		ObsRequestOptions,
		SceneCommand,
	} from '$lib/models/types/obsTypes';
	import { newId } from '$lib/utils/helper';
	import { electronEmitter } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';
	import { OBSRequestTypes } from 'obs-websocket-js/dist/types';

	export let open: boolean;

	let selectedScene: LiveStatsScene = LiveStatsScene.WaitingForDolphin;
	let sceneCommand: SceneCommand = {
		type: ObsCommandType.Obs,
		command: {
			id: newId(),
		} as ObsCommand<keyof (OBSRequestTypes | CustomCommands)>,
	};

	const addSceneOptions = () => {
		$electronEmitter.emit('ObsSceneSwitchAdd', selectedScene, sceneCommand);
		notifications.success('Scene Options Updated', 2000);
	};

	const handleCommandTypeChange = (
		e: CustomEvent<
			OBSRequestTypes[keyof OBSRequestTypes] | CustomCommands[keyof CustomCommands]
		>,
	) => {
		sceneCommand.command.payload = e.detail;
	};

	$: obsRequestOptions = Object.keys(ObsRequestOptions) as (keyof typeof ObsRequestOptions)[];

	$: customRequestOptions = Object.keys(
		CustomRequestOptions,
	) as (keyof typeof CustomRequestOptions)[];

	$: payloadOptions = Object.keys(sceneCommand?.command?.payload ?? {}) as (
		| keyof typeof ObsRequestOptions
		| keyof typeof CustomRequestOptions
	)[];
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="max-h-[80vh] max-w-[400px] w-screen h-full min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8 overflow-y-scroll"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<Select bind:selected={sceneCommand.type}>
			{#each Object.keys(ObsCommandType) as scene}
				<option value={scene}>
					{scene}
				</option>
			{/each}
		</Select>
		{#if sceneCommand.type === ObsCommandType.Obs}
			<Select on:change={handleCommandTypeChange}>
				{#each obsRequestOptions as option}
					<option value={ObsRequestOptions[option]}>
						{option}
					</option>
				{/each}
			</Select>
		{:else if sceneCommand.type === ObsCommandType.Custom}
			<Select on:change={handleCommandTypeChange}>
				{#each customRequestOptions as option}
					<option value={CustomRequestOptions[option]}>
						{option}
					</option>
				{/each}
			</Select>
		{/if}
		{#each payloadOptions as option}
			{#if typeof sceneCommand.command.payload[option] === 'string'}
				<TextInput bind:value={sceneCommand.command.payload[option]} label={option} />
			{/if}
			{#if typeof sceneCommand.command.payload[option] === 'number'}
				<NumberInput bind:value={sceneCommand.command.payload[option]} label={option} />
			{/if}
		{/each}
	</div>
</Modal>
