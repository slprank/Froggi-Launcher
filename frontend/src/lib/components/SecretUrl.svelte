<script lang="ts">
	// Tailscale (*.ts.net) and ngrok links reach this machine from the internet — never shown until the host clicks (Copy still works).
	export let value: string;
	let shown = false;
	$: secret = /\.ts\.net\b|ngrok(-free)?\.(app|io|dev)\b/i.test(value ?? "");
</script>

{#if secret && !shown}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="hidden-url {$$props.class ?? ''}" role="button" tabindex="0" title="Show link" on:click|stopPropagation={() => (shown = true)}>Hidden · Show</span>
{:else}
	<span class={$$props.class ?? ''}>{value}</span>
{/if}

<style>
	.hidden-url { font-style: italic; cursor: pointer; opacity: 0.6; }
	.hidden-url:hover { opacity: 1; }
</style>
