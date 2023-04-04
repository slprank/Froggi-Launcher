<script lang="ts">
	import TextFitMulti from '../TextFitMulti.svelte';

	export let click = () => {};
</script>

<button class="col-span-1 flex justify-center items-center text-white" on:click={click}>
	<TextFitMulti divClass="p-1">
		<slot />
	</TextFitMulti>
</button>
