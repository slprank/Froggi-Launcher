<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
	import { autoUpdater, eventEmitter, isElectron } from '$lib/utils/store.svelte';
	import { AutoUpdaterStatus } from '$lib/models/enum';

	const InstallUpdate = () => {
		if ($autoUpdater.status === AutoUpdaterStatus.DownloadComplete)
			$eventEmitter.emit('electron', 'update-install');
	};
</script>

<main
	class="fixed h-screen w-screen place-items-center bg-black bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeWallpaper.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="fixed place-items-center grid h-screen w-screen bg-gradient-to-t from-black z-40">
		{#if $autoUpdater?.status && $isElectron}
			<button
				class="w-52 h-20 rounded bg-green-500 transition duration-100 hover:scale-105 hover:bg-green-700 shadow-md"
				on:click={InstallUpdate}
			>
				{$autoUpdater?.status}
				{$autoUpdater?.progress ? `- ${$autoUpdater.progress}%` : ''}
			</button>
		{/if}
		<Logo />
	</div>
</main>

<style>
	main {
		text-align: center;
	}
</style>
