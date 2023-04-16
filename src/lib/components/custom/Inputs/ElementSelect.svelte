<script lang="ts">
	import { CustomElement } from '$lib/types/enum';
	import type { CustomOptions } from '$lib/types/types';
	import Select from '$lib/components/Select.svelte';

	export let selectedElement: CustomOptions;

	// TODO: Add remaining components - stats/rank-up/session etc..
	let options = [
		{
			name: 'Custom String',
			value: {
				element: CustomElement.CustomString,
				stringSettings: true,
				isCustomString: true,
			},
		},
		{
			name: 'Custom Box',
			value: {
				element: CustomElement.CustomBox,
				boxSettings: true,
			},
		},
		{
			name: 'Player1 Tag',
			value: { element: CustomElement.Player1Tag, stringSettings: true },
		},
		{
			name: 'Player2 Tag',
			value: { element: CustomElement.Player2Tag, stringSettings: true },
		},
		{
			name: 'Player1 Score',
			value: { element: CustomElement.Player1Score, stringSettings: true },
		},
		{
			name: 'Player2 Score',
			value: { element: CustomElement.Player2Score, stringSettings: true },
		},
		{
			name: 'Player1 Rank Icon',
			value: { element: CustomElement.Player1RankIcon, imageSettings: true },
		},
		{
			name: 'Player2 Rank Icon',
			value: { element: CustomElement.Player2RankIcon, imageSettings: true },
		},
	];
</script>

<div class="w-40 h-12">
	<Select bind:selected={selectedElement}>
		{#each options as option, i}
			<option selected={i === 0} value={option.value}>
				{option.name}
			</option>
		{/each}
	</Select>
</div>
