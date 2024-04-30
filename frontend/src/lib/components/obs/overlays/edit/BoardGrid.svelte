<script lang="ts">
	import { fly } from 'svelte/transition';

	export let cols: number = 32;
	export let rows: number = 18;
</script>

<div class="w-full h-full absolute">
	<div class="w-full h-full relative opacity-50">
		<div class="w-full h-full absolute flex justify-between">
			{#each Array.from({ length: cols }) as col, i}
				<div class="w-auto border-r border-gray-500" />
			{/each}
		</div>
		<div class="w-full h-full absolute flex flex-col justify-between">
			{#each Array.from({ length: rows }) as row, i}
				<div class="h-auto border-b border-gray-500" />
			{/each}
		</div>
	</div>
</div>
