import { writable } from 'svelte/store';

/**
 * In-app trail of visited pages (paths, no query) for the dynamic back button: revisiting a page
 * cuts the trail back to it, so "back" always means the page you came from — not a loop.
 */
export const navTrail = writable<string[]>([]);

export const pathOf = (url: URL | string) => (typeof url === 'string' ? url : url.pathname).replace(/\/$/, '') || '/';

export function recordNavigation(path: string) {
	navTrail.update((trail) => {
		const at = trail.lastIndexOf(path);
		return at >= 0 ? trail.slice(0, at + 1) : [...trail, path].slice(-30);
	});
}

/** Page titles (back-button labels) and each page's parent when there is no trail. */
const PAGES: { match: RegExp; title: string; parent?: string }[] = [
	{ match: /^\/$/, title: 'Home' },
	{ match: /^\/obs$/, title: 'Stream', parent: '/' },
	{ match: /^\/obs\/overlay$/, title: 'Overlays', parent: '/obs' },
	{ match: /^\/obs\/overlay\/assets$/, title: 'Asset packs', parent: '/obs/overlay' },
	{ match: /^\/obs\/overlay\/deleted$/, title: 'Deleted overlays', parent: '/obs/overlay' },
	{ match: /^\/obs\/dashboard$/, title: 'Tournament Dashboard', parent: '/obs' },
	{ match: /^\/obs\/setup$/, title: 'OBS Connection', parent: '/obs' },
	{ match: /^\/obs\/automation$/, title: 'Automation', parent: '/obs' },
	{ match: /^\/obs\/settings\/scene$/, title: 'Scene Commands', parent: '/obs/automation' },
	{ match: /^\/obs\/settings\/controller$/, title: 'Controller Commands', parent: '/obs/automation' },
	{ match: /^\/obs\/flows$/, title: 'Flows', parent: '/obs/automation' },
	{ match: /^\/obs\/flows\/problems$/, title: 'Flow problems', parent: '/obs/flows' },
	{ match: /^\/obs\/flows\/[^/]+$/, title: 'Flow', parent: '/obs/flows' },
	{ match: /^\/obs\/webhook$/, title: 'Webhooks', parent: '/obs/automation' },
	{ match: /^\/obs\/tutorial$/, title: 'Tutorials', parent: '/obs' },
	{ match: /^\/obs\/tutorial\/[^/]+$/, title: 'Tutorial', parent: '/obs/tutorial' },
	{ match: /^\/set$/, title: 'Stage striking' },
	{ match: /^\/set\/tutorial$/, title: 'Run a tournament', parent: '/obs/tutorial' },
	{ match: /^\/settings$/, title: 'Settings' },
	{ match: /^\/minigames$/, title: 'Minigames' },
];

export const pageTitle = (path: string) => PAGES.find((p) => p.match.test(path))?.title;
export const pageParent = (path: string) => PAGES.find((p) => p.match.test(path))?.parent;

/** Where "back" goes from `current`: the previous page of the trail, else the parent. */
export function backTarget(trail: string[], current: string): { href: string; label: string } | undefined {
	const at = trail.lastIndexOf(current);
	const previous = at > 0 ? trail[at - 1] : undefined;
	const href = previous ?? pageParent(current);
	if (!href) return undefined;
	return { href, label: pageTitle(href) ?? 'Back' };
}
