<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// TODO: Include searchParam which does not include `route`
	// TODO: Handle /user route when implementing user page
	function paramRedirect() {
		const availableRoutes = getAvailableRoutes();
		console.log(availableRoutes);
		page.subscribe((page) => {
			const routes = page.url.searchParams.toString(); // ?route=some => redirect to /some
			if (!routes) return;
			const route = routes
				.split('&')
				.map((r) => r.split('=')[1])
				.join('/');

			if (availableRoutes.includes(route) || isDynamicRoute(availableRoutes, route)) {
				goto(route);
				return;
			}
			goto('/');
		});
	}

	function isDynamicRoute(availableRoutes: string[], route: string) {
		let isValidRoute = false;
		availableRoutes.forEach((curRoute) => {
			const curRouteElements = curRoute.split('/');
			const routeElements = route.split('/');
			if (curRouteElements.length != routeElements.length) return;
			var zipped = curRouteElements.map((e, i) => [e, routeElements[i]]);
			zipped.forEach((zip) => {
				if (zip[0] != zip[1] && !zip.some((z) => isWrapped(z))) return;
			});
			isValidRoute = true;
		});
		return isValidRoute;
	}

	function isWrapped(string: string) {
		return string[0] === '[' && string.slice(-1) === ']';
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
