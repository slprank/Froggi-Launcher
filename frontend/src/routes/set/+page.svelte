<script lang="ts">
	// The Set page's controls now live on the Tournament Dashboard (stage striking card + Start Set).
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => goto('/obs/dashboard', { replaceState: true }));
</script>
