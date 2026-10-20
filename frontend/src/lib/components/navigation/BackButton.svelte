<script lang="ts">
	import { page } from '$app/stores';
	import { backTarget, navTrail, pathOf } from '$lib/utils/navHistory';

	// One back button for every page: goes to the page you came from (in-app trail), else the
	// page's parent. `href`/`label` override it for in-page sub views (e.g. a selected asset pack).
	export let href: string | undefined = undefined;
	export let label: string | undefined = undefined;

	$: target = href ? { href, label: label ?? 'Back' } : backTarget($navTrail, pathOf($page.url));
</script>

{#if target}
	<a class="back-btn self-start" href={target.href}>← {target.label}</a>
{/if}

<style>
	.back-btn { display: inline-block; font-size: 0.85rem; opacity: 0.5; color: var(--secondary-color); margin-bottom: 0.5rem; }
	.back-btn:hover { opacity: 0.85; }
</style>
