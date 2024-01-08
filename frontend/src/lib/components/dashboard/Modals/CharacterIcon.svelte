<script lang="ts">
	import type { Character } from '$lib/models/enum';

	export { _class as class };
	export let characterId: Character | undefined | null;
	export let objectFit: 'contain' | 'cover' = 'contain';

	let _class: string;

	// TODO: Include colors
</script>

<div class={`w-full h-full flex ${_class}`}>
	<img
		class="h-full w-full aspect-video"
		style={`object-fit: ${objectFit};`}
		src={`/image/characters/${characterId}/0/stock.png`}
		alt="custom"
	/>
</div>
