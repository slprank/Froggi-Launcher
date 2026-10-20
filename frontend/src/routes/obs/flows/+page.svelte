<script lang="ts">
	import BackButton from '$lib/components/navigation/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { electronEmitter, flowFailures, flows } from '$lib/utils/store.svelte';
	import { flowProblems } from '$lib/utils/flowProblems';
	import type { Flow } from '$lib/models/types/flow';
	import { describe } from '$lib/components/flows/flowOptions';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import { MODAL_CLOSE_MS } from '$lib/models/const';
	import { DEMO_FLOWS } from '$lib/content/demoFlows';

	/** Copy a demo into your flows (disabled) and open it to set your URL / scene names. */
	const useDemo = (demo: Flow) => {
		const id = `flow-${Date.now().toString(36)}`;
		const { description: _d, ...flow } = demo as Flow & { description?: string };
		$electronEmitter.emit('FlowSave', { ...flow, id, enabled: false });
		setTimeout(() => goto(`/obs/flows/${id}`), 150);
	};

	// Automation flows: WHEN something happens AND conditions hold THEN do things (POST / OBS).
	onMount(() => {
		$electronEmitter.emit('FlowsRequest');
		$electronEmitter.emit('FlowFailuresRequest');
	});

	const newFlow = () => {
		const id = `flow-${Date.now().toString(36)}`;
		const flow: Flow = {
			id,
			name: 'New flow',
			enabled: false,
			nodes: [
				{ id: 'trigger', kind: 'trigger', position: { x: 40, y: 120 }, data: { type: 'gameStart' } },
				{ id: 'action', kind: 'action', position: { x: 300, y: 120 }, data: { type: 'obsSaveReplay' } },
			],
			edges: [{ id: 'trigger-action', source: 'trigger', target: 'action' }],
		};
		$electronEmitter.emit('FlowSave', flow);
		setTimeout(() => goto(`/obs/flows/${id}`), 150);
	};

	const toggle = (flow: Flow) => $electronEmitter.emit('FlowSave', { ...flow, enabled: !flow.enabled });
	const summary = (flow: Flow) => {
		const t = flow.nodes.find((n) => n.kind === 'trigger');
		const actions = flow.nodes.filter((n) => n.kind === 'action').length;
		return `${t ? describe(t) : '—'} → ${actions} action${actions === 1 ? '' : 's'}`;
	};

	let deleting: Flow | null = null;
	let confirmOpen = false;
	const askDelete = (flow: Flow) => {
		deleting = flow;
		confirmOpen = true;
	};
	const doDelete = () => {
		const id = deleting?.id;
		confirmOpen = false;
		setTimeout(() => id && $electronEmitter.emit('FlowDelete', id), MODAL_CLOSE_MS);
	};
	/** Singles / Doubles tag when the flow has a "Game format is" condition. */
	const formatTag = (flow: Flow) => {
		const c = flow.nodes.find((n) => n.kind === 'condition' && n.data.type === 'gameFormat');
		return c?.kind === 'condition' && c.data.type === 'gameFormat' ? c.data.format : '';
	};
	$: sorted = [...$flows].sort((a, b) => a.name.localeCompare(b.name));
	// Flows → Problems (generic checks: scenes nothing switches to, invalid flows, failures).
	$: problemCount = flowProblems($flows, $flowFailures).length;
</script>

<main class="flex justify-center">
	<div class="w-full max-w-2xl">
		<BackButton />
		<div class="flex items-center gap-3 mb-2">
			<h1 class="text-xl font-semibold text-secondary-color">Flows</h1>
			<button class="btn text-sm h-8 px-3 border-secondary rounded ml-auto" on:click={() => $electronEmitter.emit('FlowImport')}>Import .froggi</button>
			<button class="btn text-sm h-8 px-4 border-secondary rounded" on:click={newFlow}>+ New flow</button>
		</div>
		<p class="text-xs opacity-50 mb-4">
			WHEN something happens in the game, AND your conditions hold, THEN Froggi switches scenes, sends a web
			request or controls OBS. The "Scene switching" flow decides which scene your overlays show.
		</p>
		{#if problemCount}
			<div class="scene-warning">
				<span>{problemCount} thing{problemCount === 1 ? '' : 's'} to check in your flows.</span>
				<button class="btn text-xs h-7 px-3 border-secondary rounded shrink-0" on:click={() => goto('/obs/flows/problems')}>See problems</button>
			</div>
		{/if}
		<div class="flex flex-col gap-2">
			{#each sorted as flow (flow.id)}
				<div class="flow-row border-secondary">
					<input type="checkbox" class="toggle-check" checked={flow.enabled} on:change={() => toggle(flow)} title="Enabled" />
					<button class="flow-main" on:click={() => goto(`/obs/flows/${flow.id}`)}>
						<span class="flow-name">{flow.name}</span>
						<span class="flow-sum">{summary(flow)}</span>
					</button>
					{#if formatTag(flow)}<span class="pill-tag">{formatTag(flow)}</span>{/if}
					<button class="text-xs opacity-50 hover:opacity-100" on:click={() => $electronEmitter.emit('FlowExport', flow.id)} title="Share as a .froggi file (bearer tokens are left out)">Export</button>
					<button class="text-xs opacity-50 hover:opacity-100" on:click={() => askDelete(flow)}>Delete</button>
				</div>
			{:else}
				<p class="text-sm opacity-50">No flows yet — start from a demo below, create one, or ask the AI assistant to build it.</p>
			{/each}
		</div>

		<p class="section-label mt-6 mb-2">Demo flows</p>
		<div class="flex flex-col gap-2">
			{#each DEMO_FLOWS as demo (demo.id)}
				<div class="flow-row border-secondary">
					<div class="flow-main">
						<span class="flow-name">{demo.name}</span>
						<span class="flow-sum">{demo.description}</span>
					</div>
					{#if formatTag(demo)}<span class="pill-tag">{formatTag(demo)}</span>{/if}
					<button class="btn text-xs h-7 px-3 border-secondary rounded" on:click={() => useDemo(demo)}>Use</button>
				</div>
			{/each}
		</div>
	</div>
</main>

<ConfirmModal bind:open={confirmOpen} on:confirm={doDelete}>Delete the flow "{deleting?.name}"?</ConfirmModal>

<style>
	.flow-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.8rem; border-radius: 0.375rem; }
	.flow-main { flex: 1; display: flex; flex-direction: column; text-align: left; background: none; color: var(--secondary-color); min-width: 0; }
	.flow-name { font-size: 0.9rem; font-weight: 600; }
	.flow-sum { font-size: 0.72rem; opacity: 0.5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.pill-tag { font-size: 0.65rem; text-transform: uppercase; opacity: 0.6; white-space: nowrap; }
	.section-label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.45; }
	.flow-sum { white-space: normal; }
	.toggle-check { width: 0.9rem; height: 0.9rem; }
	.scene-warning {
		display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding: 0.6rem 0.8rem; border-radius: 0.375rem;
		font-size: 0.78rem; border: 1px solid #f59e0b; background: color-mix(in srgb, #f59e0b 12%, transparent);
	}
</style>
