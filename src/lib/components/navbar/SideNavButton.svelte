<script lang="ts">
	import { goto } from '$app/navigation';

	export let src: string;
</script>

<button
	class="h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1"
	on:click={() => goto(src)}
>
	<slot />
</button>
