<script lang="ts">
	import { AutoUpdaterStatus } from '$lib/models/enum';
	import { autoUpdater, electronEmitter, isElectron } from '$lib/utils/store.svelte';
	import TextFitMulti from '../TextFitMulti.svelte';
	import type { AutoUpdater } from '$lib/models/types/overlay';
	import { tooltip } from 'svooltip';

	const getStyle = (autoUpdater: AutoUpdater) => {
		switch (autoUpdater.status) {
			case AutoUpdaterStatus.LookingForUpdate:
				return 'border: 1px solid black;';
			case AutoUpdaterStatus.UpdateAvailable:
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
			case AutoUpdaterStatus.UpdateAvailable:
				return 'pulse';
			default:
				return '';
		}
	};

	const getContent = (autoUpdater: AutoUpdater) => {
		switch (autoUpdater.status) {
			case AutoUpdaterStatus.LookingForUpdate:
				return 'Checking';
			case AutoUpdaterStatus.UpdateAvailable:
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

	const installUpdate = () => {
		if ($autoUpdater.status === AutoUpdaterStatus.DownloadComplete)
			$electronEmitter.emit('AutoUpdaterInstall');
		if ($autoUpdater.status === AutoUpdaterStatus.UpToDate)
			$electronEmitter.emit('AutoUpdaterCheckForUpdate');
		if ($autoUpdater.status === AutoUpdaterStatus.UpdateAvailable)
			$electronEmitter.emit('AutoUpdaterDownloadUpdate');
	};
</script>

<div
	class="relative"
	use:tooltip={{
		content: `<p>${$autoUpdater.status}</p>`,
		html: true,
		placement: 'left',
		delay: [1000, 0],
		offset: 25,
	}}
>
	{#if $isElectron}
		{#key $autoUpdater}
			<button
				class="transition opacity-60 hover:opacity-100 justify-center rounded-2xl text-center align-middle z-50 cursor-pointer"
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
</div>
