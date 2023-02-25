<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	function paramRedirect() {
		page.subscribe((page) => {
			const route = page.url.searchParams.get('route'); // ?route=live => redirect to live page
			if (!route) return;
			localStorage.setItem('recentRoute', route);
			goto(route);
		});
	}

	function routeTo(route: string) {
		if (!window.electron && browser) localStorage.setItem('recentRoute', route);
		goto(route);
	}

	export { paramRedirect, routeTo };
</script>
