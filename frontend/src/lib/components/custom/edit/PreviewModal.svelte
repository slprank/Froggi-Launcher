<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { urls } from '$lib/utils/store.svelte';
	import Clipboard from 'svelte-clipboard';
	import QrCode from 'svelte-qrcode';

	export let open: boolean = false;
	export let localUrl: string;
	export let externalUrl: string;
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="w-full h-72 min-w-72 max-w-[612px] grid grid-cols-2 rounded-lg bg-transparent m-0 bg-cover bg-center"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="col-span-1 place-items-center grid">
			<div class="grid w-full h-48 px-4">
				<h1 class="text-white text-xl font-medium text-shadow">
					Open Preview In New Window
				</h1>
			</div>
			<a target="popup" href={`${localUrl}/layers/external`}>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
				>
					Popup
				</button>
			</a>
		</div>
		<div class="col-span-1 place-items-center grid rounded-md">
			<div class="w-48 h-48 border-4 border-zinc-700 text-center grid gap-2">
				<QrCode value={externalUrl} size="192" />
				<div class="w-full flex">
					<h1 class="text-gray-500 text-md font-medium text-shadow">External device</h1>
					<Clipboard
						text={`${localUrl}/layers/external`}
						let:copy
						on:copy={() => {
							notifications.success('Copied to clipboard!', 2000);
						}}
					>
						<button on:click={copy} class="w-5 h-5 invert transition hover:scale-110">
							<img src="/image/button-icons/copy.png" alt="copy" />
						</button>
					</Clipboard>
				</div>
			</div>
		</div>
	</div>
</Modal>
