<script lang="ts">
	import SmashGg from '$lib/components/dashboard/SmashGG.svelte';
	import { DashboardOption } from '$lib/models/enum';
	import { fade, fly } from 'svelte/transition';
	import OverlayScenes from '$lib/components/dashboard/OverlayScenes.svelte';
	import Default from '$lib/components/dashboard/Default.svelte';
	import ReplayBufferHandler from '$lib/components/dashboard/ReplayBufferHandler.svelte';

	let dashboardOption: DashboardOption = DashboardOption.Offline;
</script>

<main
	class={`fixed h-screen w-screen bg-cover bg-center color-secondary`}
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div
		class="w-full h-full flex flex-col overflow-y-scroll items-center justify-start p-4 pb-24 gap-8"
	>
		<h1 class="text-white text-4xl font-bold">Dashboard</h1>
		<div class="flex gap-2">
			<button
				class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
					dashboardOption === DashboardOption.Offline ? 'border-red-700' : 'border-white'
				}`}
				on:click={() => {
					dashboardOption = DashboardOption.Offline;
				}}
			>
				Offline
			</button>
			<button
				disabled
				class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
					dashboardOption === DashboardOption.SmashGG ? 'border-red-700' : 'border-white'
				} disabled:opacity-50 disabled:cursor-not-allowed`}
				on:click={() => {
					dashboardOption = DashboardOption.SmashGG;
				}}
			>
				SmashGG
			</button>
		</div>
		{#key dashboardOption}
			<div
				class="relative w-full flex justify-center"
				in:fly={{ duration: 250, x: -200, delay: 250 }}
				out:fly={{ duration: 250, x: 200 }}
			>
				<div class="absolute flex flex-col gap-8 py-4">
					{#if dashboardOption === DashboardOption.SmashGG}
						<SmashGg />
					{/if}
					<Default />
					<OverlayScenes />
					<ReplayBufferHandler />
				</div>
			</div>
		{/key}
	</div>
</main>

<style>
</style>
