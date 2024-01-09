<script lang="ts">
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { urls } from '$lib/utils/store.svelte';
	import QrCode from 'svelte-qrcode';
	import Clipboard from 'svelte-clipboard';
	import Modal from '../Modal.svelte';

	export let open: boolean;
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="w-[95vw] h-[350px] max-w-[624px] min-w-lg place-items-center bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="h-full w-full grid grid-cols-2">
			<div class="col-span-1 place-items-center grid">
				<div class="grid w-full h-48 px-4">
					<h1 class="text-white text-xl font-medium text-shadow">
						Add page to the home screen to get the best experience
					</h1>
					<h1 class="text-gray-500 text-md font-medium text-shadow">
						Make sure to be connected to the same network
					</h1>
					<h1 class="text-gray-500 text-md font-medium text-shadow">
						App might require a new scan if the IP changes
					</h1>
				</div>
			</div>
			<div class="col-span-1 place-items-center grid rounded-md">
				<div class="w-48 h-48 border-4 border-zinc-700 text-center grid gap-2">
					<QrCode value={$urls?.external} size="192" />
					<div class="flex">
						<h1 class="text-gray-500 text-md font-medium text-shadow">
							{$urls?.external}
						</h1>
						<Clipboard
							text={`${$urls?.external}`}
							let:copy
							on:copy={() => {
								notifications.success('Copied to clipboard!', 2000);
							}}
						>
							<button on:click={copy} class="w-5 h-5 invert transition">
								<img src="/image/button-icons/copy.png" alt="copy" />
							</button>
						</Clipboard>
					</div>
				</div>
			</div>
		</div>
	</div>
</Modal>
