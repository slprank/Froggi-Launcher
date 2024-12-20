<script lang="ts">
	import { cloneDeep, isNil } from 'lodash';
	import { createEventDispatcher } from 'svelte';

	export let label: string | undefined = undefined;
	export let max: number = 100;
	export let min: number = 0;
	export let value: number | null;
	export let valueConcat: string = '';
	export let step: number | undefined = undefined;
	export let stringFormat: string = '{0}';

	$: tempValue = cloneDeep(value) ?? 0;

	const dispatch = createEventDispatcher();

	const fixValue = () => {
		if (tempValue > max) {
			value = max;
			tempValue = max;
		}
		if (tempValue < min) {
			value = min;
			tempValue = min;
		}
		value = tempValue;
		valueConcat = String.format(stringFormat, value);
		dispatch('change', value);
	};
	$: tempValue, fixValue();
</script>

<div class="w-full">
	{#if label}
		<h1 class="text-gray-500 text-sm font-medium text-shadow m-0">{label}</h1>
	{/if}
	<div class="w-full h-11 bg-white rounded-md">
		<input
			type="number"
			class="bg-white w-full h-full px-2 rounded border-0 bg-transparent dark:bg-gray-700 dark:text-white"
			id="numberInput"
			step={step ?? 1}
			{min}
			{max}
			bind:value={tempValue}
		/>
	</div>
</div>
