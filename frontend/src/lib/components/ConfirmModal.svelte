<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function confirm() {
		dispatch('confirm');
		open = false;
	}

	function cancel() {
		open = false;
	}

	// TODO: Style

	export let open = false;
</script>

<Modal bind:open on:close={() => (open = false)} class="w-72 min-w-72 rounded-lg">
	<div
		class="w-full h-full min-w-lg py-4 grid gap-8 justify-center bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="w-full grid justify-center gap-8 py-4">
			<h1 class="text-center text-white text-xl font-medium text-shadow">
				<slot />
			</h1>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
				on:click={cancel}
			>
				Cancel
			</button>

			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
				on:click={confirm}
			>
				Confirm
			</button>
		</div>
	</div>
</Modal>
