<script lang="ts">
	import { currentPlayers, gameScore } from '$lib/utils/store.svelte';
	import ConfirmModal from '../ConfirmModal.svelte';
	import ScoreUpdateModal from './Modals/ScoreUpdateModal.svelte';
	import TagUpdateModal from './Modals/TagUpdateModal.svelte';

	let isTagModalOpen = false;
	let isScoreModalOpen = false;
	let isResetRecentGamesModalOpen = false;

	const resetScore = () => {
		isResetRecentGamesModalOpen = true;
	};

	const handleScoreReset = () => {
		isResetRecentGamesModalOpen = true;
	};

	const updateScore = () => {
		isScoreModalOpen = true;
	};

	const updateTag = () => {
		isTagModalOpen = true;
	};
</script>

<div class="flex flex-col gap-2 w-[30rem] max-w-[95vw]">
	<div class="flex gap-2 justify-center items-center">
		<h1 class="text-white text-3xl font-semibold">Tag</h1>
	</div>
	<div class="flex w-full">
		<h1 class="text-white text-3xl font-semibold">
			{$currentPlayers.at(0)?.displayName ?? 'Player1'}
		</h1>
		<h1 class="text-white text-3xl font-semibold">
			{$currentPlayers.at(1)?.displayName ?? 'Player2'}
		</h1>
	</div>
	<div class="flex flex-col gap-2">
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
			on:click={updateTag}
		>
			Change Tag
		</button>
	</div>
</div>
<div class="flex flex-col gap-2">
	<div class="flex gap-2 justify-center items-center">
		<h1 class="text-white text-3xl font-semibold">Score</h1>
	</div>
	<div class="flex gap-2 justify-center items-center">
		<h1 class="text-white text-3xl font-semibold">{$gameScore.at(0)}</h1>
		<h1 class="text-white text-3xl font-semibold">-</h1>
		<h1 class="text-white text-3xl font-semibold">{$gameScore.at(1)}</h1>
	</div>
	<button
		class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
		on:click={resetScore}
	>
		Reset Score
	</button>
	<button
		class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
		on:click={updateScore}
	>
		Change Score
	</button>
</div>

<TagUpdateModal bind:open={isTagModalOpen} />
<ScoreUpdateModal bind:open={isScoreModalOpen} />
<ConfirmModal bind:open={isResetRecentGamesModalOpen} on:confirm={handleScoreReset}>
	Reset Games?
</ConfirmModal>
