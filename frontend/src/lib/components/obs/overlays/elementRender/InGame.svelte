<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import GameCustomHud from './InGame/GameCustomHud.svelte';
	import CurrentPlayerCustomHud from './InGame/CurrentPlayerCustomHud.svelte';
	import Player1Hud from './InGame/Player1Hud.svelte';
	import Player2Hud from './InGame/Player2Hud.svelte';
	import CurrentPlayerController from './InGame/CurrentPlayerController.svelte';
	import Player1Controller from './InGame/Player1Controller.svelte';
	import Player2Controller from './InGame/Player2Controller.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

<GameCustomHud {dataItem} {defaultPreview} {style} />
<CurrentPlayerCustomHud {dataItem} {defaultPreview} {style} />
<Player1Hud {dataItem} {defaultPreview} {style} />
<Player2Hud {dataItem} {defaultPreview} {style} />
<CurrentPlayerController {dataItem} {style} />
<Player1Controller {dataItem} {style} />
<Player2Controller {dataItem} {style} />
