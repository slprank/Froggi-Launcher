<script lang="ts">
	import WaitingDolphin from '$lib/components/live/WaitingDolphin/WaitingDolphin.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { CustomElement, LiveStatsScene } from '$lib/models/enum';
	import { getEnumStringValues } from '$lib/utils/helper.svelte';
	import { statsScene } from '$lib/utils/store.svelte';
	import ElementCategorySelect from './ElementCategorySelect.svelte';

	// Move this to separate file
	let options = [
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

	export let selectedElementId: CustomElement;
	let open: boolean;
</script>

<div class="grid grid-flow-col gap-2 items-center">
	<button
		class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
		on:click={() => (open = true)}
	>
		Select
	</button>
	<h1 class="text-gray-500 text-md font-medium text-shadow">
		{CustomElement[selectedElementId] ?? ''}
	</h1>
</div>

<Modal bind:open on:close={() => (open = false)} class="w-[70vw] h-[70vh]">
	<div
		class="w-full h-full bg-cover bg-center p-16"
		style="background-image: url('/image/backgrounds/MeleeMenuGreen.png')"
	>
		<ElementCategorySelect bind:selectedElementId bind:open />
	</div>
</Modal>
