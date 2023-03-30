<script lang="ts">
	export let characterId: number;
	export let imgClass: string = '';
	export let divClass: string = '';
	// TODO: Use actual character data
	console.log(characterId);
</script>

<div class={`flex justify-center items-center ${divClass}`}>
	<img
		class={`aspect-square ${imgClass}`}
		alt="character icon"
		src={`./characters/${characterId}/0/stock.png`}
	/>
</div>
