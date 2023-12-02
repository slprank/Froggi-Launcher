<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { GameStats, Player } from '$lib/models/types/slippiData';
	import { currentPlayers, gameSettings, recentGames } from '$lib/utils/store.svelte';
	import { reverse } from 'lodash';
	import CharacterIcon from './CharacterIcon.svelte';
	import GameStage from './GameStage.svelte';

	export let open: boolean;
	let addGameModalOpen = false;
	let deleteGameModalOpen = false;
	let selectedGameIndex = 0;

	let games: GameStats[][] = $recentGames;
	const updateGames = (recentGames: GameStats[][]) => {
		games = recentGames;
	};
	$: updateGames($recentGames);

	const addGame = (gameIndex: number) => {
		console.log('add game', games);
		selectedGameIndex = gameIndex;
		addGameModalOpen = true;
	};

	const deleteGame = (gameIndex: number) => {
		console.log('delete game', games);
		selectedGameIndex = gameIndex;
		deleteGameModalOpen = true;
	};

	const handleDelete = () => {
		console.log('deleting');
	};

	const handleReset = () => {
		console.log('reset');
	};

	const updateScore = () => {
		console.log('updateScore', games);
		open = false;
	};

	$: console.log('games', games);
</script>

<Modal
	bind:open
	on:close={() => (open = false)}
	class="w-[95vw] max-w-[600px] max-h-[80vh] min-w-72 flex justify-center"
>
	<div
		class="w-full max-h-[80vh] min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="flex gap-4 justify-center items-center">
			<h1 class="text-white text-3xl font-semibold">Games</h1>
		</div>
		<div class="flex justify-between gap-4">
			<h1 class="text-white text-2xl font-semibold">
				{$currentPlayers.at(0)?.displayName ?? 'Player1'}
			</h1>
			<h1 class="text-white text-2xl font-semibold">
				{$currentPlayers.at(1)?.displayName ?? 'Player2'}
			</h1>
		</div>
		<div
			class="flex-l flex flex-col items-center overflow-scroll gap-4 border-2 border-gray-700 rounded-md p-2"
		>
			<button
				class="transition duration-100 rounded-md w-full justify-center bg-black border border-white hover:scale-[1.02] bg-opacity-40 hover:bg-opacity-60"
				on:click={async () => {
					addGame(0);
				}}
			>
				<h1 class="text-white text-shadow-md">+</h1>
			</button>
			{#each games
				.map((game) => game.at(-1))
				.slice()
				.reverse() as game, i}
				<h1 class="text-white text-shadow-md text-center text-xl font-semibold">
					Game {i + 1}
				</h1>
				<div class="flex justify-center items-center gap-2">
					{#each [...Array(4).keys()].reverse() as stock}
						<div
							class={`${
								(game?.lastFrame.players[$currentPlayers.at(0)?.playerIndex ?? 0]
									?.post.stocksRemaining ?? 0) > stock
									? 'opacity-100'
									: 'opacity-50'
							} h-12`}
						>
							<CharacterIcon
								characterId={game?.settings?.players[
									$currentPlayers.at(0)?.playerIndex ?? 0
								]?.characterId ?? 0}
							/>
						</div>
					{/each}

					<div class="relative aspect-video h-16">
						<img
							src="/image/button-icons/cross.png"
							alt="delete"
							class="cover absolute aspect-video"
						/>
						<button
							class="transition duration-300 hover:opacity-25 absolute"
							on:click={() => deleteGame(i)}
						>
							<GameStage
								stageId={game?.settings?.stageId}
								class="aspect-video rounded-md"
								objectFit="cover"
							/>
						</button>
					</div>
					{#each [...Array(4).keys()] as stock}
						<div
							class={`${
								(game?.lastFrame.players[$currentPlayers.at(1)?.playerIndex ?? 0]
									?.post.stocksRemaining ?? 0) > stock
									? 'opacity-100'
									: 'opacity-50'
							} h-12`}
						>
							<CharacterIcon
								characterId={game?.settings?.players[
									$currentPlayers.at(1)?.playerIndex ?? 0
								]?.characterId ?? 0}
							/>
						</div>
					{/each}
				</div>

				<button
					class="transition duration-100 w-full rounded-md justify-center bg-black border border-white hover:scale-[1.02] bg-opacity-40 hover:bg-opacity-60"
					on:click={async () => {
						addGame(i + 1);
					}}
				>
					<h1 class="text-white text-shadow-md">+</h1>
				</button>
			{/each}
		</div>
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
			on:click={updateScore}
		>
			Update Score
		</button>
	</div>
	<ConfirmModal bind:open={deleteGameModalOpen} on:confirm={handleDelete}>
		Delete Game?
	</ConfirmModal>
</Modal>
