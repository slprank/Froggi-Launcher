<script lang="ts">
	import { isElectron } from '$lib/utils/store.svelte';
	import SceneSelect from './selector/SceneSelect.svelte';

	// Sticky scene picker for the overlay lists (Overlays, Deleted overlays). The bar spans the whole
	// window; in the app its content stays clear of the side navbars.
</script>

<div class="scene-bar border-t border-secondary-color background-primary-color" class:scene-bar--app={$isElectron}>
	<p class="bar-label">Scene</p>
	<SceneSelect />
</div>

<style>
	.scene-bar {
		position: fixed; left: 0; right: 0; bottom: 0; z-index: 20;
		display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
		padding: 0.6rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
	}
	.scene-bar--app { padding-left: 6rem; padding-right: 6rem; }
	.bar-label {
		font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
		opacity: 0.4; white-space: nowrap; flex-shrink: 0;
	}
</style>
