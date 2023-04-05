<script lang="ts">
	import { urls } from '$lib/utils/store.svelte';
	import QrCode from 'svelte-qrcode';
</script>

<div
	class="w-full h-full min-w-lg place-items-center bg-cover bg-center rounded-md border border-zinc-700"
	style="background-image: url('./background/MeleeMenuAll.png')"
>
	<div class="h-full w-full grid grid-cols-2">
		<div class="col-span-1 place-items-center grid">
			<div class="grid place-items-center w-full h-36 px-4">
				<h1 class="text-white text-2xl font-medium">
					Add page to homescreen to get the best app experience
				</h1>
			</div>
		</div>
		<div class="col-span-1 place-items-center grid rounded-md">
			<div class="w-48 h-48 border-4 border-zinc-700">
				<QrCode value={$urls.external} size="192" />
			</div>
		</div>
	</div>
</div>
