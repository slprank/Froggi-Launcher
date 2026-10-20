<script lang="ts">
	import BackButton from '$lib/components/navigation/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { electronEmitter, flowFailures, flows } from '$lib/utils/store.svelte';
	import { flowProblems } from '$lib/utils/flowProblems';

	// Flows → Problems: scenes nothing switches to, enabled flows that don't validate, recent action failures.
	onMount(() => {
		$electronEmitter.emit('FlowsRequest');
		$electronEmitter.emit('FlowFailuresRequest');
	});

	$: problems = flowProblems($flows, $flowFailures);
	$: errors = problems.filter((p) => p.kind !== 'scene');
	$: scenes = problems.filter((p) => p.kind === 'scene');
	const time = (iso?: string) => (iso ? new Date(iso).toLocaleTimeString() : '');
</script>

<main class="flex justify-center">
	<div class="w-full max-w-2xl">
		<BackButton />
		<h1 class="text-xl font-semibold text-secondary-color mb-1">Flow problems</h1>
		<p class="text-xs opacity-50 mb-5">Things to check in your flows. The AI assistant can read this list too.</p>

		{#if !problems.length}
			<p class="text-sm opacity-60">No problems — every scene can be reached and your flows run fine.</p>
		{/if}

		{#if errors.length}
			<div class="section-head">
				<p class="section-label">Errors</p>
				{#if $flowFailures.length}
					<button class="link" on:click={() => $electronEmitter.emit('FlowFailuresClear')}>Clear failures</button>
				{/if}
			</div>
			<div class="flex flex-col gap-2 mb-6">
				{#each errors as p, i (i)}
					<div class="problem problem--error border-secondary">
						<span class="flex-1">{p.message}{#if p.at}<span class="when"> · {time(p.at)}</span>{/if}</span>
						{#if p.flowId && $flows.some((f) => f.id === p.flowId)}
							<button class="btn text-xs h-7 px-3 border-secondary rounded shrink-0" on:click={() => goto(`/obs/flows/${p.flowId}`)}>Open</button>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		{#if scenes.length}
			<div class="section-head">
				<p class="section-label">Scenes nothing switches to</p>
				<button class="link" on:click={() => $electronEmitter.emit('FlowRestoreSceneDefault')}>Restore default Scene switching flow</button>
			</div>
			<p class="text-xs opacity-50 mb-2">Froggi changes scenes only through flows ("Set Froggi scene" cards in enabled flows). Fine to ignore for scenes you never use.</p>
			<div class="flex flex-col gap-2">
				{#each scenes as p (p.scene)}
					<div class="problem problem--warning border-secondary">{p.message}</div>
				{/each}
			</div>
		{/if}
	</div>
</main>

<style>
	.section-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; }
	.section-label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.45; }
	.problem { display: flex; align-items: center; gap: 0.75rem; padding: 0.55rem 0.8rem; border-radius: 0.375rem; font-size: 0.8rem; }
	.problem--error { border-left: 3px solid #f87171; }
	.problem--warning { border-left: 3px solid #f59e0b; }
	.when { opacity: 0.5; font-size: 0.72rem; }
	.link { background: none; color: inherit; text-decoration: underline; font-size: 0.72rem; opacity: 0.75; }
	.link:hover { opacity: 1; }
</style>
