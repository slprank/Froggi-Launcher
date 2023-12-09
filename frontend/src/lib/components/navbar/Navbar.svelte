<script lang="ts">
	import NavButton from '$lib/components/navbar/NavButton.svelte';
	import { fly } from 'svelte/transition';
	import {
		dolphinState,
		isElectron,
		isIframe,
		isMobile,
		isOverlayPage,
		obsConnection,
	} from '$lib/utils/store.svelte';
	import { goto } from '$app/navigation';
	import Mobile from '$lib/components/modal/electron/Mobile.svelte';
	import BackButton from '$lib/components/navbar/BackButton.svelte';
	import ConnectionStateButton from './ConnectionStateButton.svelte';
	import ElectronVersionButton from './ElectronVersionButton.svelte';

	function resetVisibilityTimer() {
		if ($isElectron) {
			isVisible = true;
			return;
		}
		if ($isIframe) {
			isVisible = false;
			return;
		}
		isVisible = true;
		clearInterval(visibilityTimer);
		startVisibilityTimer();
	}

	function startVisibilityTimer() {
		visibilityTimer = setTimeout(
			() => {
				isVisible = false;
			},
			$isMobile ? 5000 : 10000,
		);
	}

	let visibilityTimer: NodeJS.Timeout;
	let isVisible = false;
	$: $isOverlayPage, startVisibilityTimer();

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
	{#if isVisible}
		{#if !$isMobile}
			<div
				in:fly={{ x: -100, duration: 150 }}
				out:fly={{ x: -100, duration: 400 }}
				class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-r-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
			>
				<BackButton />

				<div
					class="h-12 w-12 bg-gray-800 bg-opacity-75 justify-center rounded-2xl text-center align-middle p-1"
				>
					<NavButton click={() => goto('/')}>
						<img src="/image/button-icons/live.png" alt="Placeholder" />
					</NavButton>
				</div>

				<div
					class="h-12 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl p-1"
				>
					<NavButton click={() => goto('/')}>
						<img src="/image/button-icons/home.png" alt="home" />
					</NavButton>
				</div>
				<div
					class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl space-y-2 p-1"
				>
					<NavButton click={() => goto('/leaderboard')}>
						<img src="/image/button-icons/leaderboard.png" alt="leaderboard" />
					</NavButton>
					<NavButton click={() => goto('/replays')}>
						<img src="/image/button-icons/replay.png" alt="replays" />
					</NavButton>
					<NavButton click={() => goto('/achievements')}>
						<img src="/image/button-icons/trophy.png" alt="achievements" />
					</NavButton>
					<NavButton click={() => goto('/profile')}>
						<img src="/image/button-icons/profile.png" alt="profile" />
					</NavButton>
				</div>
				<ElectronVersionButton />
			</div>

			<div
				in:fly={{ x: 100, duration: 150 }}
				out:fly={{ x: 100, duration: 400 }}
				class="fixed top-0 right-0 h-screen w-16 m-0 flex flex-col bg-black bg-opacity-25 border-l-1 border-opacity-25 border-white justify-center items-center space-y-4 z-50"
			>
				<div
					class="h-100 w-12 bg-gray-800 bg-opacity-75 justify-center items-center rounded-2xl space-y-2 p-1"
				>
					<ConnectionStateButton
						iconPath="/image/button-icons/obs.png"
						connectionState={$obsConnection.state}
						click={() => goto('/obs')}
					/>
					<NavButton click={() => (isMobileOpen = true)}>
						<img src="/image/button-icons/mobile.png" alt="mobile" />
					</NavButton>
					{#if $isElectron}
						<NavButton click={() => goto('/settings')}>
							<img src="/image/button-icons/settings.png" alt="settings" />
						</NavButton>
					{/if}
				</div>
				<div class="fixed bottom-4">
					<ConnectionStateButton
						iconPath="/image/button-icons/dolphin.svg"
						connectionState={$dolphinState}
					/>
				</div>
			</div>
		{:else}
			<div
				in:fly={{ y: 100, duration: 150 }}
				out:fly={{ y: 100, duration: 400 }}
				class={`fixed grid justify-center w-screen h-16 m-0 bg-black bg-opacity-60 border-t-1 border-opacity-25 bottom-0 border-white z-50 ${
					$isMobile ? 'pb-4 h-20' : ''
				}`}
			>
				<div
					class={`grid grid-cols-6 justify-center content-center place-items-center w-screen ${
						$isMobile ? 'max-w-lg' : 'max-w-xl'
					}`}
				>
					<NavButton click={() => goto('/live')}>
						<img src="/image/button-icons/live.png" alt="live" />
					</NavButton>
					<NavButton click={() => goto('/')}>
						<img src="/image/button-icons/home.png" alt="home" />
					</NavButton>
					<NavButton click={() => goto('/leaderboard')}>
						<img src="/image/button-icons/leaderboard.png" alt="leaderboard" />
					</NavButton>
					<NavButton click={() => goto('/achievements')}>
						<img src="/image/button-icons/trophy.png" alt="achievements" />
					</NavButton>
					<NavButton click={() => goto('/profile')}>
						<img src="/image/button-icons/profile.png" alt="profile" />
					</NavButton>
					<ConnectionStateButton
						iconPath="/image/button-icons/obs.png"
						connectionState={$obsConnection.state}
						click={() => goto('/obs')}
					/>
				</div>
			</div>
		{/if}
	{/if}
</div>

<Mobile bind:open={isMobileOpen} />
