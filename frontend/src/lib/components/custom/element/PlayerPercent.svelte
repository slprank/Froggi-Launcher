<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import type { GridContentItem } from '$lib/models/types';
	import type { PreFrameUpdateType } from '@slippi/slippi-js';
	import { fade, fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	export let classValue: string;
	export let cssValue: string;
	export let dataItem: GridContentItem;
	export let edit: boolean;
	export let shadow: string;

	export let frame: PreFrameUpdateType | undefined;
	export let numberOfDecimals: number;

	$: decimals = (): string | undefined =>
		numberOfDecimals
			? frame?.percent?.toFixed(numberOfDecimals).split('.').at(1) ?? '0'
			: undefined;
</script>

{#key frame?.percent?.toFixed()}
	<div class={`w-full h-full ${edit ? 'no-transition' : ''}`}>
		<TextFitMulti
			class={`h-full ${classValue} justify-end`}
			style={`${shadow}; ${cssValue}; ${
				dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
			};  ${edit ? 'color: black' : ''}`}
			maxFont={1000}
		>
			{#if !numberOfDecimals}
				<span class="mr-[.3em]">
					{`${frame?.percent?.toFixed() ?? 0}`}
					<span class="text-[80%] mx-[-.3em]">%</span>
				</span>
			{/if}
			{#if numberOfDecimals}
				<span class="mr-[.4em]">
					{`${frame?.percent?.toFixed() ?? 0}`}
					<span class="text-[45%] mx-[-.7em]">
						{`${numberOfDecimals ? `.${decimals()}` : ''}%`}
					</span>
				</span>
			{/if}
		</TextFitMulti>
	</div>
{/key}
