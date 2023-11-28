<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { urls } from '$lib/utils/store.svelte';
	// @ts-ignore
	import Clipboard from 'svelte-clipboard';
	// @ts-ignore
	import QrCode from 'svelte-qrcode';

	const overlayId = $page.params.overlay;
	$: localUrl = `${$urls?.local}/obs/custom/${overlayId}/layers/external`;
	$: externalUrl = `${$urls?.external}/obs/custom/${overlayId}/layers/external`;

	export let open: boolean = false;
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="w-[80vw] h-[80vh] max-h-[600px] min-w-72 flex rounded-lg bg-transparent m-0 bg-cover bg-center p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div
			class="flex-1 place-items-center rounded-md flex flex-col justify-between items-center gap-4"
		>
			<div class="flex flex-col justify-center items-center w-[80%]">
				<h1 class="text-white font-medium text-shadow text-2xl">Embed on local devices</h1>
				<h1 class="text-gray-500 text-md font-medium text-shadow text-center">
					This is a local URL and could be used on the device Web Browser or Embed to
					local applications such as OBS.
				</h1>
			</div>
			<div class="flex flex-col justify-center items-center w-[80%] gap-2">
				<div class="flex gap-2 justify-center items-center">
					<div class="flex-1">
						<img
							src="/image/example-images/obs-add-browser.png"
							alt="obs-add-browser"
						/>
					</div>

					<div class="flex-1">
						<img
							src="/image/example-images/obs-browser-src.png"
							alt="obs-browser-src"
						/>
					</div>
				</div>
				<h1 class="text-gray-500 text-md font-medium text-shadow text-center">
					Embed to OBS by adding a new browser source and inserting URL.
				</h1>
				<h1 class="text-gray-500 text-md font-medium text-shadow text-center">
					Remember setting a 1920x1080 resolution.
				</h1>
				<h1 class="text-gray-500 text-md font-medium text-shadow text-center">
					You can add as many browser sources as you want
				</h1>
				<Clipboard
					text={localUrl}
					let:copy
					on:copy={() => {
						notifications.success('Copied to clipboard!', 2000);
					}}
				>
					<button
						on:click={copy}
						class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					>
						Copy local URL
					</button>
				</Clipboard>
			</div>
			<h1 class="text-gray-500 text-md font-medium text-shadow">
				This URL can only be used on the current local device.
			</h1>
		</div>
		<div
			class="flex-1 place-items-center rounded-md flex flex-col justify-between items-center gap-4"
		>
			<div class="flex flex-col justify-center items-center w-[80%]">
				<h1 class="text-white font-medium text-shadow text-2xl">
					Embed on external devices
				</h1>
				<h1 class="text-gray-500 text-md font-medium text-shadow text-center">
					This is an external URL and can be opened on any device connected to the same
					network.
				</h1>
				<h1 class="text-gray-500 text-md font-medium text-shadow text-center">
					Mobile/Tablets/Laptops/Projectors
				</h1>
			</div>
			<QrCode value={`${externalUrl}`} size="192" />

			<Clipboard
				text={externalUrl}
				let:copy
				on:copy={() => {
					notifications.success('Copied to clipboard!', 2000);
				}}
			>
				<button
					on:click={copy}
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				>
					Copy external URL
				</button>
			</Clipboard>
			<div class="flex flex-col justify-center items-center w-[80%]">
				<h1 class="text-gray-500 text-md font-medium text-shadow">
					This URL should not be used on local device as ip address might change.
				</h1>
				<h1 class="text-gray-500 text-md font-medium text-shadow">
					Consider setting a static local ip-address on this device.
				</h1>
			</div>
		</div>
	</div>
</Modal>

<style>
	h1 {
		text-align: center;
	}
</style>
