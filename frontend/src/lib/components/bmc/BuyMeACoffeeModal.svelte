<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	/** Open the Buy Me a Coffee modal from anywhere (navbar button, Home card). */
	export const bmcOpen = writable(false);
</script>

<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { ExternalLink } from 'lucide-svelte';
	import { electronEmitter, isElectron } from '$lib/utils/store.svelte';

	// One modal for the whole app: the Buy Me a Coffee widget page embedded, plus a button that opens
	// the page in the system browser (links clicked inside the embed open there too — see main.ts).
	const BMC_SLUG = 'sindrevatnw';
	const BMC_URL = `https://buymeacoffee.com/${BMC_SLUG}`;
	const BMC_EMBED = `https://www.buymeacoffee.com/widget/page/${BMC_SLUG}?description=Support%20Froggi&color=%23FFDD00`;

	const close = () => bmcOpen.set(false);
	function openBmc() {
		if ($isElectron) $electronEmitter.emit('OpenUrl', BMC_URL);
		else window.open(BMC_URL, '_blank');
	}
</script>

{#if $bmcOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
	<div class="bmc-backdrop" on:click|self={close} on:keydown={(e) => e.key === 'Escape' && close()} transition:fade={{ duration: 150 }}>
		<div class="bmc-modal background-primary-color border-secondary text-secondary-color" in:fly={{ y: 16, duration: 200 }}>
			<div class="bmc-head">
				<span class="bmc-title"><img src="/image/icons/bmc-cup-yellow.svg" alt="" /><span class="font-cookie">Buy me a coffee</span></span>
				<button class="bmc-close" on:click={close} aria-label="Close">✕</button>
			</div>
			<p class="bmc-text">Froggi is free. If it helps your stream or tournament, a coffee keeps it going — thank you!</p>
			<div class="bmc-embed">
				<iframe title="Buy me a coffee" src={BMC_EMBED} loading="lazy" />
			</div>
			<button class="bmc bmc-cta" on:click={openBmc}>
				<img src="/image/icons/bmc-cup.svg" alt="" />
				<span class="font-cookie">Buy me a coffee</span>
				<ExternalLink size={16} strokeWidth={2.2} />
			</button>
			<p class="bmc-hint">Opens buymeacoffee.com in your browser.</p>
		</div>
	</div>
{/if}

<style>
	.bmc-backdrop {
		position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); z-index: 60;
		display: flex; align-items: center; justify-content: center; padding: 1rem;
	}
	.bmc-modal {
		width: 100%; max-width: 440px; max-height: 92vh; overflow-y: auto;
		border-radius: 0.6rem; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.8rem;
	}
	.bmc-head { display: flex; align-items: center; justify-content: space-between; }
	.bmc-title { display: flex; align-items: center; gap: 0.5rem; font-size: 1.9rem; line-height: 1; }
	.bmc-title img { height: 1.7rem; }
	.bmc-close { font-size: 0.9rem; opacity: 0.5; background: none; border: none; color: inherit; cursor: pointer; }
	.bmc-close:hover { opacity: 1; }
	.bmc-text { font-size: 0.78rem; opacity: 0.65; line-height: 1.45; }
	.bmc-embed {
		width: 100%; height: 380px; max-height: 50vh; border-radius: 0.45rem; overflow: hidden; background: #fff;
		border: 1px solid color-mix(in srgb, var(--secondary-color) 25%, transparent);
	}
	.bmc-embed iframe { width: 100%; height: 100%; border: 0; display: block; }
	.bmc-cta {
		display: flex; align-items: center; justify-content: center; gap: 0.6rem;
		height: 3rem; border-radius: 0.5rem; cursor: pointer; font-size: 1.6rem;
	}
	.bmc-cta img { height: 1.6rem; }
	.bmc-hint { font-size: 0.72rem; opacity: 0.5; text-align: center; }
</style>
