<script lang="ts">
	import type { GridContentItem } from '$lib/models/types/overlay';
	import {
		localEmitter,
		gameFrame,
		gameSettings,
		currentPlayer,
		currentPlayers,
		gameScore,
		sessionStats,
	} from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	import {
		currentPlayerInGameTrigger,
		inGameStateTrigger,
		player1InGameTrigger,
		player2InGameTrigger,
	} from '$lib/components/obs/overlays/element/animations/animationTriggers/InGameStateTriggers';
	import { rankStateTrigger } from '$lib/components/obs/overlays/element/animations/animationTriggers/RankChangeTriggers';
	import { matchStateTrigger } from '$lib/components/obs/overlays/element/animations/animationTriggers/MatchChangeTriggers';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import { cloneDeep } from 'lodash';
	import {
		CurrentPlayer,
		GameStartTypeExtended,
		Player,
		SessionStats,
	} from '$lib/models/types/slippiData';
	import { sessionStatsTrigger } from './animationTriggers/SessionStatsTriggers';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let edit: boolean = false;

	let key: number | undefined = 0;
	let prevGameFrame: FrameEntryType | null | undefined;
	let prevScore: number[] | undefined;
	let prevPlayer: CurrentPlayer | undefined;
	let prevPlayers: Player[] | undefined;
	let prevSettings: GameStartTypeExtended | undefined;
	let prevSessionStats: SessionStats | undefined;
	const updateKeyValue = (): number | undefined => {
		if (!dataItem) return;
		const option = dataItem.data.animationTrigger.selectedOptions;

		if (inGameStateTrigger(option, $gameSettings, $gameFrame, prevGameFrame))
			return Math.random();
		if (currentPlayerInGameTrigger(option, $currentPlayer, $gameFrame, prevGameFrame))
			return Math.random();
		if (player1InGameTrigger(option, $currentPlayers?.at(0), $gameFrame, prevGameFrame))
			return Math.random();
		if (player2InGameTrigger(option, $currentPlayers?.at(1), $gameFrame, prevGameFrame))
			return Math.random();
		if (
			matchStateTrigger(
				option,
				$currentPlayers,
				prevPlayers,
				$gameScore,
				prevScore,
				$gameSettings,
				prevSettings,
			)
		)
			return Math.random();
		if (rankStateTrigger(option, $currentPlayer.rank, prevPlayer?.rank)) return Math.random();
		if (sessionStatsTrigger(option, $sessionStats, prevSessionStats)) return Math.random();

		return key;
	};

	const updateTriggerValues = () => {
		key = updateKeyValue();
		prevGameFrame = cloneDeep($gameFrame);
		prevScore = cloneDeep($gameScore);
		prevSettings = cloneDeep($gameSettings);
		prevPlayer = cloneDeep($currentPlayer);
		prevPlayers = cloneDeep($currentPlayers);
		prevSessionStats = cloneDeep($sessionStats);
	};

	$: $gameFrame, $currentPlayer, $gameSettings, $sessionStats, updateTriggerValues();

	onMount(() => {
		const handler = () => {
			const tempTrigger = key;
			key = Math.random();
			setTimeout(() => {
				key = tempTrigger;
			});
		};

		$localEmitter.on('TestAnimationTrigger', handler);

		return () => {
			$localEmitter.off('TestAnimationTrigger', handler);
		};
	});
</script>

{#if edit}
	<div class="w-full h-full absolute top-0 left-0">
		<slot />
	</div>
{:else}
	{#key key}
		<div
			class="w-full h-full absolute top-0 left-0"
			in:animationIn|local
			out:animationOut|local
		>
			<slot />
		</div>
	{/key}
{/if}
