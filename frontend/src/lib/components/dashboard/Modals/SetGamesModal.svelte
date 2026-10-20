<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { STAGE_DATA } from '$lib/models/constants/stageData';
	import { orderTeams, TEAM_COLORS } from '$lib/utils/teams';
	import type { ReplaySummary } from '$lib/models/types/slippiData';
	import type { KeyedPlayer } from '$lib/utils/playerIdentity';
	import { continueSetAcrossSessions, electronEmitter, gameSettings, recentReplays } from '$lib/utils/store.svelte';
	import { tooltip } from 'svooltip';

	// Advanced set fixes: who is who (doubles: colour + port per player, for the running game or the
	// last finished one) and loading the latest replays as the set's games (after a restart / new session).
	export let open: boolean;

	type Row = KeyedPlayer & { port: number; teamId: number | null; characterId?: number | null };
	$: players = (($gameSettings?.players ?? []).filter(Boolean) as Row[]).sort((a, b) => a.playerIndex - b.playerIndex);
	$: rows = players.filter((p) => p.froggiKey).sort((a, b) => (a.froggiKey ?? '').localeCompare(b.froggiKey ?? ''));
	$: colours = [...new Set(players.map((p) => p.teamId ?? 0))].sort();
	const colourName = (id: number) => TEAM_COLORS[id] ?? 'team';
	const portsOf = (teamId: number) => players.filter((p) => (p.teamId ?? 0) === teamId);

	/** Put identity `key` on `target`'s port; whoever was there takes the old port's identity. */
	function moveTo(row: Row, target: Row | undefined) {
		if (!target || target.playerIndex === row.playerIndex) return;
		const keys: Record<number, string> = Object.fromEntries(players.map((p) => [p.playerIndex, p.froggiKey ?? '']));
		keys[target.playerIndex] = row.froggiKey!;
		keys[row.playerIndex] = target.froggiKey ?? '';
		$electronEmitter.emit('SetPlayerKeys', keys);
	}
	const pickColour = (row: Row, teamId: number) => moveTo(row, portsOf(teamId)[0]);
	const pickPort = (row: Row, playerIndex: number) => moveTo(row, players.find((p) => p.playerIndex === playerIndex));

	// Sides: Player/Team 1 ↔ 2, or the two players inside a team.
	$: isTeams = !!$gameSettings?.isTeams;
	const swap = (kind: 'sides' | 'team1' | 'team2') => $electronEmitter.emit('SwapSides', kind);

	// Load previous games
	let showReplays = false;
	let selected = new Set<string>();
	$: continueNext = $continueSetAcrossSessions;
	const listReplays = () => {
		showReplays = true;
		selected = new Set();
		$electronEmitter.emit('RecentReplaysRequest');
	};
	const toggle = (path: string) => {
		selected.has(path) ? selected.delete(path) : selected.add(path);
		selected = selected;
	};
	// Sides of the loaded set: the earliest picked game decides who is Player/Team 1 (default: lower
	// port / the team with the lowest port) — the host can swap before loading so the score lands on the right side.
	let swapLoaded = false;
	$: earliest = $recentReplays.filter((r) => selected.has(r.path)).sort((a, b) => a.path.localeCompare(b.path))[0] as ReplaySummary | undefined;
	$: earliestSides = earliest ? sidesOf(earliest) : null;
	function sidesOf(r: ReplaySummary): [ReplaySummary['players'], ReplaySummary['players']] {
		if (r.isTeams) {
			const teams = orderTeams(r.players);
			return [teams[0]?.players ?? [], teams[1]?.players ?? []];
		}
		const byPort = [...r.players].sort((a, b) => a.port - b.port);
		return [[byPort[0]].filter(Boolean), [byPort[1]].filter(Boolean)];
	}
	$: shownSides = earliestSides ? (swapLoaded ? [earliestSides[1], earliestSides[0]] : earliestSides) : null;
	const stocksText = (n: number | null) => (n == null ? '' : n > 0 ? '●'.repeat(n) : '✕');

	const load = () => {
		$electronEmitter.emit('LoadSetGames', [...selected], continueNext, swapLoaded);
		open = false;
		showReplays = false;
		swapLoaded = false;
	};
	const time = (iso: string | null) => (iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
	const TEAM_HEX: Record<number, string> = { 0: '#ef4444', 1: '#3b82f6', 2: '#22c55e' };
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div class="confirm-box background-primary-color border-secondary text-secondary-color">
		<p class="title">Fix the set</p>

		{#if $gameSettings?.isTeams && rows.length}
			<p class="dash-label">Players · {$gameSettings ? 'current / last game' : ''}</p>
			<p class="desc">Who is on which colour and port. Changes apply to this game only — later games follow the new ports.</p>
			{#each rows as row (row.froggiKey)}
				<div class="player-row">
					<span class="key"><span class="swatch" style:background={TEAM_HEX[row.teamId ?? 0]}></span>{row.froggiKey}</span>
					<select class="sel border-secondary" value={row.teamId ?? 0} on:change={(e) => pickColour(row, Number(e.currentTarget.value))}>
						{#each colours as c}<option value={c}>{colourName(c)}</option>{/each}
					</select>
					<select class="sel border-secondary" value={row.playerIndex} on:change={(e) => pickPort(row, Number(e.currentTarget.value))}>
						{#each portsOf(row.teamId ?? 0) as p}<option value={p.playerIndex}>Port {p.port}</option>{/each}
					</select>
				</div>
			{/each}
		{/if}

		<p class="dash-label mt">Sides</p>
		<p class="desc">Who is {isTeams ? 'Team' : 'Player'} 1 and 2 for this set — names, score, overlays and the striking phones follow{isTeams ? '; inside a team, who is that team\'s Player 1 (lower port by default)' : ''}. Phones keep their links.</p>
		<div class="flex gap-2 flex-wrap">
			<button class="btn text-xs h-8 px-4 border-secondary rounded" on:click={() => swap('sides')}>Swap {isTeams ? 'teams' : 'Player 1 ↔ 2'}</button>
			{#if isTeams}
				<button class="btn text-xs h-8 px-4 border-secondary rounded" on:click={() => swap('team1')}>Swap players in Team 1</button>
				<button class="btn text-xs h-8 px-4 border-secondary rounded" on:click={() => swap('team2')}>Swap players in Team 2</button>
			{/if}
		</div>

		<p class="dash-label mt">Previous games</p>
		<p class="desc">Froggi was closed or Slippi started a new session? Pick the games of this set — score, stages (DSR) and stats are rebuilt from them.</p>
		{#if !showReplays}
			<button class="btn text-xs h-8 px-4 border-secondary rounded self-start" on:click={listReplays}>Show latest 10 replays</button>
		{:else}
			<div class="replays">
				{#each $recentReplays as r (r.path)}
					<label class="replay border-secondary" class:replay--on={selected.has(r.path)}>
						<input type="checkbox" checked={selected.has(r.path)} on:change={() => toggle(r.path)} />
						<span class="r-time">{time(r.startAt)}</span>
						<span class="r-stage">{STAGE_DATA[r.stageId ?? -1]?.name ?? 'Stage'}</span>
						<span class="r-players">
							{#each r.players as p}
								<span class="r-player" class:r-player--won={p.won} style:border-color={r.isTeams ? TEAM_HEX[p.teamId ?? 0] : 'transparent'}>
									{#if p.characterId != null}<img src="/image/characters/css/{p.characterId}.png" alt="" />{/if}{p.tag}
									{#if p.stocks != null}<span class="r-stocks" title="Stocks left">{stocksText(p.stocks)}</span>{/if}
								</span>
							{/each}
						</span>
					</label>
				{:else}
					<p class="desc">No replays found — check the replay folder in Slippi Launcher.</p>
				{/each}
			</div>
			{#if shownSides && earliest}
				<p class="dash-label mt">Sides — from the earliest picked game</p>
				<div class="sides">
					{#each shownSides as side, i (i)}
						<div class="side border-secondary">
							<span class="side-label">{earliest.isTeams ? 'Team' : 'Player'} {i + 1}</span>
							{#each side as p (p.playerIndex)}
								<span class="r-player" style:border-color={earliest.isTeams ? TEAM_HEX[p.teamId ?? 0] : 'transparent'}>
									{#if p.characterId != null}<img src="/image/characters/css/{p.characterId}.png" alt="" />{/if}{p.tag}
									{#if p.stocks != null}<span class="r-stocks">{stocksText(p.stocks)}</span>{/if}
								</span>
							{/each}
						</div>
					{/each}
					<button class="btn text-xs h-8 px-3 border-secondary rounded self-center" on:click={() => (swapLoaded = !swapLoaded)}>Swap sides</button>
				</div>
				<p class="desc">The score, names and overlays use these sides for the whole set (later games match the players by tag / connect code).</p>
			{/if}
			<label class="continue" use:tooltip={{ content: 'If these games are part of an ongoing set, keep this on — the next Slippi session continues the set instead of starting at 0-0.', placement: 'top', delay: [300, 0] }}>
				<input type="checkbox" class="toggle-check" bind:checked={continueNext} />
				<span>Continue the set in the next session</span>
			</label>
		{/if}

		<div class="actions">
			<button class="btn text-sm h-9 px-5 border-secondary rounded" on:click={() => (open = false)}>Close</button>
			{#if showReplays}
				<button class="btn text-sm h-9 px-5 border-secondary rounded confirm-ok disabled:opacity-40" disabled={!selected.size} on:click={load}>
					Load {selected.size || ''} game{selected.size === 1 ? '' : 's'}
				</button>
			{/if}
		</div>
	</div>
</Modal>

<style>
	.r-stocks { margin-left: 0.25rem; font-size: 0.55rem; letter-spacing: 0.05rem; opacity: 0.7; }
	.sides { display: flex; gap: 0.5rem; align-items: stretch; flex-wrap: wrap; }
	.side { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.4rem 0.6rem; border-radius: 0.375rem; flex: 1; min-width: 9rem; }
	.side-label { font-size: 0.65rem; text-transform: uppercase; opacity: 0.5; }

	.confirm-box { width: min(560px, 92vw); max-height: 85vh; overflow-y: auto; padding: 1.25rem; border-radius: 0.375rem; display: flex; flex-direction: column; gap: 0.6rem; }
	.title { font-weight: 700; }
	.dash-label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.4; }
	.mt { margin-top: 0.5rem; }
	.desc { font-size: 0.75rem; opacity: 0.55; }
	.player-row { display: grid; grid-template-columns: 1fr 6.5rem 6rem; gap: 0.5rem; align-items: center; }
	.key { display: flex; align-items: center; gap: 0.45rem; font-size: 0.85rem; font-weight: 600; }
	.swatch { width: 0.6rem; height: 0.6rem; border-radius: 50%; }
	.sel { height: 1.9rem; padding: 0 0.4rem; font-size: 0.78rem; background: transparent; color: var(--secondary-color); border-radius: 0.25rem; text-transform: capitalize; }
	.replays { display: flex; flex-direction: column; gap: 0.35rem; }
	.replay { display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0.6rem; border-radius: 0.3rem; font-size: 0.75rem; cursor: pointer; opacity: 0.75; }
	.replay--on { opacity: 1; background: color-mix(in srgb, var(--secondary-color) 10%, transparent); }
	.r-time { opacity: 0.6; width: 2.8rem; }
	.r-stage { width: 7.5rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.r-players { display: flex; flex-wrap: wrap; gap: 0.3rem; }
	.r-player { display: inline-flex; align-items: center; gap: 0.2rem; border-bottom: 2px solid transparent; opacity: 0.65; }
	.r-player--won { opacity: 1; font-weight: 700; }
	.r-player img { width: 16px; height: 16px; }
	.continue { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; cursor: help; }
	.toggle-check { width: 0.9rem; height: 0.9rem; }
	.actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.4rem; }
	.confirm-ok { background: var(--secondary-color); color: var(--primary-color); }
</style>
