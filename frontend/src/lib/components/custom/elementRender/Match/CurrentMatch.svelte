<script lang="ts">
	import { CustomElement } from "$lib/models/constants/customElement";
	import { BestOf } from "$lib/models/enum";
	import { GridContentItem, GridContentItemStyle } from "$lib/models/types/overlay";
	import { currentPlayers, gameScore, gameSettings, statsScene } from "$lib/utils/store.svelte";
    import TextElement from "../../element/TextElement.svelte";

    export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	let bestOf = $gameSettings?.matchInfo?.bestOf ?? BestOf.BestOf3;
	let player1Tag = $currentPlayers.at(0)?.displayName ?? "";
	let player2Tag = $currentPlayers.at(1)?.displayName ?? "";
	let player1Score = $gameScore.at(0) ?? 0;
	let player2Score = $gameScore.at(1) ?? 0;
</script>

{#if dataItem?.elementId === CustomElement.MatchBestOf}
	<TextElement {style} {dataItem}>
		{defaultPreview ? BestOf.BestOf3 : bestOf ?? BestOf.BestOf3}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer1Tag}
	<TextElement {style} {dataItem}>
		{defaultPreview ? "Player1" : player1Tag ?? ""}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer2Tag}
	<TextElement {style} {dataItem}>
		{defaultPreview ? "Player2" : player2Tag ?? ""}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer1Score}
	<TextElement {style} {dataItem}>
		{defaultPreview ? 2 : player1Score ?? 0}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer2Score}
	<TextElement {style} {dataItem}>
		{defaultPreview ? 1 : player2Score ?? 0}
	</TextElement>
{/if}