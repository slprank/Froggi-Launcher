<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { sessionStats } from '$lib/utils/store.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: wins =
		$sessionStats && $sessionStats.currentRankStats.wins - $sessionStats.startRankStats.wins;
	$: losses =
		$sessionStats &&
		$sessionStats.currentRankStats.losses - $sessionStats.startRankStats.losses;
	$: numberOfGames = (wins ?? 0) + (losses ?? 0);
	$: rating =
		$sessionStats &&
		$sessionStats.currentRankStats.rating - $sessionStats.startRankStats.rating;
</script>

{#if dataItem?.elementId === CustomElement.SessionWins}
	<TextElement {style} {dataItem}>
		{wins ? `${wins}` : defaultPreview ? `13` : '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SessionLosses}
	<TextElement {style} {dataItem}>
		{losses ? `${losses}` : defaultPreview ? `7` : '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SessionGameNumber}
	<TextElement {style} {dataItem}>
		{numberOfGames ? `${numberOfGames}` : defaultPreview ? `20` : '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SessionRating}
	<TextElement {style} {dataItem}>
		{rating ? `${rating > 0 ? '+' : ''}${rating.toFixed(1)}` : defaultPreview ? `+130` : '+0'}
	</TextElement>
{/if}
