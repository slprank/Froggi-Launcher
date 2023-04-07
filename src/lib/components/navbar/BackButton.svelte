<script lang="ts">
	import { isBrowser } from '$lib/utils/store.svelte';
	import NavButton from './NavButton.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	$: route = $page.route.id;
	$: routeDepthArray = route?.split('/').slice(1) ?? [];
	$: routeDepth = routeDepthArray.length;
	$: prevRoute = `/${routeDepthArray.slice(0, -1).join('/')}`;
	$: console.log(route);
	$: console.log(prevRoute);
</script>

{#if routeDepth > 1}
	<div
		class="fixed opacity-60 hover:opacity-100 border-gray-800 top-4 justify-center rounded-2xl text-center align-middle z-50"
		transition:fade
	>
		<NavButton click={() => goto(prevRoute)}>
			<img src="/image/button-icons/back.png" alt="back" />
		</NavButton>
	</div>
{/if}
