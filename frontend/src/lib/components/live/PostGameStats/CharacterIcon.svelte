<script lang="ts">
	export let character: any;
	export let imgClass: string = '';
	export let divClass: string = '';
	// TODO: Use actual character data
</script>

<div class={`flex justify-center items-center ${divClass}`}>
	<img
		class={`aspect-square ${imgClass}`}
		alt="character icon"
		src={`/image/characters/${character[0]}/${character[1]}/stock.png`}
	/>
</div>
