<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// TODO: Include searchParam which does not include `route`
	// TODO: Handle /user route when implementing user page
	function paramRedirect() {
		const availableRoutes = getAvailableRoutes();
		page.subscribe((page) => {
			const routes = page.url.searchParams.toString(); // ?route=some => redirect to /some
			if (!routes) return;
			const route = routes
				.split('&')
				.map((r) => r.split('=')[1])
				.join('/');

			if (availableRoutes.includes(route)) {
				goto(route);
				return;
			}
			goto('/');
		});
	}

	function getAvailableRoutes() {
		const modules = import.meta.glob('../../routes/**/**.svelte');
		let tempRoutes = [];
		for (let path in modules) {
			tempRoutes.push(path);
		}
		const availableRoutes = tempRoutes
			.map((route: string) => route.replace('../../routes/', '').split('/').slice(0, -1))
			.filter((x) => x.length)
			.map((route) => route.join('/'));

		return availableRoutes;
	}

	export { paramRedirect };
</script>
