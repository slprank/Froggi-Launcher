<script lang="ts">
	import { CustomElement } from "$lib/models/constants/customElement";
	import { BestOf } from "$lib/models/enum";
	import { GridContentItem, GridContentItemStyle } from "$lib/models/types/overlay";
	import { currentPlayers, gameScore, gameSettings } from "$lib/utils/store.svelte";
    import TextElement from "../../element/TextElement.svelte";

    export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.MatchBestOf}
	<TextElement {style} {dataItem}>
		{defaultPreview ? BestOf.BestOf3 : $gameSettings?.matchInfo?.bestOf ?? BestOf.BestOf3}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer1Tag}
	<TextElement {style} {dataItem}>
		{defaultPreview ? "Player1" : $currentPlayers.at(0)?.displayName ?? ""}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer2Tag}
	<TextElement {style} {dataItem}>
		{defaultPreview ? "Player2" : $currentPlayers.at(1)?.displayName ?? ""}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer1Score}
	<TextElement {style} {dataItem}>
		{defaultPreview ? 2 : $gameScore ?? 0}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.MatchPlayer2Score}
	<TextElement {style} {dataItem}>
		{defaultPreview ? 1 : $gameScore ?? 0}
	</TextElement>
{/if}