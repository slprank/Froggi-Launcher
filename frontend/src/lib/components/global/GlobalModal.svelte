<script lang="ts">
	import { isPwa } from '$lib/utils/store.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Pwa from '$lib/components/modal/mobile/Pwa.svelte';
	import { onMount } from 'svelte';

	let isPwaOpen = false;

	onMount(() => {
		setTimeout(() => {
			isPwaOpen = !$isPwa;
		}, 1500);
	});
</script>

<div>
	<Modal
		bind:open={isPwaOpen}
		on:close={() => (isPwaOpen = false)}
		class="w-[90%] h-72 min-w-72 max-w-[612px] rounded-lg"
	>
		<Pwa />
	</Modal>
</div>
