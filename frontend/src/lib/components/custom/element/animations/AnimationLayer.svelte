<script lang="ts">
	import type { GridContentItem } from '$lib/models/types/overlay';
	import {
		localEmitter,
		gameFrame,
		gameSettings,
		currentPlayer,
		currentPlayers,
		gameScore,
	} from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	import {
		currentPlayerInGameTrigger,
		inGameStateTrigger,
		player1InGameTrigger,
		player2InGameTrigger,
	} from './animationTriggers/InGameTriggers.svelte';
	import { rankStateTrigger } from './animationTriggers/RankChangeTriggers.svelte';
	import { matchStateTrigger } from './animationTriggers/MatchChangeTriggers.svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let edit: boolean = false;

	let key: number | undefined = 0;
	const updateKeyValue = (): number | undefined => {
		if (!dataItem) return;
		const option = dataItem.data.animationTrigger.selectedOptions;

		if (inGameStateTrigger(option, $gameSettings, $gameFrame)) return Math.random();
		if (currentPlayerInGameTrigger(option, $currentPlayer, $gameFrame)) return Math.random();
		if (player1InGameTrigger(option, $currentPlayers?.at(0), $gameFrame)) return Math.random();
		if (player2InGameTrigger(option, $currentPlayers?.at(1), $gameFrame)) return Math.random();
		if (matchStateTrigger(option, $gameScore)) return Math.random();
		if (rankStateTrigger(option, $currentPlayer)) return Math.random();

		return key;
	};

	const updateTriggerValues = () => {
		key = updateKeyValue();
	};

	$: $gameFrame, $currentPlayer, updateTriggerValues();

	onMount(() => {
		$localEmitter.on('TestAnimationTrigger', () => {
			const tempKey = key;
			key = Math.random();
			setTimeout(() => {
				key = tempKey;
			});
		});
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
