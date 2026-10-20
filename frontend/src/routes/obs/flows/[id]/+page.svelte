<script lang="ts">
	import BackButton from '$lib/components/navigation/BackButton.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { SvelteFlow, Background, Controls, type Node, type Edge } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import { electronEmitter, flows, flowTestResult } from '$lib/utils/store.svelte';
	import type { Flow, FlowNode } from '$lib/models/types/flow';
	import { keyOrigins, keysBefore, knownKeyCheck, listFields, validateFlow } from '$lib/utils/flowEngine';
	import { ACTIONS, CONDITIONS, TRIGGERS } from '$lib/components/flows/flowOptions';
	import FlowNodeView from '$lib/components/flows/FlowNodeView.svelte';
	import FlowNodeConfig from '$lib/components/flows/FlowNodeConfig.svelte';
	import FitOnLoad from '$lib/components/flows/FitOnLoad.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';

	onMount(() => $electronEmitter.emit('FlowsRequest'));

	$: flowId = $page.params.id;
	let flow: Flow | undefined;
	let loadedId = '';
	// Svelte Flow works on its own node/edge stores; the Froggi node lives in data.node.
	const nodes = writable<Node[]>([]);
	const edges = writable<Edge[]>([]);
	const nodeTypes = { flow: FlowNodeView };

	$: if ($flows.length && flowId !== loadedId) load($flows.find((f) => f.id === flowId));
	/** updatedAt of the saved copy on the canvas, and the canvas right after loading (to tell unsaved edits). */
	let loadedAt: string | undefined;
	let baseline: string | null = null;
	let changedElsewhere = false;
	function load(f: Flow | undefined) {
		if (!f) return;
		loadedId = f.id;
		loadedAt = f.updatedAt;
		baseline = null;
		changedElsewhere = false;
		flow = structuredClone(f);
		nodes.set(f.nodes.map((n) => ({ id: n.id, type: 'flow', position: n.position, data: { node: structuredClone(n) } })));
		edges.set(f.edges.map((e) => ({ ...e })));
		if (selectedId && !f.nodes.some((n) => n.id === selectedId)) selectedId = null;
	}
	/** What matters for "unsaved edits": name, on/off, cards and connections. */
	const snap = (f: Flow | undefined) =>
		f
			? JSON.stringify({
					name: f.name,
					enabled: f.enabled,
					nodes: f.nodes.map((n) => ({ ...n, position: { x: Math.round(n.position.x), y: Math.round(n.position.y) } })),
					edges: f.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, ...(e.sourceHandle ? { sourceHandle: e.sourceHandle } : {}) })),
				})
			: '';
	// The saved flow changed (saved here, by the AI assistant, an import…): show it — unless there are
	// unsaved edits on the canvas; then offer Reload instead of throwing them away.
	$: stored = $flows.find((f) => f.id === flowId);
	$: if (stored && flow && stored.id === loadedId && stored.updatedAt !== loadedAt) storedChanged(stored);
	function storedChanged(s: Flow) {
		const edited = baseline !== null && draft !== undefined && snap(draft) !== baseline;
		if (!edited || snap(s) === snap(draft)) load(s);
		else {
			loadedAt = s.updatedAt;
			changedElsewhere = true;
		}
	}

	// Yes / No / Error outputs: colour and label their lines (new connections too).
	const styleFor = (h: string | null | undefined) =>
		h === 'false' ? { label: 'No', style: 'stroke: #f87171;' } : h === 'true' ? { label: 'Yes', style: 'stroke: #4ade80;' } : h === 'error' ? { label: 'Error', style: 'stroke: #f59e0b; stroke-dasharray: 5 4;' } : null;
	$: if ($edges.some((e) => styleFor(e.sourceHandle) && e.label === undefined)) {
		edges.update((list) => list.map((e) => (styleFor(e.sourceHandle) && e.label === undefined ? { ...e, ...styleFor(e.sourceHandle) } : e)));
	}

	let selectedId: string | null = null;
	$: selected = $nodes.find((n) => n.id === selectedId)?.data.node as FlowNode | undefined;
	$: triggerCount = $nodes.filter((n) => (n.data.node as FlowNode).kind === 'trigger').length;
	// Every When card's type — their keys can all be used in the flow.
	$: triggerTypes = [...new Set($nodes.flatMap((n) => { const fn = n.data.node as FlowNode; return fn.kind === 'trigger' ? [fn.data.type] : []; }))];

	const refreshSelected = () => nodes.update((list) => list.map((n) => (n.id === selectedId ? { ...n, data: { node: n.data.node } } : n)));

	const addNode = (kind: FlowNode['kind']) => {
		const id = `${kind}-${Date.now().toString(36)}`;
		const data = kind === 'note' ? { type: 'note', text: '' } : kind === 'trigger' ? TRIGGERS[0].make() : kind === 'condition' ? CONDITIONS[0].make() : ACTIONS[0].make();
		// New When cards go below the lowest card on the left; And/Then cards to the right.
		const position =
			kind === 'trigger'
				? { x: 40, y: 110 + Math.max(0, ...$nodes.map((n) => n.position.y)) }
				: kind === 'note'
				? { x: 40, y: Math.min(0, ...$nodes.map((n) => n.position.y)) - 120 }
				: { x: 260 + Math.max(0, ...$nodes.map((n) => n.position.x)), y: 120 };
		const node = { id, kind, position, data } as FlowNode;
		nodes.update((list) => [...list, { id, type: 'flow', position, data: { node } }]);
		selectedId = id;
	};

	const removeSelected = () => {
		const id = selectedId;
		nodes.update((list) => list.filter((n) => n.id !== id));
		edges.update((list) => list.filter((e) => e.source !== id && e.target !== id));
		selectedId = null;
	};

	/** Canvas → Froggi flow. */
	const current = (): Flow | undefined =>
		flow && {
			...flow,
			nodes: $nodes.map((n) => ({ ...(n.data.node as FlowNode), position: { x: Math.round(n.position.x), y: Math.round(n.position.y) } })),
			edges: $edges.map((e) => ({
				id: e.id,
				source: e.source,
				target: e.target,
				...(e.sourceHandle === 'true' || e.sourceHandle === 'false' || e.sourceHandle === 'error' ? { sourceHandle: e.sourceHandle } : {}),
			})),
		};

	// $nodes / $edges listed so problems follow every edit on the canvas (current() reads them).
	$: draft = flow && $nodes && $edges ? current() : undefined;
	$: if (baseline === null && draft) baseline = snap(draft);
	$: problems = draft ? validateFlow(draft) : [];
	$: isKnown = draft ? knownKeyCheck(draft) : () => true;

	const save = () => {
		const f = current();
		if (!f) return;
		const issues = validateFlow(f);
		if (issues.length) return notifications.warning(issues.join(' · '), 4000);
		$electronEmitter.emit('FlowSave', f);
		notifications.success('Flow saved', 1500);
	};
	let testing = false;
	const test = () => {
		const f = current();
		if (!f || validateFlow(f).length) return save();
		save();
		testing = true;
		flowTestResult.set(undefined);
		setTimeout(() => $electronEmitter.emit('FlowTest', f.id), 200);
	};
	$: if ($flowTestResult?.flowId === flowId) testing = false;
	$: testResult = $flowTestResult?.flowId === flowId ? $flowTestResult : undefined;
