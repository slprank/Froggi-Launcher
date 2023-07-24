<script lang="ts">
	export let min = 0;
	export let max = 1;
	export let step = 0.01;
	export let value: number = 0;
	export let valueConcat: string = '';
	export let stringFormat: string = '{0}';
	export let label: string | undefined = undefined;

	if (!String.format) {
		String.format = function (format) {
			var args = Array.prototype.slice.call(arguments, 1);
			return format.replace(/{(\d+)}/g, function (match, number) {
				return typeof args[number] != 'undefined' ? args[number] : match;
			});
		};
	}

	const updateConcatValue = (value: number) => {
		valueConcat = String.format(stringFormat, value);
	};
	$: updateConcatValue(value);

	$: console.log(value, valueConcat);
</script>

<div>
	{#if label}
		<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
	{/if}
	<div class="h-10 flex items-center">
		<input
			type="range"
			class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 dark:text-white"
			{step}
			{min}
			{max}
			bind:value
		/>
	</div>
</div>
