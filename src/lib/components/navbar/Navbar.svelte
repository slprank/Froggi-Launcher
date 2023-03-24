<script lang="ts">
	import SideNavButton from '$lib/components/navbar/SideNavButton.svelte';
	import { fly } from 'svelte/transition';
	import { isBrowser, isDesktop, isElectron, isMobile, isTablet } from '$lib/utils/store.svelte';
	import BottomNavButton from './BottomNavButton.svelte';

	function resetVisibilityTimer() {
		isVisible = true;
		clearInterval(visibilityTimer);
		startVisibilityTimer();
	}

	function startVisibilityTimer() {
		visibilityTimer = setTimeout(() => {
			isVisible = false;
		}, 5000);
	}

	let visibilityTimer: NodeJS.Timeout;
	$: isVisible = false;
	startVisibilityTimer();

	let width: number;
</script>

<svelte:window
	bind:innerWidth={width}
	on:click={resetVisibilityTimer}
	on:touchstart={resetVisibilityTimer}
	on:touchmove={resetVisibilityTimer}
	on:touchend={resetVisibilityTimer}
	on:mousemove={resetVisibilityTimer}
/>

<div>
	{#if isVisible && width > 768}
		<div
			in:fly={{ x: -100, duration: 150 }}
			out:fly={{ x: -100, duration: 400 }}
			class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-r-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
		>
			<div
				class="h-12 w-12 bg-gray-800 bg-opacity-75 justify-center rounded-2xl text-center align-middle p-1"
			>
				<SideNavButton src={'live'}>
					<img
						src="https://img.icons8.com/material-outlined/256/youtube-live.png"
						alt="live"
					/>
				</SideNavButton>
			</div>

			<div
				class="h-12 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl p-1"
			>
				<SideNavButton src={'/'} />
			</div>

			<div
				class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl space-y-2 p-1"
			>
				<SideNavButton src={'leaderboard'} />
				<SideNavButton src={'replays'} />
				<SideNavButton src={'stats'} />
				<SideNavButton src={'achievements'} />
				<SideNavButton src={'profile'} />
				<SideNavButton src={'settings'} />
			</div>
		</div>

		<div
			in:fly={{ x: 100, duration: 150 }}
			out:fly={{ x: 100, duration: 400 }}
			class="fixed top-0 right-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-l-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
		/>
	{:else if isVisible}
		<div
			in:fly={{ y: 100, duration: 150 }}
			out:fly={{ y: 100, duration: 400 }}
			class={`fixed grid grid-cols-5 divide-x divide-zinc-800 bottom-0 w-screen h-16 m-0 bg-black bg-opacity-50 border-t-1 border-opacity-25 border-white z-50 ${
				$isMobile ? 'pb-4' : ''
			}`}
		>
			<BottomNavButton src="/">Home</BottomNavButton>
			<BottomNavButton src="live">Live</BottomNavButton>
			<BottomNavButton src="leaderboard">Leaderboard</BottomNavButton>
			<BottomNavButton src="profile">Profile</BottomNavButton>
			<BottomNavButton src="settings">Settings</BottomNavButton>
		</div>
	{/if}
</div>
