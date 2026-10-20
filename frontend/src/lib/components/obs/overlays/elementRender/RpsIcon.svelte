<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { StrikeState } from '$lib/models/types/stageStriking';
	import { isElectron, urls } from '$lib/utils/store.svelte';
	import RpsHand from '$lib/components/rps/RpsHand.svelte';

	// A player's rock / paper / scissors pick as an icon. Never shown before both have picked (the
	// opponent could see it) — until then a ✓ says the player is ready. On the reveal the icon shuffles
	// for ~1.5 s (a new hand every 100 ms) and lands on the real pick. Already revealed on mount: no shuffle.
	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
	export let strikeState: StrikeState | undefined;
	export let player: 1 | 2;
	export let overlayId: string | undefined = $page.params.overlay;

	type Hand = 'rock' | 'paper' | 'scissors';
	const HANDS: Hand[] = ['rock', 'paper', 'scissors'];
	const SHUFFLE_MS = 1500;
	const FLICK_MS = 100;

	$: pick = (player === 1 ? strikeState?.rps?.p1 : strikeState?.rps?.p2) as Hand | null | undefined;
	$: revealed = !!(strikeState?.rps?.p1 && strikeState?.rps?.p2) || (!!strikeState?.phase && strikeState.phase !== 'rps');

	let shown: Hand | null = null;
	/** What the element settles on — element triggers see this, not every flick of the shuffle. */
	let landed: Hand | null = null;
	let timer: ReturnType<typeof setInterval> | undefined;
	let prevRevealed: boolean | undefined;

	function shuffleTo(hand: Hand) {
		clearInterval(timer);
		const started = Date.now();
		shown = HANDS[(HANDS.indexOf(hand) + 1) % 3];
		timer = setInterval(() => {
			if (Date.now() - started >= SHUFFLE_MS) {
				clearInterval(timer);
				timer = undefined;
				shown = landed = hand;
				return;
			}
			const others = HANDS.filter((h) => h !== shown);
			shown = others[Math.floor(Math.random() * others.length)];
		}, FLICK_MS);
	}

	$: update(revealed, pick ?? null);
	function update(isRevealed: boolean, hand: Hand | null) {
		if (prevRevealed === false && isRevealed && hand) shuffleTo(hand);
		else if (!timer) shown = landed = isRevealed ? hand : null;
		prevRevealed = isRevealed;
	}
	onDestroy(() => clearInterval(timer));

	$: base = ($isElectron ? $urls?.localResource : $urls?.externalResource) ?? '';
	$: custom = dataItem?.data?.rpsIcons ?? {};
	$: hand = defaultPreview ? (player === 1 ? 'rock' : 'paper') : shown;
	$: customSrc = hand && custom[hand] ? `${base}/public/custom/${overlayId}/image/${encodeURI(custom[hand] ?? '')}` : null;
</script>

<div class={`w-full h-full flex items-center justify-center ${style.classValue}`} style={style.cssValue} data-trigger-value={landed ?? (pick ? 'ready' : '')}>
	{#if hand}
		{#if customSrc}
			<img class="w-full h-full" style={`object-fit: ${dataItem?.data.image?.objectFit ?? 'contain'};`} src={customSrc} alt={hand} />
		{:else}
			<RpsHand {hand} variant={dataItem?.data?.rpsIconStyle ?? 'outline'} />
		{/if}
	{:else if pick}
		<svg class="ready" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="ready"><path d="M4 12.5l5 5L20 6.5" /></svg>
	{/if}
</div>

<style>
	.ready { width: 45%; height: 45%; opacity: 0.85; }
</style>
