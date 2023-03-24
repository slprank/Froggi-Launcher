<script lang="ts">
	import { goto } from '$app/navigation';
	import TextFitMulti from '../TextFitMulti.svelte';

	export let src: string;
</script>

<button class="col-span-1 flex justify-center items-center text-white" on:click={() => goto(src)}>
	<TextFitMulti divClass="p-1">
		<slot />
	</TextFitMulti>
</button>
