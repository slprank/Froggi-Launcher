<script lang="ts">
	import type { GridContentItem } from '$lib/models/types/overlay';
	import { localEmitter, gameFrame, gameState } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	import { inGameVisibilityOption } from './visibilityConditions/InGameVisibilityOptions.svelte';
	import { inGamePlayer1VisibilityOption } from './visibilityConditions/InGamePlayer1VisibilityOptions.svelte';
	import { inGamePlayer2VisibilityOption } from './visibilityConditions/InGamePlayer2VisibilityOptions.svelte';
	import { postGameVisibilityOption } from './visibilityConditions/PostGameVisibilityOptions.svelte';
	import { postGame1SummaryVisibilityOption } from './visibilityConditions/PostGame1SummaryVisibilityOptions.svelte';
	import { postGame2SummaryVisibilityOption } from './visibilityConditions/PostGame2SummaryVisibilityOptions.svelte';
	import { postGame3SummaryVisibilityOption } from './visibilityConditions/PostGame3SummaryVisibilityOptions.svelte';
	import { postGame4SummaryVisibilityOption } from './visibilityConditions/PostGame4SummaryVisibilityOptions.svelte';
	import { postGame5SummaryVisibilityOption } from './visibilityConditions/PostGame5SummaryVisibilityOptions.svelte';
	import { sessionVisibilityOption } from './visibilityConditions/SessionVisibilityOptions.svelte';
	import { matchStatsVisibilityOption } from './visibilityConditions/MatchStatsVisibilityOptions.svelte';
	import { rankVisibilityOption } from './visibilityConditions/RankVisibilityOptions.svelte';
	export let animationIn: Function;
	export let animationOut: Function;
	export let dataItem: GridContentItem;
	export let preview: boolean;
	export let edit: boolean = false;

	let visible = true;
	const updateVisibilityValue = async () => {
		if (edit || preview) return true;
		if (!dataItem) return false;

		const options = dataItem.data.visibility.selectedOptions;

		visible = options.every(async (option) => {
			const inGameOptions = await inGameVisibilityOption(option);
			const inGamePlayer1Options = await inGamePlayer1VisibilityOption(option);
			const inGamePlayer2Options = await inGamePlayer2VisibilityOption(option);
			const matchStatsOptions = await matchStatsVisibilityOption(option);
			const postGameOptions = await postGameVisibilityOption(option);
			const postGame1SummaryOptions = await postGame1SummaryVisibilityOption(option);
			const postGame2SummaryOptions = await postGame2SummaryVisibilityOption(option);
			const postGame3SummaryOptions = await postGame3SummaryVisibilityOption(option);
			const postGame4SummaryOptions = await postGame4SummaryVisibilityOption(option);
			const postGame5SummaryOptions = await postGame5SummaryVisibilityOption(option);
			const rankOptions = await rankVisibilityOption(option);
			const sessionOptions = await sessionVisibilityOption(option);

			return (
				inGameOptions ||
				inGamePlayer1Options ||
				inGamePlayer2Options ||
				matchStatsOptions ||
				postGameOptions ||
				postGame1SummaryOptions ||
				postGame2SummaryOptions ||
				postGame3SummaryOptions ||
				postGame4SummaryOptions ||
				postGame5SummaryOptions ||
				rankOptions ||
				sessionOptions
			);
		});
	};

	$: {
		$gameState, $gameFrame, updateVisibilityValue();
	}

	onMount(() => {
		if (!edit && !preview) return;
		$localEmitter.on('TestVisibilityTrigger', () => {
			visible = !visible;
		});
	});
</script>

{#if edit}
	<div class="w-full h-full absolute top-0 left-0">
		<slot />
	</div>
{:else if visible}
	<div class="w-full h-full" in:animationIn|local out:animationOut|local>
		<slot />
	</div>
{/if}
