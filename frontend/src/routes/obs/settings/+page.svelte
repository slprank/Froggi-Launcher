<script lang="ts">
	// Old "OBS Settings" hub: WebSocket moved to OBS Connection, commands to Automation.
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => goto('/obs/automation', { replaceState: true }));
</script>
