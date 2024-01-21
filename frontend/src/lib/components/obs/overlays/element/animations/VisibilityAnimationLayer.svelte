<script lang="ts">
	import type { GridContentItem } from '$lib/models/types/overlay';
	import {
		localEmitter,
		gameFrame,
		gameState,
		gameSettings,
		currentPlayers,
		currentPlayer,
		gameScore,
		postGame,
		recentGames,
		sessionStats,
	} from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	import { inGameVisibilityOption } from './visibilityConditions/InGameVisibilityOptions.svelte';
	import { inGamePlayer1VisibilityOption } from './visibilityConditions/InGamePlayer1VisibilityOptions.svelte';
	import { inGamePlayer2VisibilityOption } from './visibilityConditions/InGamePlayer2VisibilityOptions.svelte';
	import { postGameVisibilityOption } from './visibilityConditions/PostGameVisibilityOptions.svelte';
	import { postGame1SummaryVisibilityOption } from './visibilityConditions/PostGame1SummaryVisibilityOptions.svelte';
	import { postGame2SummaryVisibilityOption } from './visibilityConditions/PostGame2SummaryVisibilityOptions.svelte';
	import { postGame3SummaryVisibilityOption } from './visibilityConditions/PostGame3SummaryVisibilityOptions.svelte';
	import { postGame4SummaryVisibilityOption } from './visibilityConditions/PostGame4SummaryVisibilityOptions.svelte';
	import { postGame5SummaryVisibilityOption } from './visibilityConditions/PostGame5SummaryVisibilityOptions.svelte';
	import { sessionVisibilityOption } from './visibilityConditions/SessionVisibilityOptions.svelte';
	import { matchStatsVisibilityOption } from './visibilityConditions/MatchStatsVisibilityOptions.svelte';
	import { rankVisibilityOption } from './visibilityConditions/RankVisibilityOptions.svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let preview: boolean;
	export let edit: boolean = false;

	$: visible = true;
	const updateVisibilityValue = (dataItem: GridContentItem) => {
		if (edit || preview) return true;

		const options = dataItem.data.visibility.selectedOptions;

		return options.every((option) => {
			const inGameOptions = inGameVisibilityOption(
				option,
				$currentPlayers,
				$gameSettings,
				$gameFrame,
				$gameState,
			);
			const inGamePlayer1Options = inGamePlayer1VisibilityOption(
				option,
				$gameFrame,
				$currentPlayers,
			);
			const inGamePlayer2Options = inGamePlayer2VisibilityOption(
				option,
				$gameFrame,
				$currentPlayers,
			);
			const matchStatsOptions = matchStatsVisibilityOption(option, $gameScore);
			const postGameOptions = postGameVisibilityOption(
				option,
				$currentPlayers,
				$currentPlayer,
				$postGame,
			);
			const postGame1SummaryOptions = postGame1SummaryVisibilityOption(
				option,
				$currentPlayers,
				$currentPlayer,
				$recentGames,
			);
			const postGame2SummaryOptions = postGame2SummaryVisibilityOption(
				option,
				$currentPlayers,
				$currentPlayer,
				$recentGames,
			);
			const postGame3SummaryOptions = postGame3SummaryVisibilityOption(
				option,
				$currentPlayers,
				$currentPlayer,
				$recentGames,
			);
			const postGame4SummaryOptions = postGame4SummaryVisibilityOption(
				option,
				$currentPlayers,
				$currentPlayer,
				$recentGames,
			);
			const postGame5SummaryOptions = postGame5SummaryVisibilityOption(
				option,
				$currentPlayers,
				$currentPlayer,
				$recentGames,
			);
			const rankOptions = rankVisibilityOption(option, $currentPlayer);
			const sessionOptions = sessionVisibilityOption(option, $sessionStats);

			return (
				inGameOptions ||
				inGamePlayer1Options ||
				inGamePlayer2Options ||
				matchStatsOptions ||
				postGameOptions ||
				postGame1SummaryOptions ||
				postGame2SummaryOptions ||
				postGame3SummaryOptions ||
				postGame4SummaryOptions ||
				postGame5SummaryOptions ||
				rankOptions ||
				sessionOptions
			);
		});
	};

	$: {
		$gameState, $gameFrame, (visible = updateVisibilityValue(dataItem));
	}

	onMount(() => {
		if (!edit && !preview) return;
		$localEmitter.on('TestVisibilityTrigger', () => {
			visible = !visible;
		});
	});
</script>

{#if edit}
	<div class="w-full h-full absolute top-0 left-0">
		<slot />
	</div>
{:else if visible}
	<div class="w-full h-full" in:animationIn|local out:animationOut|local>
		<slot />
	</div>
{/if}
