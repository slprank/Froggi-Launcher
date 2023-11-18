<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { sessionStats } from '$lib/utils/store.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: wins = $sessionStats.currentRankStats.wins - $sessionStats.startRankStats.wins;
	$: losses = $sessionStats.currentRankStats.losses - $sessionStats.startRankStats.losses;
	$: numberOfGames = wins + losses;
	$: rating = $sessionStats.currentRankStats.rating - $sessionStats.startRankStats.rating;
</script>

{#if dataItem?.elementId === CustomElement.SessionWins}
	<TextElement {style} {dataItem}>
		{wins ? `${wins}` : defaultPreview ? `13` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SessionLosses}
	<TextElement {style} {dataItem}>
		{losses ? `${losses}` : defaultPreview ? `7` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SessionGameNumber}
	<TextElement {style} {dataItem}>
		{numberOfGames ? `${numberOfGames}` : defaultPreview ? `20` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SessionRating}
	<TextElement {style} {dataItem}>
		{rating ? `${rating}` : defaultPreview ? `13` : ''}
	</TextElement>
{/if}
