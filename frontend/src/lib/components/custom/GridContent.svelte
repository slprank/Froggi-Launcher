<script lang="ts">
	import { CustomElement, Transition } from '$lib/models/enum';
	import type { GridContentItem, Shadow } from '$lib/models/types';
	import { fade, fly, scale, slide, blur as blur_ } from 'svelte/transition';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { COL, ROW } from '$lib/models/const';

	export let dataItem: GridContentItem | undefined = undefined;
	export let additionalDelay: number = 0;
	export let edit: boolean = false;
	export let preview: boolean = false;
	export let selectedId: string | undefined = undefined;
	export let transition: Transition = Transition.None;
	export let duration: number = 250;

	export let demoItem: GridContentItem | undefined = undefined;

	function updateDemoData() {
		if (demoItem) dataItem = demoItem;
	}
	$: demoItem, updateDemoData();

	$: classValue = Object.entries(dataItem?.data.class ?? {})
		.map(([_, value]) => `${value}`)
		.join(' ');

	$: cssValue = Object.entries(dataItem?.data.css ?? {})
		.map(([key, value]) => `${toKebabCase(key)}: ${value}`)
		.join('; ');

	$: shadow = `filter: drop-shadow(${dataItem?.data.shadow?.x ?? 0}px ${
		dataItem?.data.shadow?.y ?? 0
	}px ${dataItem?.data.shadow?.spread - 1 ?? 0}px ${dataItem?.data.shadow?.color ?? '#000000'});`;

	function toKebabCase(str: string) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	const animate = (node: Element) => {
		if (!preview || edit || !dataItem) return;
		const delay =
			dataItem[COL]?.y +
				Math.abs(dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) +
				additionalDelay ?? 0;
		const y = ((dataItem[COL]?.y + dataItem[COL]?.h / 2 - ROW / 2) / ROW) * 50;
		const x = ((dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) / COL) * 50;
		switch (transition) {
			case Transition.None:
				return;
			case Transition.Fade:
				return fade(node, { duration: duration, delay: delay });
			case Transition.Fly:
				return fly(node, { duration: duration, x: x, y: y, delay: delay });
			case Transition.Scale:
				return scale(node, { duration: duration, delay: delay });
			case Transition.Slide:
				return slide(node, { duration: duration, delay: delay });
			case Transition.Blur:
				return blur_(node, { duration: duration, delay: delay });
		}
	};

	// TODO: Add remaining components
	// TODO: Use live data
	// TODO: Add custom font support
</script>

{#key dataItem}
	<div
		style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customParent : ''};`}
		class={`custom-font h-full w-full ${edit ? 'bg-white' : 'text-white'} ${
			selectedId && selectedId === dataItem?.id ? 'border border-red-500' : ''
		} bg-opacity-50`}
		in:animate
	>
		{#if dataItem?.elementId === CustomElement.CustomString}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${shadow}; ${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
				}; ${edit ? 'color: black;' : ''}`}
				maxFont={1000}
			>
				{dataItem?.data.string}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId === CustomElement.CustomBox}
			<div
				class={`w-full h-full ${classValue}`}
				style={`${shadow}; ${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
				}; `}
			/>
		{/if}
		{#if dataItem?.elementId === CustomElement.CustomImage}
			<div
				class={`w-full h-full ${classValue}`}
				style={`${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
				}; `}
			>
				<img
					class="w-full h-full"
					style={`${shadow}; object-fit: ${dataItem?.data.image.objectFit ?? 'contain'};
					${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
					src={dataItem?.data.image.src}
					alt="custom"
				/>
			</div>
		{/if}
		{#if dataItem?.elementId === CustomElement.Player1Tag}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${shadow}; ${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
				};  ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`Player1`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId === CustomElement.Player2Tag}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${shadow}; ${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
				};  ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`Player2`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId === CustomElement.Player1Score}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${shadow}; ${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
				};  ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`1`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId === CustomElement.Player2Score}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${shadow}; ${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
				};  ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`0`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId === CustomElement.Player1RankIcon}
			<div
				class={`w-full h-full ${classValue}`}
				style={`${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
				}; `}
			>
				<img
					class="w-full h-full object-contain"
					style={`${shadow}; ${
						dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''
					};`}
					src="/image/rank-icons/GOLD 3.svg"
					alt="rank-icon"
				/>
			</div>
		{/if}
		{#if dataItem?.elementId === CustomElement.Player2RankIcon}
			<div
				class={`w-full h-full ${classValue}`}
				style={`${cssValue}; ${
					dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
				}; `}
			>
				<img
					class="w-full h-full object-contain"
					style={`${shadow}; ${
						dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''
					};`}
					src="/image/rank-icons/SILVER 3.svg"
					alt="rank-icon"
				/>
			</div>
		{/if}
	</div>
{/key}
