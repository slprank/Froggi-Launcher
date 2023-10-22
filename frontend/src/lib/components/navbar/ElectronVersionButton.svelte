<script lang="ts">
	import { AutoUpdaterStatus } from '$lib/models/enum';
	import { fly } from 'svelte/transition';
	import { autoUpdater, eventEmitter, isElectron } from '$lib/utils/store.svelte';
	import TextFitMulti from '../TextFitMulti.svelte';
	import type { AutoUpdater } from '$lib/models/types/overlay';

	const getStyle = (autoUpdater: AutoUpdater) => {
		switch (autoUpdater.status) {
			case AutoUpdaterStatus.LookingForUpdate:
				return 'border: 1px solid black;';
			case AutoUpdaterStatus.DownloadAvailable:
				return 'border: 1px solid green; background-color: green;';
			case AutoUpdaterStatus.Downloading:
				return 'border: 1px solid yellow; background-color: yellow;';
			case AutoUpdaterStatus.DownloadComplete:
				return 'border: 1px solid green; background-color: green;';
			case AutoUpdaterStatus.Installing:
				return 'border: 1px solid yellow;';
			case AutoUpdaterStatus.UpToDate:
				return '';
			default:
				return '';
		}
	};

	const getAnimation = (autoUpdater: AutoUpdater) => {
		switch (autoUpdater.status) {
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

	const getContent = (autoUpdater: AutoUpdater) => {
		switch (autoUpdater.status) {
			case AutoUpdaterStatus.LookingForUpdate:
				return 'Checking';
			case AutoUpdaterStatus.DownloadAvailable:
				return 'Update';
			case AutoUpdaterStatus.Downloading:
				return `${autoUpdater.progress}%`;
			case AutoUpdaterStatus.DownloadComplete:
				return 'Install';
			case AutoUpdaterStatus.Installing:
				return 'Installing';
			case AutoUpdaterStatus.UpToDate:
				return `v${autoUpdater.version}`;
			default:
				return `v${autoUpdater.version}`;
		}
	};

	$: console.log('Electron:', $autoUpdater);

	const installUpdate = () => {
		if ($autoUpdater.status === AutoUpdaterStatus.DownloadComplete)
			$eventEmitter.emit('electron', 'update-install');
	};
</script>

{#if $isElectron}
	{#key $autoUpdater}
		<button
			class="transition hover:scale-110 fixed opacity-60 hover:opacity-100 border-gray-800 bottom-4 justify-center rounded-2xl text-center align-middle z-50 cursor-pointer"
			on:click={installUpdate}
		>
			<span class={getAnimation($autoUpdater)} />
			<button
				class={`h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1 col-auto`}
				style={`${getStyle($autoUpdater)}`}
			>
				<TextFitMulti>{`${getContent($autoUpdater)}`}</TextFitMulti>
			</button>
		</button>
	{/key}
{/if}
