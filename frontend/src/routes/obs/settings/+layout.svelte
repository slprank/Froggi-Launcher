<script lang="ts">
	import BackButton from '$lib/components/navigation/BackButton.svelte';
	import { page } from '$app/stores';
	$: path = $page.url.pathname.replace(/\/$/, '');
</script>

<main class="flex justify-center">
	<div class="w-full max-w-2xl">
		{#if path !== '/obs/settings'}
			<BackButton />
		{/if}
		<slot />
	</div>
</main>
