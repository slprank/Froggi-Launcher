<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type {
		GameStartTypeExtended,
		GameStats,
		MatchInfoExtended,
	} from '$lib/models/types/slippiData';
	import { currentPlayers, electronEmitter, recentGames } from '$lib/utils/store.svelte';
	import { Stage } from '$lib/models/constants/stageData';
	import { Character } from '$lib/models/enum';
	import { CHARACTERS_EXTERNAL_INTERNAL } from '$lib/models/constants/characterData';
	import {
		PlayerType,
		PostFrameUpdateType,
		PreFrameUpdateType,
	} from '@slippi/slippi-js/dist/types';
	import GameStage from './GameStage.svelte';
	import CharacterIcon from './CharacterIcon.svelte';
	import Select from '$lib/components/input/Select.svelte';

	export let open: boolean;
	export let selectedGameIndex: number;

	let confirmModalOpen = false;

	let game: GameStats = {
		gameEnd: {
			gameEndMethod: 2,
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
				timerType: 2,
				stageId: Stage.BATTLEFIELD,
				startingTimerSeconds: 480,
			} as GameStartTypeExtended),
		timestamp: null,
	};

	const handleStockChange = (playerIndex: number, stockNumber: number) => {
		if (!game.lastFrame?.players?.[playerIndex]) return;
		game.lastFrame.players[playerIndex]!.post.stocksRemaining = stockNumber;
	};

	const handleCharacterChange = (playerIndex: number, event: CustomEvent<Character>) => {
		const characterId = Number(event.detail);
		if (!game.settings?.players?.[playerIndex] || !game.lastFrame?.players?.[playerIndex])
			return;
		game.settings.players[playerIndex].characterId = characterId;
		game.lastFrame.players[playerIndex]!.post.internalCharacterId =
			CHARACTERS_EXTERNAL_INTERNAL[characterId];
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
		class="w-[600px] h-[80vh] min-w-lg flex flex-col gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8 overflow-scroll"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="flex gap-4 justify-center items-center">
			<h1 class="text-white text-3xl font-semibold">Add Game</h1>
		</div>
		<div class="flex justify-between gap-4">
			<h1 class="text-white text-2xl font-semibold">Player1</h1>
			<h1 class="text-white text-2xl font-semibold">Player2</h1>
		</div>
		<div class="flex justify-between gap-4">
			<h1 class="text-white text-2xl font-semibold">
				{$currentPlayers.at(0)?.displayName ?? ''}
			</h1>
			<h1 class="text-white text-2xl font-semibold">
				{$currentPlayers.at(1)?.displayName ?? ''}
			</h1>
		</div>
		<div class="flex gap-4 justify-center items-center">
			<h1 class="text-white text-2xl font-semibold">Character</h1>
		</div>
		<div class="flex justify-between gap-4">
			<Select
				on:change={(e) => handleCharacterChange($currentPlayers.at(0)?.playerIndex ?? 0, e)}
				label={`${$currentPlayers.at(0)?.displayName ?? 'Player1 Character'}`}
			>
				{#each Object.entries(Character).filter(([_, name]) => typeof name === 'string') as [id, name]}
					<option value={id}>{name}</option>
				{/each}
			</Select>
			<Select
				on:change={(e) => handleCharacterChange($currentPlayers.at(1)?.playerIndex ?? 1, e)}
				label={`${$currentPlayers.at(1)?.displayName ?? 'Player2 Character'}`}
			>
				{#each Object.entries(Character).filter(([_, name]) => typeof name === 'string') as [id, name]}
					<option value={id}>{name}</option>
				{/each}
			</Select>
		</div>
		<div class="flex gap-4 justify-center items-center">
			<h1 class="text-white text-2xl font-semibold">Stocks</h1>
		</div>
		<div class="flex justify-between gap-18">
			<div class="flex gap-2">
				{#each [...Array(4).keys()].reverse() as stock}
					<button
						class={`${
							(game?.lastFrame?.players[$currentPlayers.at(0)?.playerIndex ?? 0]?.post
								.stocksRemaining ?? 0) > stock
								? 'opacity-100'
								: 'opacity-50'
						} h-10`}
						on:click={() => {
							handleStockChange($currentPlayers.at(0)?.playerIndex ?? 0, stock + 1);
						}}
					>
						<CharacterIcon
							characterId={game?.settings?.players[
								$currentPlayers.at(0)?.playerIndex ?? 0
							]?.characterId ?? 0}
						/>
					</button>
				{/each}
				<button
					class="transition duration-100 w-14 p-2 rounded-md justify-center bg-black border border-white bg-opacity-40 hover:bg-opacity-60"
					on:click={() => {
						handleStockChange($currentPlayers.at(0)?.playerIndex ?? 0, 0);
					}}
				>
					<h1 class="text-white text-shadow-md">None</h1>
				</button>
			</div>
			<div class="flex gap-2">
				<button
					class="transition duration-100 w-14 p-2 rounded-md justify-center bg-black border border-white bg-opacity-40 hover:bg-opacity-60"
					on:click={() => {
						handleStockChange($currentPlayers.at(1)?.playerIndex ?? 1, 0);
					}}
				>
					<h1 class="text-white text-shadow-md">None</h1>
				</button>
				{#each [...Array(4).keys()] as stock}
					<button
						class={`${
							(game?.lastFrame?.players[$currentPlayers.at(1)?.playerIndex ?? 1]?.post
								.stocksRemaining ?? 0) > stock
								? 'opacity-100'
								: 'opacity-50'
						} h-10`}
						on:click={() => {
							handleStockChange($currentPlayers.at(1)?.playerIndex ?? 1, stock + 1);
						}}
					>
						<CharacterIcon
							characterId={game?.settings?.players[
								$currentPlayers.at(1)?.playerIndex ?? 1
							]?.characterId ?? 0}
						/>
					</button>
				{/each}
			</div>
		</div>
		<div class="relative aspect-video w-full">
			<GameStage
				stageId={game?.settings?.stageId}
				class="aspect-video rounded-md"
				objectFit="cover"
			/>
		</div>
	</div>
</Modal>

<ConfirmModal bind:open={confirmModalOpen} on:confirm={handleAddGame}>Delete Game?</ConfirmModal>
