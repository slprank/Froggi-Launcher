<script lang="ts">
	// @ts-ignore
	import QrCode from 'svelte-qrcode';

	// A QR code of a link to this machine (phones, remote access): hidden until clicked, then drawn
	// large and black-on-white with a quiet zone so phones read it reliably at any display size.
	export let value: string;
	/** Display size in CSS px. */
	export let size = 120;
	export let hidden = true;

	let revealed = !hidden;
	// A new link (e.g. Local → Remote tab) starts hidden again.
	const resetFor = (_value: string) => (revealed = !hidden);
	$: resetFor(value);
</script>

<div class="qr" style:width="{size}px" style:height="{size}px">
	{#if revealed}
		<QrCode {value} size={String(Math.max(320, size * 4))} padding={16} color="#000000" background="#ffffff" />
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="qr-hidden" role="button" tabindex="0" title="Show QR code" on:click|stopPropagation={() => (revealed = true)}>
			<span>Show QR</span>
		</div>
	{/if}
</div>

<style>
	.qr { position: relative; flex-shrink: 0; }
	.qr :global(img) { width: 100%; height: 100%; display: block; border-radius: 0.3rem; image-rendering: pixelated; }
	.qr-hidden {
		width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
		border: 1px dashed var(--secondary-color); border-radius: 0.3rem; cursor: pointer;
		font-size: 0.7rem; font-weight: 600; opacity: 0.55; color: var(--secondary-color);
		background: repeating-linear-gradient(45deg, transparent 0 6px, color-mix(in srgb, var(--secondary-color) 8%, transparent) 6px 12px);
	}
	.qr-hidden:hover { opacity: 0.9; }
</style>
