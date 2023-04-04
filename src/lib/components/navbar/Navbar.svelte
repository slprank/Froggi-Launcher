<script lang="ts">
	import SideNavButton from '$lib/components/navbar/SideNavButton.svelte';
	import { fly } from 'svelte/transition';
	import { isBrowser, isDesktop, isElectron, isMobile, isTablet } from '$lib/utils/store.svelte';
	import BottomNavButton from './BottomNavButton.svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/modal/Modal.svelte';

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
	$: isVisible = $isMobile ? true : false;
	startVisibilityTimer();

	let isMobileOpen: boolean;

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
	{#if isVisible && width > 768 && !$isMobile}
		<div
			in:fly={{ x: -100, duration: 150 }}
			out:fly={{ x: -100, duration: 400 }}
			class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-r-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
		>
			<div
				class="h-12 w-12 bg-gray-800 bg-opacity-75 justify-center rounded-2xl text-center align-middle p-1"
			>
				<SideNavButton click={() => goto('live')}>
					<img
						src="https://img.icons8.com/material-outlined/256/youtube-live.png"
						alt="live"
					/>
				</SideNavButton>
			</div>

			<div
				class="h-12 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl p-1"
			>
				<SideNavButton click={() => goto('/')} />
			</div>
			<div
				class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl space-y-2 p-1"
			>
				<SideNavButton click={() => goto('leaderboard')} />
				<SideNavButton click={() => goto('replays')} />
				<SideNavButton click={() => goto('stats')} />
				<SideNavButton click={() => goto('achievements')} />
				<SideNavButton click={() => goto('profile')} />
			</div>
		</div>

		<div
			in:fly={{ x: 100, duration: 150 }}
			out:fly={{ x: 100, duration: 400 }}
			class="fixed top-0 right-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-l-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
		>
			{#if $isElectron}
				<div
					class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl space-y-2 p-1"
				>
					<SideNavButton click={() => goto('obs')}>
						<img
							src="https://img.icons8.com/ios-filled/512/obs-studio.png"
							alt="live"
						/>
					</SideNavButton>
					<SideNavButton click={() => (isMobileOpen = true)}>
						<img src="https://cdn-icons-png.flaticon.com/512/0/191.png" alt="live" />
					</SideNavButton>
					<SideNavButton click={() => goto('settings')}>
						<img
							src="https://cdn-icons-png.flaticon.com/512/126/126472.png"
							alt="live"
						/>
					</SideNavButton>
				</div>
			{/if}
		</div>
	{:else if isVisible}
		<div
			in:fly={{ y: 100, duration: 150 }}
			out:fly={{ y: 100, duration: 400 }}
			class={`fixed grid grid-cols-5 divide-x divide-zinc-800 bottom-0 w-screen h-16 m-0 bg-black bg-opacity-80 border-t-1 border-opacity-25 border-white z-50 ${
				$isMobile ? 'pb-4' : ''
			}`}
		>
			<BottomNavButton click={() => goto('/')}>Home</BottomNavButton>
			<BottomNavButton click={() => goto('live')}>Live</BottomNavButton>
			<BottomNavButton click={() => goto('leaderboard')}>Leaderboard</BottomNavButton>
			<BottomNavButton click={() => goto('profile')}>Profile</BottomNavButton>
		</div>
	{/if}
</div>
<Modal bind:open={isMobileOpen} on:close={() => (isMobileOpen = false)}>
	<div>Mobile Tab</div>
</Modal>
