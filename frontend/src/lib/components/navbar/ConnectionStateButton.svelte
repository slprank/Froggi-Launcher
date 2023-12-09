<script lang="ts">
	import { ConnectionState } from '$lib/models/enum';
	import { fly } from 'svelte/transition';

	export let connectionState: ConnectionState = ConnectionState.None;
	export let iconPath: string = '';
	export let click = () => {};

	const getBorderStyle = (state: ConnectionState) => {
		switch (state) {
			case ConnectionState.Disconnected:
				return 'border: 1px solid red';
			case ConnectionState.Connected:
				return 'border: 1px solid green';
			case ConnectionState.Connecting:
				return 'border: 1px solid yellow';
			case ConnectionState.Searching:
				return 'border: 1px solid yellow';
			default:
				return 'border: 1px solid red';
		}
	};

	const getAnimation = (state: ConnectionState) => {
		switch (state) {
			case ConnectionState.Searching:
				return 'pulse';
			case ConnectionState.Connecting:
				return 'pulse';
			default:
				return '';
		}
	};
</script>

<div class="relative">
	<button
		class="transition opacity-60 hover:opacity-100 justify-center rounded-2xl text-center align-middle z-50 cursor-pointer"
		transition:fly={{ duration: 150, x: -50 }}
		on:click={click}
	>
		<span class={getAnimation(connectionState)} />
		<button
			class={`h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1 col-auto`}
			style={`${getBorderStyle(connectionState)}`}
		>
			<img src={iconPath} alt="connection status" />
		</button>
	</button>
</div>
