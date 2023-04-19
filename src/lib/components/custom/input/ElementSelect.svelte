<script lang="ts">
	import { CustomElement } from '$lib/types/enum';
	import Select from '$lib/components/Select.svelte';

	export let selectedElementId: number;

	// TODO: Add remaining components - stats/rank-up/session etc..
	let options = [
		{
			name: 'Custom String',
			value: CustomElement.CustomString,
		},
		{
			name: 'Custom Box',
			value: CustomElement.CustomBox,
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
	];
</script>

<div class="w-40 h-12">
	<Select bind:selected={selectedElementId}>
		{#each options as option, i}
			<option selected={i === 0} value={option.value}>
				{option.name}
			</option>
		{/each}
	</Select>
</div>
