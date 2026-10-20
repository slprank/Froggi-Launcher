<script lang="ts">
	/** OBS connection: live status, one-click setup (enables OBS's WebSocket server; OBS may need a
	 * restart) and the manual WebSocket address — e.g. for OBS on another computer. */
	import BackButton from '$lib/components/navigation/BackButton.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { electronEmitter, isElectron, obsConnection, obsProcessStatus } from '$lib/utils/store.svelte';
	import { ConnectionState } from '$lib/models/enum';
	import { onMount } from 'svelte';

	const DEFAULT_AUTH = { ipAddress: '127.0.0.1', port: '4455', password: '' };
	let auth = { ...DEFAULT_AUTH };
	let configApplied = false;
	let enabling = false;

	$: connected = $obsConnection?.state === ConnectionState.Connected;
	$: connecting = $obsConnection?.state === ConnectionState.Searching;
	$: running = $obsProcessStatus?.running ?? false;
	$: websocketEnabled = $obsProcessStatus?.websocketEnabled;
	$: if (websocketEnabled) enabling = false;

	// Prefill with the local OBS's own WebSocket settings once Froggi has read them.
	$: if ($obsProcessStatus?.port && !configApplied) {
		auth = { ipAddress: 'localhost', port: $obsProcessStatus.port, password: $obsProcessStatus.password ?? '' };
		configApplied = true;
	}

	onMount(() => {
		if ($isElectron) $electronEmitter.emit('ObsProcessRefresh');
	});

	const isValidIp = (v: string) => /^(localhost|(?:25[0-5]|2[0-4]\d|[01]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3})$/.test(v);
	const isValidPort = (v: string) => /^(0|[1-9]\d{0,4})$/.test(v) && Number(v) <= 65535;
	$: valid = isValidIp(auth.ipAddress) && isValidPort(auth.port);

	const enable = () => {
		enabling = true;
		$electronEmitter.emit('ObsWebsocketEnable');
	};
	const connect = () => {
		if (!valid) return notifications.danger('Check the IP address and port', 2000);
		$electronEmitter.emit('ObsManualConnect', auth);
	};
	const reset = () => {
		auth = { ...DEFAULT_AUTH };
		configApplied = false;
	};

	$: headline = connected ? 'Connected to OBS' : connecting ? 'Connecting…' : running ? 'OBS is open — not connected yet' : $isElectron ? 'OBS is not running' : 'Not connected';
	$: detail = connected
		? 'Overlays can be added and scenes controlled from Froggi.'
		: running && websocketEnabled === false
		? "OBS's WebSocket server is off — Froggi can turn it on."
		: running
		? "Froggi can't reach OBS's WebSocket yet."
		: $isElectron
		? 'Open OBS Studio — Froggi connects automatically. OBS on another computer? Use the address below.'
		: 'Enter the address of the computer running OBS below.';
</script>

<main class="flex justify-center">
	<div class="w-full max-w-xl flex flex-col gap-4">
		<BackButton />
		<div>
			<h1 class="font-bold text-3xl">OBS Connection</h1>
			<p class="text-sm opacity-50 mt-1">Connect Froggi to OBS to add overlays and control scenes.</p>
		</div>

		<div class="dash-card border-secondary">
			<div class="status">
				<span class="dot" class:dot--ok={connected} class:dot--warn={!connected && (running || connecting)}></span>
				<div class="flex flex-col min-w-0">
					<span class="font-semibold leading-tight">{headline}</span>
					<span class="text-sm opacity-55 mt-0.5 leading-snug">{detail}</span>
				</div>
			</div>
			{#if $isElectron && !connected}
				<button class="btn text-xs h-8 px-4 border-secondary rounded self-start disabled:opacity-40" on:click={enable} disabled={!running || enabling}>
					{enabling ? 'Setting up…' : '⚙ Set up OBS automatically'}
				</button>
				<p class="hint">
					{running
						? "Turns on OBS's WebSocket server. OBS may need a restart, then Froggi connects by itself."
						: 'Open OBS Studio first to enable this.'}
				</p>
			{/if}
		</div>

		<div class="dash-card border-secondary">
			<p class="dash-label">WebSocket</p>
			<p class="hint">Filled in from your OBS automatically. Change it to control OBS on another computer (OBS → Tools → WebSocket Server Settings shows its port and password).</p>
			<div class="fields">
				<label class="field">
					<span class="field-label" class:field-label--bad={!isValidIp(auth.ipAddress)}>IP address</span>
					<input class="field-input border-secondary" type="text" placeholder="localhost" bind:value={auth.ipAddress} />
				</label>
				<label class="field field--port">
					<span class="field-label" class:field-label--bad={!isValidPort(auth.port)}>Port</span>
					<input class="field-input border-secondary" type="text" placeholder="4455" bind:value={auth.port} />
				</label>
				<label class="field">
					<span class="field-label">Password</span>
					<input class="field-input border-secondary" type="password" placeholder="Optional" bind:value={auth.password} />
				</label>
			</div>
			<div class="flex gap-2">
				<button class="btn text-xs h-8 px-4 border-secondary rounded disabled:opacity-40" on:click={connect} disabled={!valid || connected || connecting}>
					{connecting ? 'Connecting…' : connected ? 'Connected' : 'Connect'}
				</button>
				<button class="btn text-xs h-8 px-4 border-secondary rounded" on:click={reset}>Reset</button>
			</div>
		</div>
	</div>
</main>

<style>
	.dash-card { display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem 1.25rem; border-radius: 0.25rem; }
	.dash-label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.4; }
	.status { display: flex; align-items: center; gap: 0.9rem; }
	.dot { width: 0.7rem; height: 0.7rem; border-radius: 50%; background: #f87171; flex-shrink: 0; }
	.dot--ok { background: #4ade80; box-shadow: 0 0 8px #4ade80; }
	.dot--warn { background: #f59e0b; }
	.hint { font-size: 0.75rem; opacity: 0.45; line-height: 1.4; }
	.fields { display: grid; grid-template-columns: 1fr 6rem 1fr; gap: 0.6rem; }
	@media (max-width: 520px) { .fields { grid-template-columns: 1fr; } }
	.field { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
	.field-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.45; }
	.field-label--bad { color: #f87171; opacity: 0.9; }
	.field-input { height: 2rem; padding: 0 0.6rem; font-size: 0.8rem; background: transparent; color: var(--secondary-color); border-radius: 0.25rem; outline: none; min-width: 0; }
</style>
