<script lang="ts">
	import type { StrikeState } from '$lib/models/types/stageStriking';
	import { strikeTimeline, type TimelineStep } from '$lib/utils/strikeStageStatus';

	// Who struck / banned / picked which stage, in order — a progress bar for the stage choice.
	export let state: StrikeState | undefined;
	/** Colour of finished steps (phones use their green; the dashboard its theme colour). */
	export let accent = '#40dca5';

	$: steps = strikeTimeline(state);
	const nameOf = (s: StrikeState | undefined, step: TimelineStep) =>
		step.player === 1 ? s?.p1Name : step.player === 2 ? s?.p2Name : 'Last stage';
	const LABEL: Record<TimelineStep['kind'], string> = { strike: 'strike', ban: 'ban', pick: 'pick', final: 'played' };
</script>

{#if steps.length}
	<div class="timeline" style:--tl-accent={accent}>
		{#each steps as step}
			<div class="step" class:step--done={step.stageId !== null} class:step--current={step.current} class:step--final={step.kind === 'final' || step.kind === 'pick'}>
				<div class="bar" />
				<div class="thumb">
					{#if step.stageId !== null}
						<img src="/image/stages/{step.stageId}.png" alt="" />
						{#if step.kind === 'strike' || step.kind === 'ban'}<span class="x">✕</span>{/if}
					{:else}
						<span class="q">?</span>
					{/if}
				</div>
				<span class="who">{nameOf(state, step)}</span>
				<span class="what">{LABEL[step.kind]}</span>
			</div>
		{/each}
	</div>
{/if}

<style>
	.timeline { display: flex; gap: 0.3rem; width: 100%; }
	.step { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 0.2rem; opacity: 0.45; }
	.step--done, .step--current { opacity: 1; }
	.bar { width: 100%; height: 4px; border-radius: 2px; background: currentColor; opacity: 0.25; }
	.step--done .bar { background: var(--tl-accent); opacity: 1; }
	.step--current .bar { background: var(--tl-accent); opacity: 1; animation: pulse 1.2s ease-in-out infinite; }
	/* Capped so the timeline never pushes the stages off a landscape phone. */
	.thumb { position: relative; width: 100%; aspect-ratio: 16 / 9; max-height: 3.6rem; border-radius: 0.25rem; overflow: hidden; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); display: flex; align-items: center; justify-content: center; }
	.thumb img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) brightness(0.55); }
	.step--final.step--done .thumb { border: 2px solid #22c55e; }
	.step--final.step--done .thumb img { filter: none; }
	.x { position: absolute; color: #ef4444; font-weight: 800; font-size: 0.9rem; }
	.q { opacity: 0.4; font-weight: 700; font-size: 0.8rem; }
	.who { font-size: 0.62rem; font-weight: 600; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.what { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.6; }
	@media (orientation: landscape) and (max-height: 500px) { .thumb { max-height: 2.2rem; } }
	@keyframes pulse { 50% { opacity: 0.35; } }
</style>
