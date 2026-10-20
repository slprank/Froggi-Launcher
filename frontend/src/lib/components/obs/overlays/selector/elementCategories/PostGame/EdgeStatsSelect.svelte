<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../visibilityCategories/SelectVisibilityOption.svelte';

	const dispatch = createEventDispatcher();
	const select = (e: CustomEvent<CustomElement>) => dispatch('select', e.detail);

	const METRICS = [
		{ key: 'EdgeCancels', label: 'Edge Cancels', tip: 'Aerials landed on a ledge/platform edge that skipped landing lag' },
		{ key: 'EdgeCancelsSlow', label: 'Slow Edge Cancels', tip: 'Edge cancels done late (some landing lag)' },
		{ key: 'Edgeguards', label: 'Edgeguards', tip: 'Times the opponent was knocked off stage and lost the stock before getting back' },
		{ key: 'EdgeguardAttempts', label: 'Edgeguard Attempts', tip: 'Times the opponent was off stage and in hitstun' },
		{ key: 'EdgeguardPercent', label: 'Edgeguard %', tip: 'Edgeguards ÷ attempts' },
	] as const;

	const groups = ([false, true] as const).map((match) => ({
		title: match ? 'Whole set' : 'This game',
		items: (['Player1', 'Player2'] as const).flatMap((who) =>
			METRICS.map((m) => ({
				value: CustomElement[`${match ? 'PostGameMatch' : 'PostGame'}${who}${m.key}`],
				label: `${who.replace(/(\d)/, ' $1')} ${m.label}`,
				tip: m.tip,
			})),
		),
	}));
</script>

<div class="flex flex-col gap-2">
	<p class="text-xs opacity-50">Edgeguards are counted on the opponent (in doubles: the first opponent). Values update when a game ends.</p>
	{#each groups as g (g.title)}
		<p class="section-label">{g.title}</p>
		{#each g.items as item (item.value)}
			<SelectOption description={item.tip} value={item.value} on:select={select}>{item.label}</SelectOption>
		{/each}
	{/each}
</div>
