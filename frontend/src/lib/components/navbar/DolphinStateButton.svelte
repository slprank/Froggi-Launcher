<script lang="ts">
	import { DolphinConnectionState } from '$lib/models/enum';
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
				return 'border: 1px solid red';
		}
	};

	const getAnimation = (state: DolphinConnectionState) => {
		switch (state) {
			case DolphinConnectionState.Searching:
				return 'pulse';
			case DolphinConnectionState.Connecting:
				return 'pulse';
			default:
				return '';
		}
	};
</script>

{#if $isElectron}
	<button
		class="transition hover:scale-110 fixed opacity-60 hover:opacity-100 border-gray-800 bottom-4 justify-center rounded-2xl text-center align-middle z-50 cursor-pointer"
		transition:fly={{ duration: 150, x: -50 }}
	>
		<span class={getAnimation($dolphinState)} />
		<button
			class={`h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1 col-auto`}
			style={`${getBorderStyle($dolphinState)}`}
		>
			<img src="/image/button-icons/dolphin.svg" alt="dolphin status" />
		</button>
	</button>
{/if}
