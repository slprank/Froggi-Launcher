<script lang="ts">
	import { isNil } from 'lodash';

	export let autofocus: number | undefined = undefined;
	export let autoFocusValue: number | undefined = undefined;
	export let label: string | undefined = undefined;
	export let max: number = 100;
	export let min: number = 0;
	export let value: number | null;
	export let valueConcat: string = '';
	export let step: number | undefined = undefined;
	export let stringFormat: string = '{0}';

	const updateConcatValue = (value: number | null) => {
		if (isNil(value)) return;
		valueConcat = String.format(stringFormat, value);
	};
	$: updateConcatValue(value);

	const revertToMax = () => {
		if (isNil(value)) return;
		if (value > max) {
			value = max;
		}
	};
	$: value, revertToMax();
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}

{#key autofocus}
	<div class="w-full h-11 bg-white rounded-md">
		<input
			on:focus={() => (autofocus = autoFocusValue)}
			autofocus={!!autofocus && autofocus === autoFocusValue}
			type="number"
			class="bg-white w-full h-full px-2 rounded border-0 bg-transparent dark:bg-gray-700 dark:text-white"
			id="numberInput"
			step={step ?? 1}
			{min}
			{max}
			bind:value
		/>
	</div>
{/key}
