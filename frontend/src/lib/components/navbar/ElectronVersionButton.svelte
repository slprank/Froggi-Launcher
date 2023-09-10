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
	<div
		class="fixed opacity-60 hover:opacity-100 border-gray-800 bottom-4 justify-center rounded-2xl text-center align-middle z-50"
		transition:fly={{ duration: 150, x: -50 }}
	>
		<span class={getAnimation($autoUpdater.status)} />
		<NavButton style={`${getBorderStyle($autoUpdater.status)}`} click={installUpdate}>
			<TextFitMulti>{`${getContent($autoUpdater.status)}`}</TextFitMulti>
		</NavButton>
	</div>
{/if}
