<script lang="ts">
	import type { Font, Overlay } from '$lib/models/types/overlay';
	import FontSelect from './FontSelect.svelte';

	export let font: Font;
	export let fontId: string;
</script>

<div class="w-full flex gap-2 color-secondary">
	<FontSelect bind:font bind:fontId />
</div>
