<script lang="ts">
	import GameStateRender from '$lib/components/viewer/GameStateRender.svelte';
	import type { ViewerFrame, ViewerSettings } from '$lib/utils/viewer/renderData';

	// Preview of the live viewer's KO effects (utils/viewer/koEffects.ts): a Fox that dies on demand —
	// each button switches it from standing to a dead action state (sides / bottom blast, top = star).
	const STAGES: { id: number; label: string }[] = [
		{ id: 31, label: 'Battlefield' },
		{ id: 32, label: 'Final Destination' },
		{ id: 8, label: "Yoshi's Story" },
	];
	const KOS: { label: string; state: number; x: number; y: number }[] = [
		{ label: 'KO left', state: 1, x: -224, y: 40 },
		{ label: 'KO right', state: 2, x: 224, y: 60 },
		{ label: 'KO bottom', state: 0, x: -40, y: -108 },
		{ label: 'KO top (star)', state: 4, x: 20, y: 190 },
	];
	let stageId = 31;
	let camera: 'static' | 'live' = 'static';
	let frameNo = 0;
	const standing = { actionStateId: 14, positionX: 0, positionY: 0.01 };
	let post = { ...standing };

	$: settings = { stageId, isTeams: false, players: [{ playerIndex: 0, characterId: 2 }] } as ViewerSettings;
	$: frame = {
		frame: frameNo,
		players: { 0: { post: { playerIndex: 0, internalCharacterId: 1, facingDirection: 1, actionStateCounter: 1, ...post }, pre: {} } },
	} as ViewerFrame;

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
	async function ko(k: (typeof KOS)[number]) {
		// last position before the KO = at the blast zone (this is where the effect appears)
		post = { ...standing, actionStateId: 88, positionX: k.x, positionY: k.y };
		frameNo++;
		await sleep(80);
		post = { actionStateId: k.state, positionX: k.x, positionY: k.y };
		frameNo++;
		await sleep(1600);
		post = { ...standing };
		frameNo++;
	}
	async function all() {
		for (const k of KOS) await ko(k);
	}
</script>

<main class="flex justify-center p-4">
	<div class="w-full max-w-3xl flex flex-col gap-3 text-secondary-color">
		<p class="dash-label">KO effects preview</p>
		<div class="flex flex-wrap gap-2">
			{#each KOS as k (k.label)}
				<button class="btn text-sm h-9 px-3 border-secondary rounded" on:click={() => ko(k)}>{k.label}</button>
			{/each}
			<button class="btn text-sm h-9 px-3 border-secondary rounded" on:click={all}>▶ All</button>
		</div>
		<div class="flex flex-wrap gap-2 items-center text-sm">
			<select class="background-primary-color border-secondary rounded h-9 px-2" bind:value={stageId}>
				{#each STAGES as s (s.id)}<option value={s.id}>{s.label}</option>{/each}
			</select>
			<select class="background-primary-color border-secondary rounded h-9 px-2" bind:value={camera}>
				<option value="static">Static camera</option>
				<option value="live">Live camera</option>
			</select>
		</div>
		<div class="w-full aspect-video border-secondary rounded overflow-hidden">
			<GameStateRender {settings} {frame} {camera} />
		</div>
	</div>
</main>
