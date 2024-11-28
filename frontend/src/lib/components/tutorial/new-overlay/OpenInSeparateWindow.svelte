<script lang="ts">
	import { isElectron, urls } from '$lib/utils/store.svelte';
	$: localUrl = `${$urls?.local}/obs/tutorial/new-overlay?page=2`;
</script>

<h1 class="text-2xl font-semibold">Open tutorial in separate window</h1>

{#if $isElectron}
	<h2>
		If you find it easier to follow this tutorial in a separate window, you can open it by
		clicking this button:
	</h2>
	<a target="popup" href={`${localUrl}`}>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
		>
			Popup
		</button>
	</a>
	<h2>
		Or scan the QR code by clicking on the mobile icon to the right, to open in on an external
		device.
	</h2>
{/if}
<h2>
	This external view can also be used as a secondary screen while editing overlays and to operate
	OBS indirectly. But for this tutorial, it is not necessary.
</h2>
