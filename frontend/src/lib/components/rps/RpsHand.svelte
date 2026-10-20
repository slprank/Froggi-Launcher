<script lang="ts">
	// Built-in rock / paper / scissors hands: Microsoft Fluent Emoji (MIT — static/licenses/fluentui-emoji.txt),
	// static/image/rps/. "outline" = the high-contrast set painted in the element's text colour (CSS mask);
	// "color" = the flat, full-colour set.
	export let hand: 'rock' | 'paper' | 'scissors';
	export let variant: 'outline' | 'color' = 'outline';
	export let base = '';
	$: src = `${base}/image/rps/${hand}${variant === 'color' ? '-color' : ''}.svg`;
</script>

{#if variant === 'color'}
	<img class="w-full h-full" style="object-fit: contain;" {src} alt={hand} />
{:else}
	<div class="w-full h-full hand" style={`--src: url("${src}")`} role="img" aria-label={hand} />
{/if}

<style>
	.hand {
		background: currentColor;
		-webkit-mask: var(--src) center / contain no-repeat;
		mask: var(--src) center / contain no-repeat;
	}
</style>
