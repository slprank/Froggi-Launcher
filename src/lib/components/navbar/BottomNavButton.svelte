<script lang="ts">
	import { goto } from '$app/navigation';

	export let src: string;
</script>

<button class="col-span-1 flex justify-center items-center text-white" on:click={() => goto(src)}>
	<slot />
</button>
