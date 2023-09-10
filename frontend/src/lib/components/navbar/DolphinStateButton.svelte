<script lang="ts">
	import { DolphinConnectionState } from '$lib/models/enum';

	import NavButton from './NavButton.svelte';
	import { fly } from 'svelte/transition';
	import { dolphinState, isElectron } from '$lib/utils/store.svelte';

	const getBorderStyle = (state: DolphinConnectionState) => {
		switch (state) {
			case DolphinConnectionState.Disconnected:
				return 'border: 1px solid red';
			case DolphinConnectionState.Connected:
				return 'border: 1px solid green';
			case DolphinConnectionState.Connecting:
				return 'border: 1px solid yellow';
			case DolphinConnectionState.Searching:
				return 'border: 1px solid yellow';
			default:
				return 'border: 1px solid yellow';
		}
	};
</script>

{#if $isElectron}
	<div
		class="fixed opacity-60 hover:opacity-100 border-gray-800 bottom-4 justify-center rounded-2xl text-center align-middle z-50"
		transition:fly={{ duration: 150, x: -50 }}
	>
		<NavButton style={`${getBorderStyle($dolphinState)} `}>
			<img src="/image/button-icons/dolphin.svg" alt="back" />
		</NavButton>
	</div>
{/if}
