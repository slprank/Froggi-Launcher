<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import GameCustomUi from './InGame/GameCustomUi.svelte';
	import CurrentPlayerCustomUi from './InGame/CurrentPlayerCustomUi.svelte';
	import Player1CustomUi from './InGame/Player1CustomUi.svelte';
	import Player2CustomUi from './InGame/Player2CustomUi.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<GameCustomUi {dataItem} {defaultPreview} {style} />
<CurrentPlayerCustomUi {dataItem} {defaultPreview} {style} />
<Player1CustomUi {dataItem} {defaultPreview} {style} />
<Player2CustomUi {dataItem} {defaultPreview} {style} />
