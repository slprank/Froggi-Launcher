<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { strikeState, electronEmitter, urls } from '$lib/utils/store.svelte';
	import { STAGE_DATA } from '$lib/models/constants/stageData';
	import PhoneLiveGame from '$lib/components/set/PhoneLiveGame.svelte';
	import CharPicker from '$lib/components/set/CharPicker.svelte';
	import StrikeTimeline from '$lib/components/set/StrikeTimeline.svelte';
	import { stageStatus } from '$lib/utils/strikeStageStatus';

	// The player's secret from their QR link (/set/p/N?t=…) — phones aren't authorised, so every
	// striking action carries it. Without it (host browser) actions go through the host password.
	const token = (): string | undefined => $page.url.searchParams.get('t') ?? undefined;

	// Players type their own name (tag); the host can still overwrite it from the dashboard.
	let editingName = false;
	let nameDraft = '';
	const startEditName = () => {
		nameDraft = myName;
		editingName = true;
	};
	const saveName = () => {
		if (!editingName) return;
		editingName = false;
		if (nameDraft.trim() && nameDraft.trim() !== myName) $electronEmitter.emit('StrikeSetName', playerNum, nameDraft, token());
	};

	// Keep the phone screen on while striking. Wake Lock needs HTTPS (ngrok / Tailscale links);
	// on plain-HTTP LAN links it isn't available and the screen may still dim.
	let wakeLock: { release: () => Promise<void> } | null = null;
	const requestWakeLock = async () => {
		try {
			wakeLock = (await (navigator as any).wakeLock?.request('screen')) ?? null;
		} catch {
			wakeLock = null;
		}
	};
	// The lock is dropped whenever the page is hidden — take it again on return.
	const onVisibility = () => {
		if (document.visibilityState !== 'visible') return;
		requestWakeLock();
		$electronEmitter.emit('StrikePlayerConnect', playerNum, token());
	};

	// No app chrome here: the root layout marks /set/p/ as an overlay page by its path.
	onMount(() => {
		$electronEmitter.emit('StrikePlayerConnect', playerNum, token());
		requestWakeLock();
		document.addEventListener('visibilitychange', onVisibility);
		return () => {
			document.removeEventListener('visibilitychange', onVisibility);
			wakeLock?.release().catch(() => undefined);
		};
	});

	const STAGE_NAMES: Record<number, string> = {
		2: 'Fountain of Dreams', 3: 'Pokémon Stadium', 6: 'Brinstar',
		7: 'Corneria', 8: "Yoshi's Story", 10: 'Mute City',
		11: 'Rainbow Cruise', 17: 'Green Greens', 22: 'Venom',
		28: 'Dream Land N64', 31: 'Battlefield', 32: 'Final Destination',
	};


	function stageName(id: number): string {
		return STAGE_DATA[id]?.name ?? STAGE_NAMES[id] ?? `Stage ${id}`;
	}

	function hideImgOnError(e: Event) {
		(e.currentTarget as HTMLImageElement).style.display = 'none';
	}

	// The link's side; after the host swaps sides (Fix set…) the same link plays the other side.
	$: linkNum = parseInt($page.params.num) as 1 | 2;
	$: playerNum = ($strikeState?.sidesSwapped ? (linkNum === 1 ? 2 : 1) : linkNum) as 1 | 2;
	$: myKey = playerNum === 1 ? 'p1' : 'p2';
	$: s = $strikeState;
	$: phase = s?.phase ?? 'lobby';

	$: myName = playerNum === 1 ? (s?.p1Name ?? 'Player 1') : (s?.p2Name ?? 'Player 2');
	$: oppName = playerNum === 1 ? (s?.p2Name ?? 'Player 2') : (s?.p1Name ?? 'Player 1');
	$: isMyTurn = s?.currentStriker === playerNum;
	$: rpsWinner = s?.rps?.winner;
	$: myRps = playerNum === 1 ? s?.rps?.p1 : s?.rps?.p2;
	$: lastWinner = s?.lastWinner;
	$: isWinner = lastWinner === playerNum;
	$: isLoser = lastWinner !== null && lastWinner !== playerNum;
	$: myChar = playerNum === 1 ? s?.characters?.p1 : s?.characters?.p2;
	$: oppChar = playerNum === 1 ? s?.characters?.p2 : s?.characters?.p1;
	// Strikes left in the current 1-2-1 turn (the striker's share minus what is already struck).
	$: strikesLeft = Math.max(0, (s?.strikeOrder ?? []).slice(0, (s?.strikeOrderIndex ?? 0) + 1).reduce((n, [, count]) => n + count, 0) - (s?.strikes?.length ?? 0));
	$: myPartnerChar = playerNum === 1 ? s?.partnerCharacters?.p1 : s?.partnerCharacters?.p2;
	$: oppPartnerChar = playerNum === 1 ? s?.partnerCharacters?.p2 : s?.partnerCharacters?.p1;
	$: myMembers = s?.ruleset === 'doubles' ? (playerNum === 1 ? s?.teamMembers?.p1 : s?.teamMembers?.p2) ?? ['Player 1', 'Player 2'] : [];

	function rpsChoice(choice: 'rock' | 'paper' | 'scissors') {
		if (myRps !== null && myRps !== undefined) return;
		$electronEmitter.emit('RpsChoice', playerNum, choice, token());
	}

	// Countdown derived from the backend's shared rpsDeadline so both phones stay in sync.
	// The backend owns the timeout + auto-pick; this is display-only.
	let nowTick = Date.now();
	let rpsTickHandle: ReturnType<typeof setInterval> | null = null;

	$: rpsDeadline = s?.rpsDeadline ?? null;
	$: rpsCountdown = rpsDeadline ? Math.max(0, Math.ceil((rpsDeadline - nowTick) / 1000)) : null;

	$: if (phase === 'rps' && rpsDeadline) {
		if (!rpsTickHandle) rpsTickHandle = setInterval(() => (nowTick = Date.now()), 250);
	} else if (rpsTickHandle) {
		clearInterval(rpsTickHandle);
		rpsTickHandle = null;
	}

	onDestroy(() => { if (rpsTickHandle) clearInterval(rpsTickHandle); });

	$: firstStriker = s?.strikeOrder?.[0]?.[0];

	function strikeOrder(first: 1 | 2) {
		$electronEmitter.emit('RpsWinnerOrder', first, token());
	}

	// Stages the picker may not choose (they already won there) — still shown so players can agree.
	// Pick phase: every legal stage (starters + counterpicks), in place, with its status.
	$: pickStages = [...new Set([...(s?.starters ?? []), ...(s?.counterpicks ?? [])])];
	$: myDsrStages = (s?.dsrStages?.[playerNum === 1 ? 'p1' : 'p2'] ?? []).filter(
		(id) => !(s?.stages ?? []).includes(id) && !(s?.bans ?? []).includes(id),
	);

	let confirmAgreeStage: number | null = null;

	// Get the opponent's attention when a request arrives (vibrate where supported).
	let lastAgreementKey = '';
	$: {
		const a = s?.agreement;
		const k = a ? `${a.requestedBy}-${a.stageId}` : '';
		if (k && k !== lastAgreementKey && a?.requestedBy !== playerNum) navigator.vibrate?.([120, 60, 120]);
		lastAgreementKey = k;
	}

	function requestAgreement(stageId: number) {
		$electronEmitter.emit('StrikeAgreeRequest', playerNum, stageId, token());
	}

	function answerAgreement(accept: boolean) {
		$electronEmitter.emit('StrikeAgreeResponse', playerNum, accept, token());
	}

	function strikeStage(stageId: number) {
		$electronEmitter.emit('StrikeStage', stageId, token());
	}

	function pickStage(stageId: number) {
		$electronEmitter.emit('PickStage', stageId, token());
	}

	// Doubles: the team picks for both its players at once (CharPicker), singles one character.
	function confirmChars(chars: number[]) {
		$electronEmitter.emit('SelectCharacter', playerNum, chars[0], token(), chars[1]);
	}

	const RPS_EMOJI: Record<string, string> = { rock: '✊', paper: '✋', scissors: '✌️' };
