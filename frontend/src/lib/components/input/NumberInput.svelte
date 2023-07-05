<script lang="ts">
	export let value: number;
	export let label: string | undefined = undefined;
	export let min: number = 0;
	export let max: number = 100;
	export let autofocus: number | undefined = undefined;
	export let autoFocusValue: number | undefined = undefined;

	const revertToMax = () => {
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
	<div class="relative w-20 h-11 bg-white rounded-md">
		<input
			on:focus={() => (autofocus = autoFocusValue)}
			autofocus={!!autofocus && autofocus === autoFocusValue}
			type="number"
			class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
			id="numberInput"
			step={max / 100}
			{min}
			{max}
			bind:value
		/>
	</div>
{/key}
