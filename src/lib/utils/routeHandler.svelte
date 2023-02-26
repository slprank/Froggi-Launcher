<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	function paramRedirect() {
		page.subscribe((page) => {
			const route1 = page.url.searchParams.get('route1'); // ?route=some => redirect to /some
			const route2 = page.url.searchParams.get('route2');
			if (!route1) return;
			goto(`${route1}/${route2 ?? ''}`);
		});
	}

	function routeTo(route: string) {
		goto(route);
	}

	export { paramRedirect, routeTo };
</script>