</script>

<div class="player-root">

	{#if s?.paused && phase !== 'lobby'}
	<div class="paused-bar">Paused by the TO — wait a moment</div>
	{/if}
	<!-- Always-visible score bar -->
	{#if s && phase !== 'lobby'}
	<div class="top-bar">
		<div class="top-score" class:top-score--me={true}>
			{#if editingName}
				<!-- svelte-ignore a11y-autofocus -->
				<input class="name-input" maxlength="30" bind:value={nameDraft} on:keydown={(e) => e.key === 'Enter' && saveName()} on:blur={saveName} autofocus />
			{:else}
				<button class="top-name top-name--edit" title="Change your name" on:click={startEditName}>{myName} <span class="pencil">✎</span></button>
			{/if}
			<span class="top-pts pts-active">{(playerNum === 1 ? s?.score?.p1 : s?.score?.p2) ?? 0}</span>
		</div>
		<span class="top-sep">–</span>
		<div class="top-score top-score--opp">
			<span class="top-pts">{(playerNum === 1 ? s?.score?.p2 : s?.score?.p1) ?? 0}</span>
			<span class="top-name">{oppName}</span>
		</div>
	</div>
	{/if}

	<div class="player-body">
		{#if ['striking', 'stageBan', 'stagePick', 'charLock', 'charPick', 'playing'].includes(phase)}
			<div class="timeline-wrap"><StrikeTimeline state={s} accent="var(--accent)" /></div>
		{/if}

		<!-- LOBBY / CONNECTING -->
		{#if phase === 'lobby'}
		{@const oppNum = playerNum === 1 ? 2 : 1}
		{@const connected = s?.connectedPlayers ?? []}
		{@const iAmConnected = $urls}
		{@const oppConnected = connected.includes(oppNum)}
		<div class="waiting-screen">
			<p class="app-name">Froggi</p>
			<p class="waiting-role">Stage Striking · {s?.ruleset === 'doubles' ? 'Team' : 'Player'} {playerNum}</p>
			<div class="conn-status-list">
				<div class="conn-status-row">
					<span class="conn-dot" class:conn-dot--on={iAmConnected} class:conn-dot--off={!iAmConnected}></span>
					<span class="conn-label">You</span>
					<span class="conn-state">{iAmConnected ? 'Connected' : 'Connecting…'}</span>
				</div>
				<div class="conn-status-row">
					<span class="conn-dot" class:conn-dot--on={oppConnected} class:conn-dot--off={!oppConnected}></span>
					<span class="conn-label">Opponent</span>
					<span class="conn-state">{oppConnected ? 'Connected' : 'Not connected'}</span>
				</div>
			</div>
			<p class="waiting-hint">{s ? 'Waiting for the TO to start the set.' : 'Connecting to Froggi…'}</p>
		</div>

		<!-- RPS -->
		{:else if phase === 'rps'}
		<div class="phase-section">
			<p class="phase-title">Rock · Paper · Scissors</p>
			{#if myRps}
			<p class="phase-sub">You picked {RPS_EMOJI[myRps]} — waiting for opponent…</p>
			{:else if rpsCountdown === null}
			<p class="phase-sub">Waiting for both players to connect…</p>
			<div class="rps-btns">
				<button class="rps-btn" on:click={() => rpsChoice('rock')}>✊<span>Rock</span></button>
				<button class="rps-btn" on:click={() => rpsChoice('paper')}>✋<span>Paper</span></button>
				<button class="rps-btn" on:click={() => rpsChoice('scissors')}>✌️<span>Scissors</span></button>
			</div>
			{:else}
			<div class="rps-countdown" class:rps-countdown--urgent={rpsCountdown <= 5}>{rpsCountdown}</div>
			<div class="rps-btns">
				<button class="rps-btn" on:click={() => rpsChoice('rock')}>✊<span>Rock</span></button>
				<button class="rps-btn" on:click={() => rpsChoice('paper')}>✋<span>Paper</span></button>
				<button class="rps-btn" on:click={() => rpsChoice('scissors')}>✌️<span>Scissors</span></button>
			</div>
			{/if}
		</div>

		<!-- RPS RESULT: winner chooses strike order -->
		{:else if phase === 'rpsResult'}
		<div class="phase-section">
			{#if rpsWinner === playerNum}
			<p class="phase-title">You won RPS</p>
			<p class="phase-sub">Strike first or second?</p>
			<div class="rps-btns">
				<button class="rps-btn" on:click={() => strikeOrder(playerNum)}>1st<span>Strike first</span></button>
				<button class="rps-btn" on:click={() => strikeOrder(playerNum === 1 ? 2 : 1)}>2nd<span>Strike second</span></button>
			</div>
			{:else}
			<p class="phase-title">{oppName} won RPS</p>
			<p class="phase-sub">Waiting for them to choose the strike order…</p>
			{/if}
		</div>

		<!-- STRIKING (G1) -->
		{:else if phase === 'striking'}
		<div class="phase-section">
			{#if s?.rps?.winner && !(s?.strikes?.length)}
			<p class="rps-result-hint">{firstStriker === playerNum ? 'You strike first' : `${oppName} strikes first`}</p>
			{/if}
			{#if isMyTurn}
			<p class="phase-title">Your turn · strike {strikesLeft} {strikesLeft === 1 ? 'stage' : 'stages'}</p>
			<p class="phase-sub">Tap a stage to strike it</p>
			<div class="stage-grid-p">
				{#each s?.starters ?? [] as stageId}
				{#if !s?.strikes?.includes(stageId)}
				<button class="stage-btn" on:click={() => strikeStage(stageId)}>
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
				</button>
				{:else}
				<div class="stage-btn stage-btn--struck">
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
					<span class="strike-x">✕</span>
				</div>
				{/if}
				{/each}
			</div>
			{:else}
			<p class="phase-title">{oppName} is striking…</p>
			<p class="phase-sub">{strikesLeft} {strikesLeft === 1 ? 'stage' : 'stages'} to go</p>
			<div class="stage-grid-p stage-grid-p--passive">
				{#each s?.starters ?? [] as stageId}
				<div class="stage-btn" class:stage-btn--struck={s?.strikes?.includes(stageId)}>
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
					{#if s?.strikes?.includes(stageId)}<span class="strike-x">✕</span>{/if}
				</div>
				{/each}
			</div>
			{/if}
		</div>

		<!-- STAGE BAN -->
		{:else if phase === 'stageBan'}
		<div class="phase-section">
			{#if isMyTurn}
			<p class="phase-title">Ban a stage</p>
			<div class="stage-grid-p">
				{#each s?.stages ?? [] as stageId}
				{#if !s?.strikes?.includes(stageId)}
				<button class="stage-btn" on:click={() => strikeStage(stageId)}>
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
				</button>
				{:else}
				<div class="stage-btn stage-btn--struck">
					<img src="/image/stages/{stageId}.png" alt="" class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
					<span class="strike-x">✕</span>
				</div>
				{/if}
				{/each}
			</div>
			{:else}
			<p class="phase-title">Opponent is banning a stage…</p>
			<div class="stage-grid-p stage-grid-p--passive">
				{#each s?.stages ?? [] as stageId}
				<div class="stage-btn" class:stage-btn--struck={s?.strikes?.includes(stageId)}>
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
					{#if s?.strikes?.includes(stageId)}<span class="strike-x">✕</span>{/if}
				</div>
				{/each}
			</div>
			{/if}
		</div>

		<!-- STAGE PICK -->
		{:else if phase === 'stagePick'}
		<div class="phase-section">
			{#if s?.agreement}
				{#if s.agreement.requestedBy === playerNum}
				<p class="phase-title">Waiting for {oppName}…</p>
				<p class="phase-sub">You asked to play {stageName(s.agreement.stageId)}. {oppName} has to agree on their phone.</p>
				<button class="undo-like" on:click={() => answerAgreement(false)}>Cancel request</button>
				{:else}
				<p class="phase-title">{oppName} wants to play {stageName(s.agreement.stageId)}</p>
				<p class="phase-sub">They already won a game there, so the rules don't let them pick it — unless you agree. If you decline, they pick another stage.</p>
				<img src="/image/stages/{s.agreement.stageId}.png" alt="" class="stage-display-img" />
				<div class="rps-btns">
					<button class="rps-btn" on:click={() => answerAgreement(true)}>✓<span>Agree</span></button>
					<button class="rps-btn" on:click={() => answerAgreement(false)}>✕<span>Decline</span></button>
				</div>
				{/if}
			{:else if isMyTurn}
			<p class="phase-title">Pick a stage</p>
			<!-- Every legal stage stays in place: banned ones greyed, DSR ones red. -->
			<div class="stage-grid-p">
				{#each pickStages as stageId}
				{@const status = stageStatus(s, stageId)}
				{#if status === 'dsr'}
				<button class="stage-btn stage-btn--dsr" disabled={!s?.allowAgreement} on:click={() => (confirmAgreeStage = stageId)}>
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
					<span class="dsr-tag">{s?.allowAgreement ? 'You won here · ask' : 'You already won here'}</span>
				</button>
				{:else if status === 'struck'}
				<div class="stage-btn stage-btn--struck">
					<img src="/image/stages/{stageId}.png" alt="" class="stage-btn-img" />
					<span>{stageName(stageId)} · Banned</span>
					<span class="strike-x">✕</span>
				</div>
				{:else}
				<button class="stage-btn" on:click={() => pickStage(stageId)}>
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}</span>
				</button>
				{/if}
				{/each}
			</div>
			{#if myDsrStages.length}
			<p class="phase-sub mt-2">Red: you already won a game there, so you can't pick it{s?.allowAgreement ? ` — unless ${oppName} agrees` : ''}.</p>
			{/if}
			{#if confirmAgreeStage !== null}
			<div class="char-confirm-bar">
				<span class="phase-sub">Ask {oppName} to play {stageName(confirmAgreeStage)}?</span>
				<div class="char-confirm-btns">
					<button class="char-confirm-ok" on:click={() => { requestAgreement(confirmAgreeStage ?? 0); confirmAgreeStage = null; }}>Ask</button>
					<button class="char-confirm-cancel" on:click={() => (confirmAgreeStage = null)}>Cancel</button>
				</div>
			</div>
			{/if}
			{:else}
			<p class="phase-title">Opponent is picking a stage…</p>
			<div class="stage-grid-p stage-grid-p--passive">
				{#each pickStages as stageId}
				{@const status = stageStatus(s, stageId)}
				<div class="stage-btn" class:stage-btn--struck={status === 'struck' || status === 'dsr'}>
					<img src="/image/stages/{stageId}.png" alt={stageName(stageId)} class="stage-btn-img" />
					<span>{stageName(stageId)}{status === 'struck' ? ' · Banned' : status === 'dsr' ? ' · DSR' : ''}</span>
					{#if status === 'struck'}<span class="strike-x">✕</span>{/if}
				</div>
				{/each}
			</div>
			{/if}
		</div>

		<!-- CHAR SELECT (double blind) -->
		{:else if phase === 'charSelect'}
		<div class="phase-section">
			{#if myChar !== null && myChar !== undefined}
			<div class="char-picked">
				<div class="char-picked-imgs"><img src="/image/characters/css/{myChar}.png" alt="" class="char-picked-img" />{#if myPartnerChar != null}<img src="/image/characters/css/{myPartnerChar}.png" alt="" class="char-picked-img" />{/if}</div>
				<p class="phase-sub">Locked in — waiting for opponent…</p>
			</div>
			{:else}
			<p class="phase-title">Pick your character</p>
			<p class="phase-sub">Double blind — don't show your screen</p>
			<CharPicker members={myMembers} on:confirm={(e) => confirmChars(e.detail)} />
			{/if}
		</div>

		<!-- CHAR LOCK (winner locks) -->
		{:else if phase === 'charLock'}
		<div class="phase-section">
			{#if isWinner}
			{#if myChar !== null && myChar !== undefined}
			<div class="char-picked">
				<div class="char-picked-imgs"><img src="/image/characters/css/{myChar}.png" alt="" class="char-picked-img" />{#if myPartnerChar != null}<img src="/image/characters/css/{myPartnerChar}.png" alt="" class="char-picked-img" />{/if}</div>
				<p class="phase-sub">Locked in — opponent is picking…</p>
			</div>
			{:else}
			<p class="phase-title">Lock your character</p>
			<p class="phase-sub">Visible to opponent</p>
			<CharPicker members={myMembers} on:confirm={(e) => confirmChars(e.detail)} />
			{/if}
			{:else}
			<p class="phase-title">Opponent is locking their character…</p>
			{/if}
		</div>

		<!-- CHAR PICK (loser picks seeing winner's char) -->
		{:else if phase === 'charPick'}
		<div class="phase-section">
			{#if isLoser}
			{#if myChar !== null && myChar !== undefined}
			<div class="char-picked">
				<div class="char-picked-imgs"><img src="/image/characters/css/{myChar}.png" alt="" class="char-picked-img" />{#if myPartnerChar != null}<img src="/image/characters/css/{myPartnerChar}.png" alt="" class="char-picked-img" />{/if}</div>
				<p class="phase-sub">Locked in!</p>
			</div>
			{:else}
			<p class="phase-title">Pick your character</p>
			{#if oppChar !== null && oppChar !== undefined}
			<div class="opp-locked">
				<span class="phase-sub">Opponent locked:</span>
				<img src="/image/characters/css/{oppChar}.png" alt="" class="char-sm" />{#if oppPartnerChar != null}<img src="/image/characters/css/{oppPartnerChar}.png" alt="" class="char-sm" />{/if}
			</div>
			{/if}
			<CharPicker members={myMembers} on:confirm={(e) => confirmChars(e.detail)} />
			{/if}
			{:else}
			<p class="phase-title">Opponent is picking their character…</p>
			{#if myChar !== null && myChar !== undefined}
			<div class="char-picked">
				<div class="char-picked-imgs"><img src="/image/characters/css/{myChar}.png" alt="" class="char-picked-img" />{#if myPartnerChar != null}<img src="/image/characters/css/{myPartnerChar}.png" alt="" class="char-picked-img" />{/if}</div>
			</div>
			{/if}
			{/if}
		</div>

		<!-- PLAYING -->
		{:else if phase === 'playing'}
		<div class="phase-section playing-view">
			<p class="phase-title">Game {s?.gameNum}</p>
			{#if s?.finalStageId !== null}
			<div class="stage-display">
				<img src="/image/stages/{s?.finalStageId}.png" alt="" class="stage-display-img" />
				<span>{stageName(s?.finalStageId ?? -1)}</span>
			</div>
			{/if}
			<div class="char-vs">
				{#if myChar !== null && myChar !== undefined}
				<div class="char-vs-side">
					<img src="/image/characters/css/{myChar}.png" alt="" class="char-vs-img" />
					<span>{myName}</span>
				</div>
				{/if}
				<span class="vs-label">vs</span>
				{#if oppChar !== null && oppChar !== undefined}
				<div class="char-vs-side">
					<img src="/image/characters/css/{oppChar}.png" alt="" class="char-vs-img" />
					<span>{oppName}</span>
				</div>
				{/if}
			</div>
			<PhoneLiveGame p1Name={s?.p1Name ?? 'Player 1'} p2Name={s?.p2Name ?? 'Player 2'} />
		</div>

		<!-- SET COMPLETE -->
		{:else if phase === 'setComplete'}
		<div class="phase-section set-complete-view">
			<p class="complete-label">
				{(s?.score?.p1 ?? 0) > (s?.score?.p2 ?? 0)
					? (playerNum === 1 ? '🏆 You win the set!' : `${s?.p1Name} wins the set`)
					: (playerNum === 2 ? '🏆 You win the set!' : `${s?.p2Name} wins the set`)}
			</p>
			<p class="complete-score">{s?.score?.p1 ?? 0} – {s?.score?.p2 ?? 0}</p>
		</div>
		{/if}

		<!-- Game history -->
		{#if phase !== 'lobby' && (s?.games?.filter(g => !g.warmup)?.length ?? 0) > 0}
		{@const countedGames = (s?.games ?? []).filter(g => !g.warmup)}
		<div class="game-history">
			<p class="history-label">Games</p>
			{#each countedGames as game, i}
			{@const myCharId = (playerNum === 1 ? game.p1Char : game.p2Char) ?? 0}
			{@const oppCharId = (playerNum === 1 ? game.p2Char : game.p1Char) ?? 0}
			{@const iWon = game.winner === playerNum}
			<div class="history-row">
				<span class="h-gnum">G{i + 1}</span>
				<img class="h-char" class:h-win={iWon} class:h-lose={!iWon}
					src="/image/characters/{myCharId}/0/stock.png" alt="" />
				<img class="h-stage" src="/image/stages/{game.stageId}.png" alt=""
					on:error={hideImgOnError} />
				<img class="h-char" class:h-win={!iWon} class:h-lose={iWon}
					src="/image/characters/{oppCharId}/0/stock.png" alt="" />
				<span class="h-result" class:h-result--w={iWon} class:h-result--l={!iWon}>
					{iWon ? 'W' : 'L'}
				</span>
			</div>
			{/each}
		</div>
		{/if}

	</div>
</div>

<style>
	:global(body) { overflow: hidden; }

	.player-root {
		position: fixed; inset: 0;
		display: flex; flex-direction: column;
		/* Dark by default; light when the phone is in light mode (same palette as the rest of Froggi). */
		--bg: #111; --fg: #e0e0e0; --accent: #40dca5; --on-accent: #111; --win: #4ade80; --bad: #f87171;
		background: var(--bg);
		color: var(--fg);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.top-bar {
		display: flex; align-items: center; justify-content: center;
		gap: 0.75rem; padding: 0.6rem 1rem;
		background: color-mix(in srgb, var(--fg) 4%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--fg) 8%, transparent);
		flex-shrink: 0;
	}
	.top-score { display: flex; align-items: center; gap: 0.5rem; }
	.timeline-wrap { margin-bottom: 0.9rem; }
	.top-name { font-size: 0.8rem; font-weight: 600; }
	.top-name--edit { background: none; border: none; color: inherit; padding: 0; cursor: pointer; }
	.pencil { opacity: 0.45; font-size: 0.75rem; }
	.name-input { width: 9rem; font-size: 0.8rem; font-weight: 600; padding: 0.15rem 0.4rem; border-radius: 0.3rem; border: 1px solid var(--accent); background: color-mix(in srgb, var(--fg) 6%, transparent); color: var(--fg); }
	.top-sep { font-size: 1rem; color: color-mix(in srgb, var(--fg) 30%, transparent); }
	.top-pts { font-size: 1.1rem; font-weight: 800; color: color-mix(in srgb, var(--fg) 45%, transparent); }
	.pts-active { color: var(--accent); }

	/* One screen, no scrolling: the phase fills what's left and the grids stretch into it
	   (scroll is only a fallback for very small screens). */
	.player-body {
		flex: 1; min-height: 0; overflow-y: auto;
		display: flex; flex-direction: column;
		padding: 0.75rem 1rem;
	}

	.waiting-screen {
		flex: 1; display: flex; flex-direction: column; align-items: center;
		justify-content: center; gap: 0.6rem; text-align: center; padding: 1.5rem;
	}
	.app-name {
		font-size: 1.4rem; font-weight: 800; color: var(--accent); letter-spacing: 0.02em;
		margin-bottom: 0.1rem;
	}
	.waiting-role {
		font-size: 0.75rem; color: color-mix(in srgb, var(--fg) 50%, transparent); letter-spacing: 0.05em;
		text-transform: uppercase; margin-bottom: 0.5rem;
	}
	.conn-status-list {
		display: flex; flex-direction: column; gap: 0.4rem;
		background: color-mix(in srgb, var(--fg) 5%, transparent); border-radius: 0.5rem;
		padding: 0.6rem 1rem; min-width: 180px; margin-bottom: 0.25rem;
	}
	.conn-status-row {
		display: flex; align-items: center; gap: 0.6rem;
	}
	.conn-dot {
		width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
	}
	.conn-dot--on { background: #4ade80; }
	.conn-dot--off {
		background: #facc15;
		animation: blink 1.2s ease-in-out infinite;
	}
	.conn-label {
		font-size: 0.75rem; font-weight: 600; color: color-mix(in srgb, var(--fg) 60%, transparent);
		min-width: 5rem; text-align: left;
	}
	.conn-state {
		font-size: 0.75rem; color: color-mix(in srgb, var(--fg) 60%, transparent);
	}
	@keyframes blink {
		0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
	}
	.waiting-hint {
		font-size: 0.72rem; color: color-mix(in srgb, var(--fg) 55%, transparent); max-width: 260px; line-height: 1.5;
	}

	.phase-section { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 0.6rem; }
	.phase-title { font-size: 1.1rem; font-weight: 700; margin: 0; }
	.phase-sub { font-size: 0.8rem; color: color-mix(in srgb, var(--fg) 50%, transparent); margin: 0; }

	.rps-countdown {
		font-size: 2.5rem; font-weight: 700; text-align: center;
		color: color-mix(in srgb, var(--fg) 60%, transparent); margin-bottom: 0.5rem;
		transition: color 0.2s;
	}
	.rps-countdown--urgent { color: var(--bad); }

	.rps-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; }
	.rps-btn {
		flex: 1; min-width: 80px; padding: 1.2rem 0.5rem;
		display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
		font-size: 2rem; background: color-mix(in srgb, var(--fg) 6%, transparent);
		border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent); border-radius: 0.5rem;
		color: var(--fg); cursor: pointer;
	}
	.rps-btn span { font-size: 0.75rem; }
	.rps-btn:active { background: color-mix(in srgb, var(--fg) 12%, transparent); }

	.rps-result-hint {
		font-size: 0.72rem; color: color-mix(in srgb, var(--fg) 60%, transparent);
		margin: 0 0 0.75rem; text-align: center;
	}

	.stage-grid-p {
		flex: 1; min-height: 0; max-height: 34rem;
		display: grid; gap: 0.5rem;
		grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr);
	}
	@media (orientation: landscape) { .stage-grid-p { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
	/* Dim the images, not the labels — opacity washes out to white in light mode. */
	.stage-grid-p--passive { pointer-events: none; }
	.stage-grid-p--passive .stage-btn-img { filter: saturate(0.6) brightness(0.7); }

	.stage-btn {
		position: relative; min-width: 0; min-height: 0;
		display: flex; flex-direction: column; align-items: center;
		background: color-mix(in srgb, var(--fg) 4%, transparent); border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent);
		border-radius: 0.4rem; overflow: hidden; cursor: pointer;
		font-size: 0.65rem; text-align: center; color: var(--fg);
	}
	.stage-btn:active { border-color: var(--accent); }
	.stage-btn--struck { opacity: 0.55; pointer-events: none; }
	.stage-btn--struck .stage-btn-img { filter: grayscale(1) brightness(0.55); }
	.stage-btn-img { width: 100%; flex: 1; min-height: 0; object-fit: cover; display: block; }
	.strike-x {
		position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
		font-size: 1.8rem; color: #ff4444; font-weight: 900;
	}

	.char-picked-imgs { display: flex; gap: 0.5rem; }
	.char-picked { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem 0; }
	.char-picked-img { width: 96px; height: 96px; object-fit: contain; }

	.opp-locked { display: flex; align-items: center; gap: 0.5rem; }
	.char-sm { width: 48px; height: 48px; object-fit: contain; }

	.playing-view { align-items: center; padding-top: 1rem; }
	.stage-display { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; font-size: 0.8rem; }
	.stage-display-img { width: 180px; height: 100px; object-fit: cover; border-radius: 0.35rem; }
	.char-vs { display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; }
	.char-vs-side { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; font-size: 0.75rem; }
	.char-vs-img { width: 72px; height: 72px; object-fit: contain; }
	.vs-label { font-size: 0.7rem; color: color-mix(in srgb, var(--fg) 50%, transparent); }

	.set-complete-view { align-items: center; padding-top: 2rem; gap: 0.5rem; }
	.complete-label { font-size: 1.3rem; font-weight: 800; }
	.complete-score { font-size: 2.5rem; font-weight: 900; color: var(--accent); }

	/* One compact line of game chips — never pushes the stages off screen. */
	.game-history {
		flex-shrink: 0;
		margin-top: 0.6rem;
		padding-top: 0.5rem;
		border-top: 1px solid color-mix(in srgb, var(--fg) 8%, transparent);
		display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem;
	}
	.history-label {
		font-size: 0.6rem; font-weight: 700; text-transform: uppercase;
		letter-spacing: 0.08em; opacity: 0.55; margin-right: 0.2rem;
	}
	.history-row {
		display: flex; align-items: center; gap: 0.3rem;
		padding: 0.15rem 0.4rem; border-radius: 0.3rem; background: color-mix(in srgb, var(--fg) 5%, transparent);
	}
	.h-gnum { font-size: 0.6rem; font-weight: 600; opacity: 0.6; }
	.h-char { width: 1.1rem; height: 1.1rem; object-fit: contain; }
	.h-win { opacity: 1; }
	.h-lose { opacity: 0.35; }
	.h-stage { width: 2.2rem; height: 1.25rem; object-fit: cover; border-radius: 0.2rem; opacity: 0.75; }
	.h-result { font-size: 0.65rem; font-weight: 800; }
	.h-result--w { color: var(--win); }
	.h-result--l { color: color-mix(in srgb, var(--fg) 50%, transparent); }
	.stage-btn--dsr {
		position: relative;
		outline: 2px solid #ef4444;
		opacity: 0.85;
	}
	.stage-btn--dsr:disabled {
		opacity: 0.4;
	}
	.dsr-tag {
		font-size: 0.6rem;
		font-weight: 700;
		color: #ef4444;
		text-transform: uppercase;
	}
	.undo-like {
		margin-top: 0.8rem;
		font-size: 0.8rem;
		opacity: 0.6;
		text-decoration: underline;
		background: none;
		color: inherit;
	}
	.paused-bar { background: #f59e0b; color: #000; text-align: center; font-size: 0.8rem; font-weight: 700; padding: 0.4rem; }
	@media (prefers-color-scheme: light) {
		.player-root { --bg: var(--primary-color); --fg: var(--secondary-color); --accent: #0d8a5f; --on-accent: #fff; --win: #15803d; --bad: #dc2626; }
	}
</style>
