<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Overlay } from '$lib/models/types/overlay';
	import type { LiveStatsScene } from '$lib/models/enum';
	import { isVideoFile, preloadPlan } from '$lib/utils/overlayAssets';

	// Loads the overlay's images/videos before they are needed: the scene on screen first (a thin bar
	// shows its progress), then every other scene in the background, so scene switches never pop in.
	export let overlay: Overlay;
	export let scene: LiveStatsScene;
	export let base: string;

	const loaded = new Set<string>();
	let total = 0;
	let done = 0;
	let destroyed = false;

	const load = (url: string): Promise<void> => {
		if (loaded.has(url)) return Promise.resolve();
		loaded.add(url);
		if (isVideoFile(url)) {
			return new Promise((resolve) => {
				const video = document.createElement('video');
				const finish = () => {
					clearTimeout(timer);
					resolve();
				};
				// ponytail: 10s cap so one slow/huge video never keeps the bar up; it keeps loading in the element.
				const timer = setTimeout(finish, 10000);
				video.muted = true;
				video.preload = 'auto';
				video.oncanplaythrough = video.onerror = finish;
				video.src = url;
			});
		}
		const img = new Image();
		img.src = url;
		return img.decode().catch(() => undefined);
	};

	let runId = 0;
	async function run(o: Overlay, s: LiveStatsScene, b: string) {
		const id = ++runId;
		const { first, rest } = preloadPlan(o, s, b);
		const pending = first.filter((u) => !loaded.has(u));
		total = pending.length;
		done = 0;
		await Promise.all(pending.map((u) => load(u).then(() => id === runId && done++)));
		for (const url of rest) {
			if (destroyed || id !== runId) return;
			await load(url);
		}
	}
	// Wait for Froggi's address (urls) — before it arrives every custom URL would point at the wrong host.
	$: if (overlay && base) run(overlay, scene, base);
	onDestroy(() => (destroyed = true));
</script>

{#if total > 0 && done < total}
	<div class="preload-bar" out:fade={{ duration: 250 }}>
		<div class="preload-fill" style:width="{(done / total) * 100}%" />
	</div>
{/if}

<style>
	.preload-bar { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: rgba(255, 255, 255, 0.15); z-index: 1000; pointer-events: none; }
	.preload-fill { height: 100%; background: rgba(255, 255, 255, 0.85); transition: width 0.2s ease-out; }
</style>
