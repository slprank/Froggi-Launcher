<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div
	class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gradient-to-r from-black justify-center items-center space-y-4 z-50"
>
	<div class="h-100 w-12 bg-gray-800 justify-center rounded-2xl text-center align-middle p-1 ">
		<div
			class="h-10 w-10 bg-gray-600 justify-center rounded-2xl"
			on:click={() => goto('live')}
		/>
	</div>

	<div class="h-100 w-12 bg-gray-800 justify-center items-center rounded-2xl p-1">
		<div class="h-10 w-10 bg-gray-600 justify-center rounded-2xl" on:click={() => goto('/')} />
	</div>

	<div class="h-100 w-12 bg-gray-800 justify-center items-center rounded-2xl space-y-2 p-1">
		<div
			class="h-10 w-10 bg-gray-600 justify-center rounded-2xl"
			on:click={() => goto('replays')}
		/>
		<div
			class="h-10 w-10 bg-gray-600 justify-center rounded-2xl"
			on:click={() => goto('stats')}
		/>
		<div
			class="h-10 w-10 bg-gray-600 justify-center rounded-2xl"
			on:click={() => goto('achievements')}
		/>
		<div
			class="h-10 w-10 bg-gray-600 justify-center rounded-2xl"
			on:click={() => goto('profile')}
		/>
		<div
			class="h-10 w-10 bg-gray-600 justify-center rounded-2xl"
			on:click={() => goto('settings')}
		/>
	</div>
</div>

<div
	class="fixed top-0 right-0 h-screen w-16 m-0 flex flex-col bg-gradient-to-l from-black justify-center items-center space-y-4 z-50"
/>
