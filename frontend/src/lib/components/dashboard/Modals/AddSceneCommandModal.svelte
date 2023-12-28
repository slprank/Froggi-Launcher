<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { LiveStatsScene } from '$lib/models/enum';
	import { ObsSceneSwitch } from '$lib/models/types/obsTypes';
	import { electronEmitter, obsSceneSwitch } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';
	import { OBSRequestTypes } from 'obs-websocket-js/dist/types';

	export let open: boolean;

	let selectedScene: LiveStatsScene = LiveStatsScene.WaitingForDolphin;
	let sceneOptions: ObsSceneSwitch | undefined = $obsSceneSwitch;

	const updateSceneOptions = () => {
		if (isNil(sceneOptions)) return;
		$electronEmitter.emit('ObsSceneSwitchUpdate', sceneOptions);
		notifications.success('Scene Options Updated', 2000);
	};

	const addCommandType = (
		scene: LiveStatsScene,
		command: OBSRequestTypes[keyof OBSRequestTypes],
	) => {
		if (isNil(sceneOptions)) return;
		sceneOptions[scene]['SetCurrentProgramScene'].payload.sceneName = command;
	};
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="max-h-[80vh] max-w-[400px] w-screen h-full min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8 overflow-y-scroll"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		Nice
	</div>
</Modal>
