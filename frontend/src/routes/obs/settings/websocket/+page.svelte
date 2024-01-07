<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { electronEmitter, obs } from '$lib/utils/store.svelte';
	import { cloneDeep } from 'lodash';

	const defaultAuth = { ipAddress: '127.0.0.1', port: 4455, password: '' };
	let authValidator = { ipAddress: false, port: false, password: false };

	let auth = $obs?.auth ?? cloneDeep(defaultAuth);

	$: $obs, (auth = $obs?.auth ?? defaultAuth);

	const isValidIpAddress = (ipAddress: string) => {
		const ipv4Regex =
			/^(localhost|127(?:\.[0-9]{1,3}){2}\.[0-9]{1,3}|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return ipv4Regex.test(ipAddress);
	};

	const handleIpAddressChange = (event: CustomEvent<string>) => {
		const ipAddress = event.detail;
		auth.ipAddress = ipAddress;
	};

	const isValidPort = (port: number) => {
		const portRegex = /^(0|[1-9]\d{0,4})$/;
		return portRegex.test(port.toString()) && port <= 65535;
	};

	const handlePortChange = (event: CustomEvent<string>) => {
		const port = Number(event.detail);
		auth.port = port;
	};

	const isValidInputs = () => {
		return Object.values(authValidator).every((value) => value);
	};

	const validateAuth = () => {
		authValidator = {
			ipAddress: isValidIpAddress(auth.ipAddress),
			port: isValidPort(auth.port),
			password: typeof auth.password === 'string',
		};
	};
	$: auth, validateAuth();

	const updateAuth = () => {
		if (!isValidInputs()) {
			notifications.danger('Invalid Inputs', 3000);
			return;
		}
		$electronEmitter.emit('ObsAuth', auth);
		notifications.success('Updated OBS Websocket Settings', 3000);
	};

	const resetToDefault = () => {
		auth = cloneDeep(defaultAuth);
	};
</script>

<div class="w-full max-w-[25rem] justify-center items-center item flex flex-col gap-4">
	<h1 class="text-2xl text-white">Websocket Settings</h1>

	<div class={`flex flex-col gap-2 p-2 `}>
		<h1
			class={`text-xl font-semibold text-nowrap ${
				!authValidator.ipAddress ? 'text-red-700' : 'text-white'
			}`}
		>
			Local Ip Address:
		</h1>
		<TextInput value={auth?.ipAddress ?? ''} on:change={handleIpAddressChange} />
	</div>
	<div class="flex flex-col gap-2 p-2">
		<h1
			class={`text-xl font-semibold text-nowrap ${
				!authValidator.port ? 'text-red-700' : 'text-white'
			}`}
		>
			Port:
		</h1>
		<TextInput value={`${auth?.port}`} on:change={handlePortChange} />
	</div>
	<div class="flex flex-col gap-2 p-2">
		<h1
			class={`text-xl font-semibold text-nowrap ${
				!authValidator.password ? 'text-red-700' : 'text-white'
			}`}
		>
			Password:
		</h1>
		<TextInput value={auth.password} on:change={(e) => (auth.password = e.detail)} />
	</div>
	<button class="p-2 border rounded-md" on:click={updateAuth}>
		<h1 class="text-white text-xl font-semibold">Update</h1>
	</button>
	<hr />
	<button class="p-2 border rounded-md" on:click={resetToDefault}>
		<h1 class="text-white text-xl font-semibold">Reset To Default</h1>
	</button>
</div>
