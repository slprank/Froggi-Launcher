<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type {
		GameStartTypeExtended,
		GameStats,
		MatchInfoExtended,
	} from '$lib/models/types/slippiData';
	import { electronEmitter, recentGames } from '$lib/utils/store.svelte';
	import {
		GameEndMethod,
		PlayerType,
		PostFrameUpdateType,
		PreFrameUpdateType,
		TimerType,
	} from '@slippi/slippi-js';
	import { Stage } from '$lib/models/constants/stageData';
	import { Character } from '$lib/models/enum';
	import { CHARACTERS_EXTERNAL_INTERNAL } from '$lib/models/constants/characterData';

	export let open: boolean;
	export let selectedGameIndex: number;

	let confirmModalOpen = false;

	let game: GameStats = {
		gameEnd: {
			gameEndMethod: GameEndMethod.GAME,
			lrasInitiatorIndex: -1,
			placements: [
				{ playerIndex: 0, position: 0 },
				{ playerIndex: 1, position: 1 },
			],
		},
		isMock: true,
		lastFrame: {
			frame: 0,
			followers: [],
			players: {
				[0]: {
					pre: {} as PreFrameUpdateType,
					post: {
						playerIndex: 0,
						internalCharacterId: CHARACTERS_EXTERNAL_INTERNAL[Character.Falcon],
						stocksRemaining: 1,
					} as PostFrameUpdateType,
				},
				[1]: {
					pre: {} as PreFrameUpdateType,
					post: {
						playerIndex: 1,
						internalCharacterId: CHARACTERS_EXTERNAL_INTERNAL[Character.Falcon],
						stocksRemaining: 1,
					} as PostFrameUpdateType,
				},
				[2]: null,
				[3]: null,
			},
		},
		postGameStats: null,
		score: [0, 0],
		settings:
			$recentGames.at(-1)?.at(-1)?.settings ??
			({
				players: [
					{
						playerIndex: 0,
						characterId: Character.Falcon,
						startStocks: 4,
						characterColor: 0,
					},
					{
						playerIndex: 1,
						characterId: Character.Falcon,
						startStocks: 4,
						characterColor: 0,
					},
				] as PlayerType[],
				matchInfo: {} as MatchInfoExtended,
				timerType: TimerType.DECREASING,
				stageId: Stage.BATTLEFIELD,
				startingTimerSeconds: 480,
			} as GameStartTypeExtended),
		timestamp: null,
	};

	const addGame = () => {
		confirmModalOpen = true;
	};

	const handleAddGame = () => {
		open = false;
		$electronEmitter.emit('RecentGamesMock', game, selectedGameIndex);
	};
</script>

<Modal
	bind:open
	on:close={() => (open = false)}
	class="w-[95vw] max-w-[600px] max-h-[80vh] min-w-72 flex justify-center"
>
	<div
		class="w-full max-h-[80vh] min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	/>
</Modal>

<ConfirmModal bind:open={confirmModalOpen} on:confirm={handleAddGame}>Delete Game?</ConfirmModal>
