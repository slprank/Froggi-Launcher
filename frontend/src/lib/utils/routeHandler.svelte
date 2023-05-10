<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	function paramRedirect() {
		const availableRoutes = getAvailableRoutes();
		page.subscribe(async (page) => {
			const routes = page.url.searchParams.toString(); // ?route1=some?route2/thing => redirect to /some/thing
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
			if (isValidRoute) return;
			const curRouteElements = curRoute.split('/');
			const routeElements = route.split('/');
			if (curRouteElements.length != routeElements.length) return;
			var zipped = curRouteElements.map((e, i) => [e, routeElements[i]]);
			console.log(zipped);
			isValidRoute = zipped.every(
				(zip) => zip[0] === zip[1] || zip.some((z) => isWrapped(z)),
			);
		});
		return isValidRoute;
	}

	function isWrapped(route: string) {
		console.log('wrap', route, route[0] === '[' && route.slice(-1) === ']');
		return route[0] === '[' && route.slice(-1) === ']';
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
