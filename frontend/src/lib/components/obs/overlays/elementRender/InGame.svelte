<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import GameCustomHud from './InGame/GameCustomHud.svelte';
	import CurrentPlayerCustomHud from './InGame/CurrentPlayerCustomHud.svelte';
	import Player1CustomHud from './InGame/Player1CustomHud.svelte';
	import Player2CustomHud from './InGame/Player2CustomHud.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<GameCustomHud {dataItem} {defaultPreview} {style} />
<CurrentPlayerCustomHud {dataItem} {defaultPreview} {style} />
<Player1CustomHud {dataItem} {defaultPreview} {style} />
<Player2CustomHud {dataItem} {defaultPreview} {style} />
