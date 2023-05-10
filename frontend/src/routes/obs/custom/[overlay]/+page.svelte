<script lang="ts">
	import { eventEmitter, isElectron, obs } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
	import Edit from '$lib/components/custom/edit/Edit.svelte';
	import Board from '$lib/components/custom/Board.svelte';
</script>

{#if $obs}
	<main
		class="fixed h-screen w-screen bg-cover bg-center bg-transparent"
		in:fade={{ delay: 50, duration: 150 }}
		out:fade={{ duration: 300 }}
	>
		{#if $isElectron}
			<Edit />
		{:else}
			<Board />
		{/if}
	</main>
{/if}

<style>
</style>
