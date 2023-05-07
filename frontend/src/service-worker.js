import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-v${version}`;

const ASSETS = ['offline.html', 'favicon.ico'];

self.addEventListener('install', (event) => {
	/*
	caches.keys().then((names) => {
		names.filter((name) => name != CACHE).forEach((name) => caches.delete(name));
	});^
	*/

	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match('offline.html');
		}
	}

	event.respondWith(respond());
});
