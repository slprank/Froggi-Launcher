<script lang="ts">
	import { AutoUpdaterStatus } from '$lib/models/enum';
	import NavButton from './NavButton.svelte';
	import { fly } from 'svelte/transition';
	import { autoUpdater, eventEmitter, isElectron } from '$lib/utils/store.svelte';
	import TextFitMulti from '../TextFitMulti.svelte';

	const getBorderStyle = (state: AutoUpdaterStatus) => {
		switch (state) {
			case AutoUpdaterStatus.LookingForUpdate:
				return 'border: 1px solid black';
			case AutoUpdaterStatus.DownloadAvailable:
				return 'border: 1px solid green';
			case AutoUpdaterStatus.Downloading:
				return 'border: 1px solid yellow';
			case AutoUpdaterStatus.DownloadComplete:
				return 'border: 1px solid green';
			case AutoUpdaterStatus.Installing:
				return 'border: 1px solid yellow';
			case AutoUpdaterStatus.UpToDate:
				return '';
			default:
				return '';
		}
	};

	const getAnimation = (state: AutoUpdaterStatus) => {
		switch (state) {
			case AutoUpdaterStatus.LookingForUpdate:
				return 'pulse';
			case AutoUpdaterStatus.DownloadAvailable:
				return 'pulse';
			case AutoUpdaterStatus.DownloadComplete:
				return 'pulse';
			default:
				return '';
		}
	};

	const getContent = (state: AutoUpdaterStatus) => {
		switch (state) {
			case AutoUpdaterStatus.LookingForUpdate:
				return 'Checking';
			case AutoUpdaterStatus.DownloadAvailable:
				return 'Update';
			case AutoUpdaterStatus.Downloading:
				return `${$autoUpdater.progress}%`;
			case AutoUpdaterStatus.DownloadComplete:
				return 'Install';
			case AutoUpdaterStatus.Installing:
				return 'Installing';
			case AutoUpdaterStatus.UpToDate:
				return `v${$autoUpdater.version}`;
			default:
				return `v${$autoUpdater.version}`;
		}
	};

	const installUpdate = () => {
		if ($autoUpdater.status === AutoUpdaterStatus.DownloadComplete)
			$eventEmitter.emit('electron', 'update-install');
	};
</script>

{#if $isElectron}
	<button
		class="transition hover:scale-110 fixed opacity-60 hover:opacity-100 border-gray-800 bottom-4 justify-center rounded-2xl text-center align-middle z-50 cursor-pointer"
		transition:fly={{ duration: 150, x: -50 }}
		on:click={installUpdate}
	>
		<span class={getAnimation($autoUpdater.status)} />
		<button
			class={`h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1 col-auto`}
			style={`${getBorderStyle($autoUpdater.status)}`}
		>
			<TextFitMulti>{`${getContent($autoUpdater.status)}`}</TextFitMulti>
		</button>
	</button>
{/if}
