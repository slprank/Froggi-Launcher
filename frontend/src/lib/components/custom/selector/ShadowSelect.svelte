<script lang="ts">
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import type { Shadow } from '$lib/models/types';

	export let label: string | undefined = undefined;

	export let value: Shadow = {
		x: 0,
		y: 0,
		spread: 0,
		color: '#000000',
	};
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}

{#if value}
	<div class="grid gap-2">
		<div>
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Shift Horizontal</h1>
			<div class="grid grid-flow-col gap-2 justify-center items-center">
				<NumberInput bind:value={value.x} min={-50} max={50} />
				<h1 class="text-gray-500 text-sm font-medium text-shadow w-12">
					{value?.x ?? 0}px
				</h1>
			</div>
		</div>
		<div>
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Shift Vertical</h1>
			<div class="grid grid-flow-col gap-2 justify-center items-center">
				<NumberInput bind:value={value.y} min={-50} max={50} />
				<h1 class="text-gray-500 text-sm font-medium text-shadow w-12">
					{value?.y ?? 0}px
				</h1>
			</div>
		</div>
		<div>
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Spread</h1>
			<div class="grid grid-flow-col gap-2 justify-center items-center">
				<NumberInput bind:value={value.spread} min={0} max={50} />
				<h1 class="text-gray-500 text-sm font-medium text-shadow w-12">
					{value?.spread ?? 0}px
				</h1>
			</div>
		</div>
		<ColorInput bind:value={value.color} label={'Color'} />
	</div>
{/if}
