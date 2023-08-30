<script lang="ts">
	export let characterId: number;
	export let imgClass: string = '';
	export let divClass: string = '';
	// TODO: Use actual character data
	// TODO: Add usage percentage
</script>

<div class={`flex justify-center items-center ${divClass}`}>
	<img
		class={`aspect-square ${imgClass}`}
		alt="character icon"
		src={`/image/characters/${characterId}/0.png`}
	/>
</div>
