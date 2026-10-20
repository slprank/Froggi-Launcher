<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import StateTree from './StateTree.svelte';
	import { electronEmitter, flowGameState } from '$lib/utils/store.svelte';
	import { SAMPLE_TOKENS, TRIGGER_TOKENS } from '$lib/utils/flowEngine';
	import { flattenState, SAMPLE_GAME_STATE } from '$lib/utils/flowState';
	import type { FlowTrigger } from '$lib/models/types/flow';

	// Pick a key: the trigger's keys and the whole game state as expandable trees (live values when
	// a game is running, example values otherwise). Search lists matching paths instead.
	export let open: boolean;
	export let triggerTypes: FlowTrigger['type'][] = [];
	const dispatch = createEventDispatcher<{ pick: string }>();

	$: if (open) $electronEmitter.emit('FlowStateRequest');
	$: live = !!$flowGameState && Object.keys($flowGameState.players ?? {}).length > 0;
	// Public addresses stay hidden in the picker (like everywhere else); flows still get the real value.
	const hideLinks = (st: typeof SAMPLE_GAME_STATE | undefined) =>
		st && { ...st, links: { tailscale: st.links?.tailscale ? 'hidden' : null, ngrok: st.links?.ngrok ? 'hidden' : null } };
	$: state = hideLinks(live ? $flowGameState : SAMPLE_GAME_STATE);

	/** "players.1.name" keys → nested object for the tree. */
	const unflatten = (keys: string[]) => {
		const root: Record<string, unknown> = {};
		for (const key of keys) {
			const parts = key.split('.');
			let node = root;
			parts.slice(0, -1).forEach((p) => (node = (node[p] ??= {}) as Record<string, unknown>));
			node[parts[parts.length - 1]] = SAMPLE_TOKENS[key] ?? null;
		}
		return root;
	};
	$: trigger = unflatten([...new Set(triggerTypes.flatMap((t) => TRIGGER_TOKENS[t] ?? []))]);

	let filter = '';
	$: q = filter.trim().toLowerCase();
	$: matches = q
		? Object.entries({ ...flattenState(trigger, ''), ...flattenState(state, 'state') }).filter(([k]) => k.toLowerCase().includes(q)).slice(0, 80)
		: [];

	const pick = (key: string) => {
		dispatch('pick', key);
		open = false;
	};
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div class="confirm-box background-primary-color border-secondary text-secondary-color">
		<p class="title">Insert a key</p>
		<p class="desc">
			Expand until you reach a value and click it. {live ? 'Values are from the current game (or the last one).' : 'No game yet — showing example values.'}
		</p>
		<input class="filter border-secondary" placeholder="Search, e.g. percent" bind:value={filter} />
		<div class="list">
			{#if q}
				{#each matches as [key, v] (key)}
					<button class="match" on:click={() => pick(key)}><code>{key}</code><span>{v ?? '–'}</span></button>
				{:else}
					<p class="desc">Nothing matches.</p>
				{/each}
			{:else}
				{#if Object.keys(trigger).length}
					<p class="section">{triggerTypes.length > 1 ? 'The triggers' : 'This trigger'}</p>
					<StateTree value={trigger} path="" openDepth={0} on:pick={(e) => pick(e.detail)} />
				{/if}
				<p class="section">Game state</p>
				<StateTree value={state} path="state" openDepth={0} on:pick={(e) => pick(e.detail)} />
			{/if}
		</div>
		<div class="actions">
			<button class="btn text-sm h-9 px-5 border-secondary rounded" on:click={() => (open = false)}>Cancel</button>
		</div>
	</div>
</Modal>

<style>
	.confirm-box { max-width: 440px; width: 100%; padding: 1.25rem; border-radius: 0.375rem; display: flex; flex-direction: column; gap: 0.6rem; }
	.title { font-weight: 700; }
	.desc { font-size: 0.75rem; opacity: 0.55; }
	.filter { height: 2.1rem; padding: 0 0.7rem; background: transparent; color: var(--secondary-color); border-radius: 0.3rem; }
	.list { max-height: 55vh; overflow-y: auto; }
	.section { font-size: 0.65rem; text-transform: uppercase; opacity: 0.45; margin: 0.5rem 0 0.2rem; }
	.match { display: flex; gap: 0.6rem; width: 100%; padding: 0.2rem 0.3rem; border-radius: 0.2rem; background: none; color: inherit; text-align: left; font-size: 0.72rem; }
	.match:hover { background: color-mix(in srgb, var(--secondary-color) 12%, transparent); }
	.match span { margin-left: auto; opacity: 0.55; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 45%; }
	.actions { display: flex; justify-content: flex-end; }
</style>
