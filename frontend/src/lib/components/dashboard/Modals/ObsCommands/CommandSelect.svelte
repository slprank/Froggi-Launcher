<script lang="ts">
	import {
		Command,
		CommandType,
		CustomCommands,
		CustomRequestOptions,
		ObsRequestOptions,
	} from '$lib/models/types/obsTypes';
	import Select from '$lib/components/input/Select.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import { OBSRequestTypes } from 'obs-websocket-js/dist/types';

	export let command: Command;

	const handleCommandTypeChange = (
		e: CustomEvent<
			OBSRequestTypes[keyof OBSRequestTypes] | CustomCommands[keyof CustomCommands]
		>,
	) => {
		command = { ...command, ...e.detail };
	};

	$: obsRequestOptions = Object.keys(ObsRequestOptions) as (keyof typeof ObsRequestOptions)[];

	$: customRequestOptions = Object.keys(
		CustomRequestOptions,
	) as (keyof typeof CustomRequestOptions)[];

	$: payloadOptions = Object.keys(command?.payload ?? {}) as (
		| keyof typeof ObsRequestOptions
		| keyof typeof CustomRequestOptions
	)[];
</script>

<Select bind:selected={command.type}>
	{#each Object.keys(CommandType) as scene}
		<option value={scene} selected={scene === CommandType.Obs}>
			{scene}
		</option>
	{/each}
</Select>
{#if command.type === CommandType.Obs}
	<Select on:change={handleCommandTypeChange}>
		{#each obsRequestOptions as option}
			<option
				value={{
					requestType: option,
					payload: ObsRequestOptions[option],
				}}
				selected={command.requestType === option}
			>
				{option}
			</option>
		{/each}
	</Select>
{:else if command.type === CommandType.Custom}
	<Select on:change={handleCommandTypeChange}>
		{#each customRequestOptions as option}
			<option value={CustomRequestOptions[option]} selected={command.requestType === option}>
				{option}
			</option>
		{/each}
	</Select>
{/if}
{#each payloadOptions as option}
	{#if typeof command.payload?.[option] === 'string'}
		<TextInput bind:value={command.payload[option]} label={option} />
	{/if}
	{#if typeof command.payload?.[option] === 'number'}
		<NumberInput bind:value={command.payload[option]} label={option} />
	{/if}
{/each}
