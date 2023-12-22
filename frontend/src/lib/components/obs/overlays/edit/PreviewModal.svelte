<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { urls } from '$lib/utils/store.svelte';
	//@ts-ignore
	import Clipboard from 'svelte-clipboard';
	//@ts-ignore
	import QrCode from 'svelte-qrcode';

	const overlayId = $page.params.overlay;
	$: localUrl = `${$urls?.local}/obs/overlay/${overlayId}/layers/external`;
	$: externalUrl = `${$urls?.external}/obs/overlay/${overlayId}/layers/external`;

	export let open: boolean = false;
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="w-[80vw] h-80 max-w-[800px] flex rounded-lg bg-transparent m-0 bg-cover bg-center p-4"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="flex-1 flex flex-col justify-between items-center w-[80%]">
			<h1 class="text-white text-xl font-medium text-shadow">Open Preview In New Window</h1>
			<a target="popup" href={`${localUrl}`} on:click={() => (open = false)}>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
				>
					Popup
				</button>
			</a>
		</div>
		<div class="flex-1 flex flex-col justify-between items-center rounded-md">
			<h1 class="text-white text-xl font-medium text-shadow">Open on external device</h1>
			<QrCode value={`${externalUrl}`} size="192" />
			<Clipboard
				text={`${externalUrl}`}
				let:copy
				on:copy={() => {
					notifications.success('Copied to clipboard!', 2000);
				}}
			>
				<button
					on:click={copy}
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				>
					Copy external URL
				</button>
			</Clipboard>
		</div>
	</div>
</Modal>

<style>
	h1 {
		text-align: center;
	}
</style>
