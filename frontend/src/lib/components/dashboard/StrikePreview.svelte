<script lang="ts">
	import { electronEmitter, strikeState } from '$lib/utils/store.svelte';
	import { STRIKE_STAGES, stageStatus, strikeTurn } from '$lib/utils/strikeStageStatus';
	import type { StageStatus } from '$lib/models/types/stageStriking';
	import StrikeTimeline from '$lib/components/set/StrikeTimeline.svelte';
	import AddGameModal from './Modals/AddGameModal.svelte';
	import { currentPlayers, gameFrame, recentGames } from '$lib/utils/store.svelte';

	// The host's stage-striking control panel (everything the old Set page did): follow the set, act for
	// whoever's turn it is, report results, undo / restart / pause, end the match.
	$: s = $strikeState;
	$: active = !!s && s.phase !== 'lobby';
	$: turn = strikeTurn(s);
	$: nameOf = (p: 1 | 2 | null | undefined) => (p === 1 ? s?.p1Name : p === 2 ? s?.p2Name : '') || '';
	$: connected = s?.connectedPlayers ?? [];
	$: firstGame = (s?.gameNum ?? 1) === 1 && !s?.lastWinner;

	const PHASE_TEXT: Record<string, string> = {
		charSelect: 'Picking characters (double blind)',
		rps: 'Rock · paper · scissors',
		rpsResult: 'RPS winner chooses strike order',
		striking: 'Striking stages 1 · 2 · 1',
		stageBan: 'Winner bans a stage',
		stagePick: 'Loser picks the stage',
		charLock: 'Winner picks a character',
		charPick: 'Loser picks a character',
		playing: 'Game in progress',
		setComplete: 'Set complete',
	};
	const ACTION_TEXT: Record<string, string> = {
		pickCharacter: 'pick a character',
		chooseStrikeOrder: 'choose to strike first or second',
		strike: 'strike a stage',
		ban: 'ban a stage',
		pick: 'pick the stage',
		answerAgreement: 'answer the stage request',
	};
	$: turnText = turn.player ? `${nameOf(turn.player)} to ${ACTION_TEXT[turn.action] ?? turn.action}` : '';

	const RPS: Record<string, string> = { rock: '✊', paper: '✋', scissors: '✌️' };
	$: rpsShown = (c: string | null | undefined) => (!c ? '…' : s?.rps?.p1 && s?.rps?.p2 ? RPS[c] : '✓');

	$: canClick = s?.phase === 'striking' || s?.phase === 'stageBan' || s?.phase === 'stagePick';
	const clickStage = (id: number, status: StageStatus) => {
		if (!canClick || status !== 'available') return;
		$electronEmitter.emit(s?.phase === 'stagePick' ? 'PickStage' : 'StrikeStage', id);
	};
	/** Label on a stage that can't be chosen: why. */
	const lockedLabel = (stageId: number, status: StageStatus) => {
		if (status === 'dsr') return 'DSR';
		if (status === 'picked') return 'Played';
		if (status !== 'locked') return '';
		return firstGame && s?.counterpicks?.includes(stageId) ? 'Counterpick' : 'Not legal';
	};

	const other = (p: 1 | 2): 1 | 2 => (p === 1 ? 2 : 1);
	// Characters are picked on the devices; show "picking…" only while that's happening.
	$: picking = s?.phase === 'charSelect' || s?.phase === 'charLock' || s?.phase === 'charPick';

	// Results: the set's games list is the one source (Edit Games). "Report result…" adds a game there,
	// prefilled with this game's characters, stage and the live stocks.
	let reportOpen = false;
	let reportIndex = 0;
	const liveStocks = (i: number) => $gameFrame?.players?.[$currentPlayers?.[i]?.playerIndex ?? -1]?.post?.stocksRemaining ?? 0;
	$: reportPreset = s
		? { chars: [s.characters.p1, s.characters.p2] as [number | null, number | null], stageId: s.finalStageId, stocks: [liveStocks(0), liveStocks(1)] as [number, number] }
		: undefined;
	const openReport = () => {
		reportIndex = $recentGames.length;
		reportOpen = true;
	};

	let endOpen = false;
	const endMatch = (winner: 1 | 2 | null) => {
		endOpen = false;
		$electronEmitter.emit('StrikeEndMatch', winner);
	};
