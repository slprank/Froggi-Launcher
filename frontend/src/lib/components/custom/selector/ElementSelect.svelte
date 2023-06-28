<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import Select from '$lib/components/input/Select.svelte';

	export let selectedElementId: number;
	export let label: string | undefined = undefined;

	// TODO: Update to Modal with select in different categories
	let options = [
		{
			name: 'Custom Text',
			value: CustomElement.CustomString,
		},
		{
			name: 'Custom Box',
			value: CustomElement.CustomBox,
		},
		{
			name: 'Custom Image',
			value: CustomElement.CustomImage,
		},
		{
			name: 'Player1 Tag',
			value: CustomElement.Player1Tag,
		},
		{
			name: 'Player2 Tag',
			value: CustomElement.Player2Tag,
		},
		{
			name: 'Player1 Percent',
			value: CustomElement.Player1Percent,
		},
		{
			name: 'Player2 Percent',
			value: CustomElement.Player2Percent,
		},
		{
			name: 'Player1 Percent (Decimal)',
			value: CustomElement.Player1PercentDecimal,
		},
		{
			name: 'Player2 Percent (Decimal)',
			value: CustomElement.Player2PercentDecimal,
		},
		{
			name: 'Player1 Score',
			value: CustomElement.Player1Score,
		},
		{
			name: 'Player2 Score',
			value: CustomElement.Player2Score,
		},
		{
			name: 'Player1 Rank Icon',
			value: CustomElement.Player1RankIcon,
		},
		{
			name: 'Player2 Rank Icon',
			value: CustomElement.Player2RankIcon,
		},
		{
			name: 'Player1 Character Render',
			value: CustomElement.Player1CharacterRender,
		},
		{
			name: 'Player2 Character Render',
			value: CustomElement.Player2CharacterRender,
		},
	];
</script>

<div class="w-40 h-12">
	<Select bind:selected={selectedElementId} {label}>
		{#each options as option, i}
			<option selected={i === 0} value={option.value}>
				{option.name}
			</option>
		{/each}
	</Select>
</div>
