<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import Player1SlippiRank from './Slippi/Player1SlippiRank.svelte';
	import Player2SlippiRank from './Slippi/Player2SlippiRank.svelte';
	import CurrentPlayerSlippiRank from './Slippi/CurrentPlayerSlippiRank.svelte';
	import RankChange from './Slippi/RankChange.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<CurrentPlayerSlippiRank {dataItem} {defaultPreview} {style} />
<Player1SlippiRank {dataItem} {defaultPreview} {style} />
<Player2SlippiRank {dataItem} {defaultPreview} {style} />
<RankChange {dataItem} {defaultPreview} {style} />
