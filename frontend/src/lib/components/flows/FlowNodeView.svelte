<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
	import { FLOW_ERROR_ACTIONS, type FlowNode } from '$lib/models/types/flow';
	import { describe } from './flowOptions';

	// Svelte Flow custom node: data = the Froggi flow node (kind + config).
	export let data: { node: FlowNode };
	export let selected = false;

	const HEAD: Record<FlowNode['kind'], string> = { trigger: 'WHEN', condition: 'AND', action: 'THEN', note: 'NOTE' };
	$: isTimer = data.node.kind === 'action' && data.node.data.type === 'timer';
	// Outputs: And cards → Yes (right) / No (bottom); actions → Continue (right) and, when they can fail,
	// Error (bottom right, {{error}} = the reason).
	$: isCondition = data.node.kind === 'condition';
	$: canFail = data.node.kind === 'action' && FLOW_ERROR_ACTIONS.includes(data.node.data.type);
</script>

<!-- Timer cards look different: the cards after them run later. -->
<div class="flow-node flow-node--{data.node.kind}" class:flow-node--timer={isTimer} class:flow-node--selected={selected}>
	{#if data.node.kind !== 'trigger' && data.node.kind !== 'note'}
		<Handle type="target" position={Position.Left} />
	{/if}
	<span class="head">{isTimer ? 'TIMER' : HEAD[data.node.kind]}</span>
	<span class="text">{describe(data.node)}</span>
	{#if data.node.kind !== 'note'}
		<Handle type="source" position={Position.Right} />
	{/if}
	{#if isCondition}
		<Handle type="source" position={Position.Bottom} id="false" style="left: 50%; background: #f87171;" />
		<span class="out out--false" style="left: 50%;" title="No">No</span>
	{/if}
	{#if canFail}
		<Handle type="source" position={Position.Bottom} id="error" style="left: 75%; background: #f59e0b;" />
		<span class="out out--error" style="left: 75%;" title="Failed — {'{{error}}'} holds the reason">Error</span>
	{/if}
</div>

<style>
	.flow-node {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 11rem;
		max-width: 16rem;
		padding: 0.5rem 0.7rem;
		border-radius: 0.5rem;
		background: #16181d;
		color: #e5e7eb;
		border: 1px solid #2f343d;
		font-size: 0.75rem;
	}
	.flow-node--selected {
		box-shadow: 0 0 0 2px #e5e7eb;
	}
	.head {
		font-size: 0.6rem;
		font-weight: 800;
		letter-spacing: 0.08em;
	}
	.flow-node--trigger .head { color: #60a5fa; }
	.flow-node--condition .head { color: #facc15; }
	.flow-node--action .head { color: #4ade80; }
	.flow-node--trigger { border-left: 3px solid #60a5fa; }
	.flow-node--condition { border-left: 3px solid #facc15; }
	.flow-node--action { border-left: 3px solid #4ade80; }
	.flow-node--timer { border-left: 3px solid #fb923c; }
	.flow-node--condition, .flow-node--action { padding-bottom: 0.8rem; }
	.out { position: absolute; bottom: 0.05rem; transform: translateX(-50%); font-size: 0.55rem; font-weight: 800; pointer-events: none; }
	.out--false { color: #f87171; }
	.out--error { color: #f59e0b; }
	/* Notes: a sticky note, wider text, no connections. */
	.flow-node--note { background: #2b2614; border: 1px solid #5c4f1f; border-left: 3px solid #fde047; max-width: 20rem; }
	.flow-node--note .head { color: #fde047; }
	.flow-node--note .text { white-space: pre-wrap; line-height: 1.35; }
	.flow-node--timer .head { color: #fb923c; }
</style>