</script>

{#if active && s}
	<div class="dash-card border-secondary strike-card">
		<div class="head">
			<span class="dash-label">Stage striking · Game {s.gameNum} · Bo{s.bestOf}</span>
			{#if s.paused}<span class="paused">Paused</span>{/if}
		</div>

		<div class="devices">
			{#each [1, 2] as n}
				{@const p = n === 1 ? 1 : 2}
				<span class="device"><span class="dot" class:dot--on={connected.includes(p)} />{nameOf(p)} · {connected.includes(p) ? 'connected' : 'not connected'}</span>
			{/each}
		</div>

		<p class="phase">{PHASE_TEXT[s.phase] ?? s.phase}</p>
		{#if turnText}<p class="turn">{turnText}</p>{/if}

		{#if s.agreement}
			<div class="banner">
				<span>{nameOf(s.agreement.requestedBy)} asks to play a stage they already won on (DSR).</span>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => s?.agreement && $electronEmitter.emit('StrikeAgreeResponse', other(s.agreement.requestedBy), true)}>Allow</button>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => s?.agreement && $electronEmitter.emit('StrikeAgreeResponse', other(s.agreement.requestedBy), false)}>Decline</button>
			</div>
		{/if}

		{#if s.phase === 'rpsResult' && s.rps.winner}
			<div class="banner">
				<span>{nameOf(s.rps.winner)} won RPS:</span>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => s?.rps.winner && $electronEmitter.emit('RpsWinnerOrder', s.rps.winner)}>Strikes first</button>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => s?.rps.winner && $electronEmitter.emit('RpsWinnerOrder', other(s.rps.winner))}>Strikes second</button>
			</div>
		{/if}

		<StrikeTimeline state={s} accent="var(--secondary-color)" />

		<div class="stages">
			{#each STRIKE_STAGES as stage (stage.stageId)}
				{@const status = stageStatus(s, stage.stageId)}
				{@const label = lockedLabel(stage.stageId, status)}
				<button
					class="stage stage--{status}"
					class:stage--clickable={canClick && status === 'available'}
					title={canClick && status === 'available' ? `${s.phase === 'stagePick' ? 'Pick' : 'Strike'} for ${nameOf(s.currentStriker)}` : stage.name}
					on:click={() => clickStage(stage.stageId, status)}
				>
					<img src="/image/stages/{stage.stageId}.png" alt={stage.name} />
					{#if label}<span class="tag">{label}</span>{/if}
					<span>{stage.name}</span>
				</button>
			{/each}
		</div>

		{#if picking || s.characters.p1 != null || s.characters.p2 != null || s.phase === 'rps' || s.phase === 'rpsResult'}
		<div class="players">
			{#each [1, 2] as n}
				{@const key = n === 1 ? 'p1' : 'p2'}
				<span class="player" class:player--right={n === 2}>
					<span class="pname">{nameOf(n === 1 ? 1 : 2)}</span>
					{#each [s.characters[key], s.partnerCharacters?.[key]] as c, i}
						{#if c != null}<img class="char" src="/image/characters/css/{c}.png" alt="" />{:else if i === 0 && picking}<span class="pending">picking…</span>{/if}
					{/each}
					{#if s.phase === 'rps' || s.phase === 'rpsResult'}<span>{rpsShown(s.rps[key])}</span>{/if}
				</span>
			{/each}
		</div>
		{/if}

		{#if s.phase === 'playing'}
			<div class="banner">
				<span>Results come in from Slippi. Not recorded, or decided off the screen?</span>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={openReport} title="Add this game's result (characters, stage, winner, stocks left)">Report result…</button>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" title="Doesn't count — play this game again" on:click={() => $electronEmitter.emit('MarkWarmup')}>Cancel game</button>
			</div>
		{/if}

		{#if s.phase === 'setComplete'}
			<div class="banner banner--done">
				<span>🏆 {s.score.p1 > s.score.p2 ? s.p1Name : s.p2Name} wins {Math.max(s.score.p1, s.score.p2)}–{Math.min(s.score.p1, s.score.p2)}</span>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => $electronEmitter.emit('ResetSet')}>Close set</button>
			</div>
		{/if}


		<div class="controls">
			<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => $electronEmitter.emit('StrikeUndoAction')} title="Step back one action (strike, ban, pick, character, RPS, result)">↩ Undo</button>
			<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => $electronEmitter.emit('StrikeRestartStep')} title="Start this step over">↻ Restart step</button>
			<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => $electronEmitter.emit('StrikePause', !s?.paused)} title="While paused nobody can strike from their device — you still can here">{s.paused ? '▶ Resume striking' : '⏸ Pause striking'}</button>
			{#if s.phase !== 'setComplete'}
				<button class="btn text-xs h-7 px-3 border-secondary rounded ml-auto" on:click={() => (endOpen = true)}>End match</button>
			{/if}
		</div>
		{#if canClick}<p class="hint">Click a stage to act for {nameOf(s.currentStriker)}.</p>{/if}

		{#if endOpen}
			<div class="banner banner--end">
				<span>End the match — who won?</span>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => endMatch(1)}>{s.p1Name}</button>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => endMatch(2)}>{s.p2Name}</button>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => endMatch(null)}>No result</button>
				<button class="btn text-xs h-7 px-3 rounded" on:click={() => (endOpen = false)}>Cancel</button>
			</div>
		{/if}
	</div>
{/if}

<AddGameModal bind:open={reportOpen} bind:selectedGameIndex={reportIndex} preset={reportPreset} />

<style>
	.strike-card { display: flex; flex-direction: column; gap: 0.55rem; padding: 1rem 1.25rem; border-radius: 0.25rem; }
	.dash-label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.4; }
	.head { display: flex; align-items: center; gap: 0.6rem; }
	.paused { font-size: 0.65rem; font-weight: 700; color: #f59e0b; text-transform: uppercase; }
	.devices { display: flex; gap: 1rem; font-size: 0.7rem; opacity: 0.7; }
	.device { display: flex; align-items: center; gap: 0.35rem; }
	.dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #f87171; }
	.dot--on { background: #4ade80; }
	.phase { font-size: 0.95rem; font-weight: 700; }
	.turn { font-size: 0.8rem; color: #facc15; }
	.banner { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; font-size: 0.75rem; padding: 0.5rem 0.6rem; border-radius: 0.3rem; background: color-mix(in srgb, var(--secondary-color) 7%, transparent); }
	.banner span { margin-right: auto; }
	.banner--done { font-weight: 700; }
	.banner--end { border: 1px solid #ef4444; }
	.stages { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.4rem; }
	.stage { position: relative; display: flex; flex-direction: column; gap: 0.15rem; background: none; color: var(--secondary-color); text-align: center; font-size: 0.6rem; border-radius: 0.3rem; padding: 0; }
	.stage img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 0.3rem; border: 2px solid transparent; }
	.stage--locked img, .stage--struck img, .stage--dsr img { filter: grayscale(1) brightness(0.55); }
	.stage--struck::after {
		content: '✕'; position: absolute; left: 0; right: 0; top: 0; aspect-ratio: 16 / 9;
		display: flex; align-items: center; justify-content: center;
		font-size: 1.6rem; font-weight: 800; color: #ef4444;
	}
	/* Why a stage can't be chosen (Counterpick in game 1, DSR, Not legal, Played). */
	.tag { position: absolute; left: 0; right: 0; top: 0; aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; text-shadow: 0 1px 3px #000; }
	.stage--dsr .tag { color: #fca5a5; }
	.stage--dsr img { border-color: #ef4444; }
	.stage--picked img { border-color: #22c55e; }
	.stage--picked .tag { display: none; }
	.stage--clickable img { cursor: pointer; }
	.stage--clickable:hover img { border-color: var(--secondary-color); }
	.players { display: flex; justify-content: space-between; font-size: 0.72rem; }
	.player { display: flex; align-items: center; gap: 0.35rem; }
	.player--right { flex-direction: row-reverse; }
	.pname { opacity: 0.7; }
	.pending { opacity: 0.45; font-style: italic; }
	.char { width: 28px; height: 28px; object-fit: contain; }
	.controls { display: flex; flex-wrap: wrap; gap: 0.4rem; }
	.hint { font-size: 0.68rem; opacity: 0.45; }
	@media (max-width: 640px) { .stages { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
</style>
