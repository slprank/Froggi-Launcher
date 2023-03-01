<script lang="ts">
	import { goto } from '$app/navigation';

	export let src: string;
	export let icon: string; // TODO: add
</script>

<div
	class="h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl"
	on:click={() => goto(src)}
/>