</script>

<main class="flex justify-center">
	<div class="w-full flex flex-col gap-2 flow-page">
		<BackButton />
		<div class="header">
			{#if flow}
				<input class="name-input border-secondary" bind:value={flow.name} />
				<label class="enabled"><input type="checkbox" class="toggle-check" bind:checked={flow.enabled} /> Enabled</label>
				<div class="ml-auto flex gap-2">
					<button class="btn text-xs h-8 px-3 border-secondary rounded" disabled={testing} on:click={test}>{testing ? 'Testing…' : 'Test'}</button>
					<button class="btn text-xs h-8 px-4 border-secondary rounded" on:click={save}>Save</button>
				</div>
			{/if}
		</div>

		{#if changedElsewhere}
			<div class="changed border-secondary">
				<span>This flow was changed elsewhere (e.g. by the AI assistant) while you were editing it.</span>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => load(stored)}>Reload — drop my edits</button>
				<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => (changedElsewhere = false)}>Keep mine</button>
			</div>
		{/if}
		{#if !flow}
			<p class="text-sm opacity-50">Loading flow…</p>
		{:else}
			<div class="editor">
				<div class="canvas border-secondary">
					<SvelteFlow
						{nodes}
						{edges}
						{nodeTypes}
						fitView
						minZoom={0.2}
						colorMode="dark"
						on:nodeclick={(e) => (selectedId = e.detail.node.id)}
						on:paneclick={() => (selectedId = null)}
					>
						<Background />
						<Controls />
						<FitOnLoad />
					</SvelteFlow>
				</div>
				<aside class="side border-secondary">
					<div class="flex gap-2 mb-3">
						<button class="btn text-xs h-7 px-2 border-secondary rounded flex-1 whitespace-nowrap" on:click={() => addNode('trigger')}>+ When</button>
						<button class="btn text-xs h-7 px-2 border-secondary rounded flex-1 whitespace-nowrap" on:click={() => addNode('condition')}>+ And</button>
						<button class="btn text-xs h-7 px-2 border-secondary rounded flex-1 whitespace-nowrap" on:click={() => addNode('action')}>+ Then</button>
						<button class="btn text-xs h-7 px-2 border-secondary rounded flex-1 whitespace-nowrap" on:click={() => addNode('note')}>+ Note</button>
					</div>
					{#if selected}
						{#key selectedId}
							<FlowNodeConfig node={selected} {triggerTypes} available={draft && selectedId ? keysBefore(draft, selectedId) : []} origins={draft && selectedId ? keyOrigins(draft, selectedId) : {}} listItemFields={draft && selected?.kind === 'action' && selected.data.type === 'list' ? listFields(draft, selected.data.key) : []} {isKnown} canRemove={selected.kind !== 'trigger' || triggerCount > 1} on:change={refreshSelected} on:delete={removeSelected} />
						{/key}
					{:else}
						<p class="text-xs opacity-50">Click a node to edit it. Drag from a node's right dot to another node's left dot to connect them: When → And → Then. An action runs when every And on its path holds.</p>
					{/if}
					{#if problems.length}
						<p class="problems">{problems.join(' · ')}</p>
					{/if}
					{#if testResult}
						<div class="test-result">
							<p class="result-label">Test result</p>
							<p class="hint">Every action ran once with example trigger values and the live game state.</p>
							{#each testResult.results as r}
								<p class="result" class:result--bad={!r.ok}><b>{r.ok ? '✓' : '✕'} {ACTIONS.find((a) => a.type === r.action)?.label ?? r.action}</b> {r.detail}</p>
							{:else}
								<p class="hint">No actions.</p>
							{/each}
						</div>
					{/if}
				</aside>
			</div>
		{/if}
	</div>
</main>

<style>
	.changed { display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.8rem; border-radius: 0.375rem; font-size: 0.8rem; border-left: 3px solid #f59e0b; }

	.header { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; min-height: 2.25rem; }
	.enabled { display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; }
	.toggle-check { width: 0.9rem; height: 0.9rem; }
	.result-label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.45; }
	.test-result { margin-top: 0.9rem; display: flex; flex-direction: column; gap: 0.35rem; }
	.hint { font-size: 0.68rem; opacity: 0.5; }
	.result { font-size: 0.7rem; word-break: break-word; user-select: text; }
	.result--bad { color: #f87171; }
	.name-input { height: 2rem; padding: 0 0.6rem; font-size: 0.95rem; font-weight: 600; background: transparent; color: var(--secondary-color); border-radius: 0.3rem; min-width: 12rem; }
	/* Use the whole window: the canvas takes all space next to the settings panel. */
	.flow-page { max-width: min(100%, 1800px); }
	.editor { display: grid; grid-template-columns: minmax(0, 1fr) 19rem; gap: 0.75rem; height: calc(100vh - 11rem); min-height: 22rem; }
	@media (max-width: 900px) {
		.editor { grid-template-columns: 1fr; grid-template-rows: 60vh auto; height: auto; }
	}
	.canvas { border-radius: 0.5rem; overflow: hidden; }
	.side { border-radius: 0.5rem; padding: 0.8rem; overflow-y: auto; }
	.problems { margin-top: 0.8rem; font-size: 0.7rem; color: #f59e0b; }
</style>
