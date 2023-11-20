<script lang="ts">
	import { isElectron, isPWA, localEmitter } from '$lib/utils/store.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Pwa from '$lib/components/modal/mobile/Pwa.svelte';
	import MissingSettings from '../modal/electron/MissingSettings.svelte';

	let isPwaOpen = !$isPWA;

	// TODO: Implement logic for this
	let isMissingSettingsOpen = false;
</script>

<div>
	<Modal
		bind:open={isPwaOpen}
		on:close={() => (isPwaOpen = false)}
		class="w-[90%] h-72 min-w-72 max-w-[612px] rounded-lg"
	>
		<Pwa />
	</Modal>
	<Modal
		bind:open={isMissingSettingsOpen}
		on:close={() => (isMissingSettingsOpen = false)}
		class="w-[90%] h-72 min-w-72 max-w-[612px] rounded-lg"
	>
		<MissingSettings />
	</Modal>
	<!-- TODO: Add modal for missing required settings-->
</div>
