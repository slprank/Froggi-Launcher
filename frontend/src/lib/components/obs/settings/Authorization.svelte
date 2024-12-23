<script lang="ts">
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import {
		authorizationKey,
		electronEmitter,
		isAuthorized,
		isElectron,
	} from '$lib/utils/store.svelte';
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

<div
	class="flex flex-col gap-4 w-full items-center justify-start overflow-auto py-4 border border-gray-500 rounded-md p-4"
>
	<div>
		<h1 class="text-4xl font-bold text-white shadow-md">Authorization</h1>
	</div>
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
				content: 'Pass key for authorizing external devices',
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
