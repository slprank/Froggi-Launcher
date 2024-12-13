<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		electronEmitter,
		isAuthorized,
		isElectron,
		authorizationKey,
	} from '$lib/utils/store.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { tooltip } from 'svooltip';

	const authenticate = async () => {
		localStorage.setItem('AuthorizationKey', authKey);
		authorizationKey.set(authKey);
		$electronEmitter.emit('Ping');
	};

	const updateKey = async () => {
		$electronEmitter.emit('AuthorizationKeyUpdate', authKey);
		notifications.success('Authorization Key Updated', 1500);
	};

	let authKey: string = $authorizationKey;

	$: $authorizationKey, (authKey = $authorizationKey);
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class={`w-full h-full  px-2 gap-4 flex flex-col justify-between items-center`}>
		<div>
			<h1 class="text-4xl font-bold text-white shadow-md">Settings</h1>
		</div>
		<div
			class="flex-1 flex flex-col flex-wrap gap-4 w-full items-center justify-start overflow-auto py-4 border border-gray-500 rounded-md p-4"
		>
			<h1 class="text-xl font-bold text-white shadow-md">
				Authentication - <span
					class={`${$isAuthorized ? 'text-green-500' : 'text-red-700}'} shadow-md`}
				>
					{!$isAuthorized ? 'Not ' : ''}Authorized
				</span>
			</h1>
			<div class="flex flex-col gap-2">
				<h1
					class="text-white font-md text-center"
					use:tooltip={{
						content: 'Passkey for authorizing external devices',
						html: true,
						placement: 'top',
						delay: [200, 0],
						offset: 15,
					}}
				>
					Authorization Key
				</h1>
				<input
					class="w-full rounded-md p-2 disabled:grayscale"
					type="text"
					bind:value={authKey}
					disabled={!$isElectron && $isAuthorized}
				/>
				{#if $isElectron}
					<button
						class="w-full rounded-md p-2 bg-green-500 text-white hover:cursor-pointer"
						on:click={updateKey}
					>
						Update
					</button>
				{/if}
				{#if !$isElectron}
					<button
						class="w-full rounded-md p-2 bg-green-500 text-white hover:cursor-pointer disabled:bg-gray-700 disabled:hover:scale-0"
						on:click={authenticate}
						disabled={$isAuthorized}
					>
						Authenticate
					</button>
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
</style>
