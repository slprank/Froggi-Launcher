<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { gameFrame, gameScore, gameSettings } from '$lib/utils/store.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	const getTimeSeconds = (
		startingTimer: number | null | undefined,
		frame: number | undefined,
	): number => {
		if (!startingTimer) return 480;
		if (!frame || frame <= 0) return startingTimer;
		return startingTimer - frame / 60;
	};

	const addZero = (time: number) => {
		return `${time < 10 ? '0' : ''}${time}`;
	};
</script>

{#if dataItem?.elementId === CustomElement.InGameTimerMinutes}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? '08'
			: addZero(
					Math.floor(
						getTimeSeconds($gameSettings?.startingTimerSeconds, $gameFrame?.frame) / 60,
					),
			  )}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGameTimerSeconds}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? '00'
			: addZero(
					Math.floor(
						getTimeSeconds($gameSettings?.startingTimerSeconds, $gameFrame?.frame) % 60,
					),
			  )}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGameTimerMilliseconds3}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? '000'
			: getTimeSeconds($gameSettings?.startingTimerSeconds, $gameFrame?.frame)
					.toFixed(3)
					.split('.')
					.at(1)}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGameTimerMilliseconds2}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? '00'
			: getTimeSeconds($gameSettings?.startingTimerSeconds, $gameFrame?.frame)
					.toFixed(2)
					.split('.')
					.at(1)}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGameTimerMilliseconds1}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? '0'
			: getTimeSeconds($gameSettings?.startingTimerSeconds, $gameFrame?.frame)
					.toFixed(1)
					.split('.')
					.at(1)}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGameTimerSecondsCountdown}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? '480'
			: Math.ceil(
					getTimeSeconds($gameSettings?.startingTimerSeconds, $gameFrame?.frame),
			  ).toFixed(0)}
	</TextElement>
{/if}
