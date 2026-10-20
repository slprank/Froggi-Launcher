<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import { currentPlayer, gameFrame, teamNames } from '$lib/utils/store.svelte';
	import { teamDisplayName } from '$lib/utils/teams';
	import TextElement from '../element/TextElement.svelte';

	// Doubles + port elements. `players` = slot order [T1P1, T2P1, T1P2, T2P2] (or the element's chosen slot).
	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
	export let currentPlayers: Player[];
	export let allPlayers: Player[];

	const teamSlots = [[0, 2], [1, 3]];
	type Frame = typeof $gameFrame;
	const name = (team: 0 | 1, names: [string, string], all: Player[]) => teamDisplayName(names[team], teamSlots[team].map((s) => all[s]), `Team ${team + 1}`);
	const stocks = (team: 0 | 1, frame: Frame, all: Player[]) =>
		teamSlots[team].reduce((n, s) => n + (frame?.players?.[all[s]?.playerIndex ?? -1]?.post?.stocksRemaining ?? 0), 0);
	// Your team: the slot of the current player (connect code) — even slots are Team 1, odd slots Team 2.
	$: mySlot = allPlayers.findIndex((p) => $currentPlayer?.connectCode && p?.connectCode === $currentPlayer.connectCode);
	$: myTeam = (mySlot < 0 ? 0 : mySlot % 2) as 0 | 1;
	$: opponent = (myTeam === 0 ? 1 : 0) as 0 | 1;

	$: id = dataItem.elementId;
	const port = (p: Player | undefined) => (p ? `P${p.port ?? p.playerIndex + 1}` : '');
	// Editor placeholder: show the chosen slot's port so a doubles layout reads P1–P4.
	const SLOT_PORT: Record<string, string> = { t1p1: 'P1', t2p1: 'P2', t1p2: 'P3', t2p2: 'P4' };
	function textFor(id: CustomElement, frame: Frame, names: [string, string], all: Player[], mine: Player[], my: 0 | 1, opp: 0 | 1): string {
		switch (id) {
			case CustomElement.Player1Port: return defaultPreview ? SLOT_PORT[dataItem.data?.playerSlot ?? ''] ?? 'P1' : port(mine.at(0));
			case CustomElement.Player2Port: return defaultPreview ? SLOT_PORT[dataItem.data?.playerSlot ?? ''] ?? 'P2' : port(mine.at(1));
			case CustomElement.Team1Name: return defaultPreview ? 'Mango & Zain' : name(0, names, all);
			case CustomElement.Team2Name: return defaultPreview ? 'Cody & aMSa' : name(1, names, all);
			case CustomElement.Team1Stocks: return defaultPreview ? '8' : String(stocks(0, frame, all));
			case CustomElement.Team2Stocks: return defaultPreview ? '6' : String(stocks(1, frame, all));
			case CustomElement.CurrentPlayerTeamName: return defaultPreview ? 'Mango & Zain' : name(my, names, all);
			case CustomElement.OpponentTeamName: return defaultPreview ? 'Cody & aMSa' : name(opp, names, all);
			case CustomElement.CurrentPlayerTeamStocks: return defaultPreview ? '8' : String(stocks(my, frame, all));
			case CustomElement.OpponentTeamStocks: return defaultPreview ? '6' : String(stocks(opp, frame, all));
		}
		return '';
	}
	$: text = textFor(id, $gameFrame, $teamNames, allPlayers, currentPlayers, myTeam, opponent);
</script>

<TextElement {style} {dataItem}>{text}</TextElement>
