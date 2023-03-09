<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import NavButton from '$lib/components/navbar/NavButton.svelte';
	import { isBrowser, isDesktop, isElectron, isTablet } from '$lib/utils/store.svelte';
</script>

<div>
	{#if $isElectron || $isDesktop || $isTablet}
		<div
			class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-r-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
		>
			<div
				class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center rounded-2xl text-center align-middle p-1 "
			>
				<NavButton src={'live'} icon={''} />
			</div>

			<div
				class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl p-1"
			>
				<NavButton src={'/'} icon={''} />
			</div>

			<div
				class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl space-y-2 p-1"
			>
				<NavButton src={'replays'} icon={''} />
				<NavButton src={'stats'} icon={''} />
				<NavButton src={'achievements'} icon={''} />
				<NavButton src={'profile'} icon={''} />
				<NavButton src={'settings'} icon={''} />
			</div>
		</div>

		<div
			class="fixed top-0 right-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-l-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
		/>
	{/if}
</div>
