<script lang="ts">
	import { isPwa } from '$lib/utils/store.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { onMount } from 'svelte';
	import PwaHowTo from '$lib/components/modal/mobile/PwaHowTo.svelte';

	let isPwaOpen = false;

	onMount(() => {
		if (Boolean(localStorage.getItem('skipPwaTutorial'))) return;

		setTimeout(() => {
			isPwaOpen = !$isPwa;
			localStorage.setItem('skipPwaTutorial', 'true');
		}, 1500);
	});
</script>

<div>
	<Modal
		bind:open={isPwaOpen}
		on:close={() => (isPwaOpen = false)}
		class="w-[90%] h-72 min-w-72 max-w-[612px] rounded-lg"
	>
		<PwaHowTo />
	</Modal>
</div>
