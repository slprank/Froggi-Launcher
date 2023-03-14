<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import NavButton from '$lib/components/navbar/SideNavButton.svelte';
	import { isBrowser, isDesktop, isElectron, isTablet } from '$lib/utils/store.svelte';
	import BottomNavButton from './BottomNavButton.svelte';

	let width: number;
</script>

<svelte:window bind:innerWidth={width} />

<div>
	{#if ($isElectron || $isDesktop || $isTablet) && width > 768}
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
	{:else}
		<div
			class="fixed grid grid-cols-5 gap-1 bottom-0 w-screen h-16 m-0 bg-black bg-opacity-50 border-t-1 border-opacity-25 border-white z-50"
		>
			<BottomNavButton src="/">Home</BottomNavButton>
			<BottomNavButton src="live">Live</BottomNavButton>
			<BottomNavButton src="achievements">Trophy</BottomNavButton>
			<BottomNavButton src="profile">Profile</BottomNavButton>
			<BottomNavButton src="settings">Settings</BottomNavButton>
		</div>
	{/if}
</div>
