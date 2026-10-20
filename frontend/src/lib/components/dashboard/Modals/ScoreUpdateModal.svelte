<script lang="ts">
	import { findSettingsPlayer } from '$lib/utils/gamePredicates';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { GameStats, Player } from '$lib/models/types/slippiData';
	import { currentPlayers, electronEmitter, recentGames, recentReplays } from '$lib/utils/store.svelte';
	import AddGameModal from './AddGameModal.svelte';
	import GameStage from './GameStage.svelte';
	import { STAGE_DATA } from '$lib/models/constants/stageData';
	import { flip } from 'svelte/animate';

	export let open: boolean;
	let addGameModalOpen = false;
	let deleteGameModalOpen = false;
	let selectedGameIndex = 0;

	let games: GameStats[] = $recentGames;
	const updateGames = (g: GameStats[]) => { games = g; };
	$: updateGames($recentGames);

	$: p1Idx = $currentPlayers?.at(0)?.playerIndex ?? 0;
	$: p2Idx = $currentPlayers?.at(1)?.playerIndex ?? 1;

	const getName = (idx: number) => {
		const name = $currentPlayers?.at(idx === p1Idx ? 0 : 1)?.displayName;
		return name?.length ? name : `Player ${idx + 1}`;
	};

	const addGame = (i: number) => { selectedGameIndex = i; addGameModalOpen = true; };
	const deleteGame = (i: number) => { selectedGameIndex = i; deleteGameModalOpen = true; };
	const handleDelete = () => $electronEmitter.emit('RecentGamesDelete', selectedGameIndex);
	const moveUp = (i: number) => $electronEmitter.emit('RecentGamesReorder', i, i - 1);
	const moveDown = (i: number) => $electronEmitter.emit('RecentGamesReorder', i, i + 1);

	// Change winner: an override with a note (forfeit, DQ, misclick…) — the score and striking follow it.
	let overrideIndex: number | null = null;
	let overrideWinner: '0' | '1' | 'none' = '0';
	let overrideNote = '';
	const openOverride = (i: number) => {
		const current = games[i]?.resultOverride;
		overrideIndex = i;
		overrideWinner = current ? (current.winnerSlot === null ? 'none' : (String(current.winnerSlot) as '0' | '1')) : '0';
		overrideNote = current?.note ?? '';
	};
	const saveOverride = () => {
		if (overrideIndex === null || !overrideNote.trim()) return;
		const winnerSlot = overrideWinner === 'none' ? null : (Number(overrideWinner) as 0 | 1);
		$electronEmitter.emit('RecentGamesSetResult', overrideIndex, { winnerSlot, note: overrideNote.trim() });
		overrideIndex = null;
	};
	const clearOverride = (i: number) => $electronEmitter.emit('RecentGamesSetResult', i, null);

	// + From replay: one of the 10 newest replays in the Slippi folder joins the set's games.
	let showReplays = false;
	const listReplays = () => {
		showReplays = !showReplays;
		if (showReplays) $electronEmitter.emit('RecentReplaysRequest');
	};
	const addReplay = (path: string) => {
		$electronEmitter.emit('AddSetGameFromReplay', path);
		showReplays = false;
	};
	const time = (iso: string | null) => (iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
</script>

<Modal bind:open on:close={() => (open = false)} class="w-[95vw] max-w-[480px] max-h-[80vh]">
	<div class="modal-box background-primary-color border-secondary">
		<div class="modal-header">
			<p class="modal-title text-secondary-color">Games</p>
			<div class="header-names text-secondary-color">
				<span>{getName(p1Idx)}</span>
				<span class="vs-sep">vs</span>
				<span>{getName(p2Idx)}</span>
			</div>
		</div>

		<div class="game-list">
			{#each games as game, i (game.timestamp?.toString() ?? i)}
				{@const p1c = findSettingsPlayer(game.settings?.players, p1Idx)?.characterId ?? 0}
				{@const p1col = findSettingsPlayer(game.settings?.players, p1Idx)?.characterColor ?? 0}
				{@const p2c = findSettingsPlayer(game.settings?.players, p2Idx)?.characterId ?? 0}
				{@const p2col = findSettingsPlayer(game.settings?.players, p2Idx)?.characterColor ?? 0}
				{@const p1stocks = game.lastFrame?.players?.[p1Idx]?.post.stocksRemaining ?? 0}
				{@const p2stocks = game.lastFrame?.players?.[p2Idx]?.post.stocksRemaining ?? 0}
				{@const stageName = STAGE_DATA[game.settings?.stageId ?? -1]?.name ?? '—'}
				<div class="game-wrap" animate:flip={{ duration: 220 }}>
				<div class="game-row border-secondary" class:game-mock={game.isMock}>
					<span class="game-num text-secondary-color">G{i + 1}{game.isMock ? '*' : ''}</span>

					<div class="char-stocks">
						{#each [3, 2, 1, 0] as s}
							<img
								class="stock-icon" class:stock-dead={p1stocks <= s}
								src="/image/characters/{p1c}/{p1col}/stock.png" alt=""
							/>
						{/each}
					</div>

					<div class="stage-thumb">
						<GameStage stageId={game.settings?.stageId} class="stage-img" objectFit="cover" />
						<span class="stage-name">{stageName}</span>
					</div>

					<div class="char-stocks char-stocks--right">
						{#each [0, 1, 2, 3] as s}
							<img
								class="stock-icon" class:stock-dead={p2stocks <= s}
								src="/image/characters/{p2c}/{p2col}/stock.png" alt=""
							/>
						{/each}
					</div>

					<div class="row-actions">
						<button class="action-btn" disabled={i === 0} on:click={() => moveUp(i)} title="Move up">↑</button>
						<button class="action-btn" disabled={i === games.length - 1} on:click={() => moveDown(i)} title="Move down">↓</button>
						<button class="action-btn" on:click={() => openOverride(i)} title="Change the winner (with a note)">✎</button>
						<button class="action-btn action-btn--del" on:click={() => deleteGame(i)} title="Delete">✕</button>
					</div>
				</div>
				{#if game.resultOverride}
					<p class="override-note text-secondary-color">
						✎ {game.resultOverride.winnerSlot === null ? "Doesn't count" : `${getName(game.resultOverride.winnerSlot === 0 ? p1Idx : p2Idx)} won`} — {game.resultOverride.note}
						<button class="clear-override" on:click={() => clearOverride(i)}>Use the game's result</button>
					</p>
				{/if}
				{#if overrideIndex === i}
					<div class="override-form border-secondary text-secondary-color">
						<div class="flex gap-3 text-xs">
							<label><input type="radio" bind:group={overrideWinner} value="0" /> {getName(p1Idx)} won</label>
							<label><input type="radio" bind:group={overrideWinner} value="1" /> {getName(p2Idx)} won</label>
							<label><input type="radio" bind:group={overrideWinner} value="none" /> Doesn't count</label>
						</div>
						<input class="note-input border-secondary" placeholder="Why? e.g. LRAS by mistake, DQ: illegal controller (required)" bind:value={overrideNote} />
						<div class="flex gap-2 justify-end">
							<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => (overrideIndex = null)}>Cancel</button>
							<button class="btn text-xs h-7 px-3 border-secondary rounded disabled:opacity-40" disabled={!overrideNote.trim()} on:click={saveOverride}>Save</button>
						</div>
					</div>
				{/if}
				</div>
			{:else}
				<p class="empty-hint text-secondary-color">No games yet.</p>
			{/each}
		</div>

		<div class="modal-footer">
			<button class="btn text-xs h-8 px-4 border-secondary rounded" on:click={() => addGame(games.length)} title="Characters, stage, winner and stocks left — for a game that wasn't recorded">
				+ Add game
			</button>
			<button class="btn text-xs h-8 px-4 border-secondary rounded" on:click={listReplays}>+ From replay</button>
		</div>
		{#if showReplays}
			<div class="replays text-secondary-color">
				{#each $recentReplays as r (r.path)}
					<button class="replay border-secondary" on:click={() => addReplay(r.path)}>
						<span class="r-time">{time(r.startAt)}</span>
						<span class="r-stage">{STAGE_DATA[r.stageId ?? -1]?.name ?? 'Stage'}</span>
						<span class="r-players">{r.players.map((p) => `${p.tag}${p.won ? ' ✓' : ''}`).join(' vs ')}</span>
					</button>
				{:else}
					<p class="empty-hint">No replays found — check the replay folder in Slippi Launcher.</p>
				{/each}
			</div>
		{/if}
	</div>

	<ConfirmModal bind:open={deleteGameModalOpen} on:confirm={handleDelete}>Delete game?</ConfirmModal>
	<AddGameModal bind:open={addGameModalOpen} bind:selectedGameIndex />
</Modal>

<style>
	.override-note { font-size: 0.7rem; opacity: 0.75; margin: -0.2rem 0 0.2rem 2rem; }
	.clear-override { font-size: 0.65rem; opacity: 0.6; text-decoration: underline; margin-left: 0.4rem; background: none; color: inherit; }
	.override-form { display: flex; flex-direction: column; gap: 0.45rem; padding: 0.6rem; border-radius: 0.3rem; margin-bottom: 0.3rem; }
	.note-input { height: 1.9rem; padding: 0 0.5rem; font-size: 0.75rem; background: transparent; color: var(--secondary-color); border-radius: 0.25rem; }
	.replays { display: flex; flex-direction: column; gap: 0.3rem; max-height: 14rem; overflow-y: auto; margin-top: 0.5rem; }
	.replay { display: flex; gap: 0.6rem; align-items: center; padding: 0.35rem 0.6rem; border-radius: 0.3rem; font-size: 0.75rem; text-align: left; background: transparent; color: var(--secondary-color); }
	.r-time { opacity: 0.55; width: 2.8rem; }
	.r-stage { width: 7.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.r-players { opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.modal-box {
		padding: 1.25rem;
		border-radius: 0.35rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 78vh;
	}

	.modal-header {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.modal-title {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.4;
	}

	.header-names {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		font-weight: 600;
		justify-content: space-between;
	}

	.vs-sep {
		font-size: 0.65rem;
		opacity: 0.3;
	}

	.game-list {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		overflow-y: auto;
	}

	.game-row {
		display: grid;
		grid-template-columns: 2rem 1fr auto 1fr 5rem;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.6rem;
		border-radius: 0.25rem;
	}

	.game-mock { opacity: 0.65; }

	.game-num {
		font-size: 0.65rem;
		font-weight: 700;
		opacity: 0.4;
		white-space: nowrap;
	}

	.char-stocks {
		display: flex;
		gap: 2px;
		align-items: center;
	}

	.char-stocks--right {
		justify-content: flex-end;
	}

	.stock-icon {
		width: 1rem;
		height: 1rem;
		object-fit: contain;
	}

	.stock-dead { opacity: 0.12; }

	.stage-thumb {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.stage-thumb :global(.stage-img) {
		width: 56px;
		height: auto;
		border-radius: 0.2rem;
	}

	.stage-name {
		font-size: 0.55rem;
		opacity: 0.35;
		color: var(--secondary-color);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 64px;
	}

	.row-actions {
		display: flex;
		gap: 0.2rem;
		justify-content: flex-end;
	}

	.action-btn {
		background: transparent;
		border: none;
		cursor: pointer;
		font-size: 0.75rem;
		padding: 0.2rem 0.35rem;
		border-radius: 0.2rem;
		opacity: 0.5;
		color: var(--secondary-color);
		transition: opacity 0.1s;
	}

	.action-btn:hover:not(:disabled) { opacity: 1; }
	.action-btn:disabled { opacity: 0.15; cursor: default; }

	.action-btn--del:hover:not(:disabled) {
		opacity: 1;
		color: rgb(239, 68, 68);
	}

	.empty-hint {
		font-size: 0.75rem;
		opacity: 0.3;
		text-align: center;
		padding: 1rem 0;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
	}
</style>
