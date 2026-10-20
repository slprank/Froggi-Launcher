<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../visibilityCategories/SelectVisibilityOption.svelte';

	const dispatch = createEventDispatcher();
	const select = (e: CustomEvent<CustomElement>) => dispatch('select', e.detail);

	const METRICS = [
		{ key: 'Damage', label: 'Damage Dealt', tip: 'Percent dealt to opponents (teammate hits excluded)' },
		{ key: 'Kos', label: 'KOs', tip: 'Opponents KO\'d (credited to the last hitter)' },
		{ key: 'AvgKoPercent', label: 'Avg KO %', tip: 'Average percent the opponent was at when KO\'d' },
		{ key: 'AvgDeathPercent', label: 'Avg Death %', tip: 'Average percent at death (SDs included)' },
	] as const;

	const groups: { title: string; items: { value: CustomElement; label: string; tip: string }[] }[] = [
		{
			title: 'Teams',
			items: [
				{ value: CustomElement.Team1Name, label: 'Team 1 Name', tip: 'Custom team name (Dashboard), else "Tag & Tag"' },
				{ value: CustomElement.Team2Name, label: 'Team 2 Name', tip: 'Custom team name (Dashboard), else "Tag & Tag"' },
				{ value: CustomElement.Team1Stocks, label: 'Team 1 Stocks', tip: 'Total stocks left for Team 1' },
				{ value: CustomElement.Team2Stocks, label: 'Team 2 Stocks', tip: 'Total stocks left for Team 2' },
				{ value: CustomElement.CurrentPlayerTeamName, label: 'Your Team Name', tip: 'The team of the current (local) player' },
				{ value: CustomElement.OpponentTeamName, label: 'Opponent Team Name', tip: 'The other team' },
				{ value: CustomElement.CurrentPlayerTeamStocks, label: 'Your Team Stocks', tip: 'Total stocks of your team' },
				{ value: CustomElement.OpponentTeamStocks, label: 'Opponent Team Stocks', tip: 'Total stocks of the other team' },
			],
		},
		...([false, true] as const).map((match) => ({
			title: match ? 'Fight stats · whole set' : 'Fight stats · this game',
			items: (['Player1', 'Player2', 'Team1', 'Team2'] as const).flatMap((who) =>
				METRICS.map((m) => ({
					value: CustomElement[`${match ? 'LiveMatch' : 'Live'}${who}${m.key}`],
					label: `${who.replace(/(\d)/, ' $1')} ${m.label}`,
					tip: `${m.tip}${who.startsWith('Team') ? ' — both players summed (singles: the player)' : ''}`,
				})),
			),
		})),
		{
			title: 'Ports',
			items: [
				{ value: CustomElement.Player1Port, label: 'Player 1 Port', tip: '"P1"–"P4" — use Styling → Player to show any doubles player' },
				{ value: CustomElement.Player2Port, label: 'Player 2 Port', tip: '"P1"–"P4" — use Styling → Player to show any doubles player' },
			],
		},
	];
</script>

<div class="flex flex-col gap-2">
	<p class="text-xs opacity-50">Fight stats work in singles too: Player 1/2 are the two players, Team 1/2 the same player.</p>
	<p class="text-xs opacity-50">Every Player 1 / Player 2 element can show any doubles player: Styling → Player (Team 1/2 · Player 1/2).</p>
	{#each groups as g (g.title)}
		<p class="section-label">{g.title}</p>
		{#each g.items as item (item.value)}
			<SelectOption description={item.tip} value={item.value} on:select={select}>{item.label}</SelectOption>
		{/each}
	{/each}
</div>
