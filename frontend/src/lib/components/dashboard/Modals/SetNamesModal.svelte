<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { electronEmitter, strikeState } from '$lib/utils/store.svelte';

	// Names of the running set — players can type their own on their phone; the host overwrites here.
	export let open: boolean;
	let names: [string, string] = ['', ''];
	$: if (open) names = [$strikeState?.p1Name ?? '', $strikeState?.p2Name ?? ''];

	const save = () => {
		if (names[0] !== $strikeState?.p1Name) $electronEmitter.emit('StrikeSetName', 1, names[0]);
		if (names[1] !== $strikeState?.p2Name) $electronEmitter.emit('StrikeSetName', 2, names[1]);
		open = false;
	};
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div class="confirm-box background-primary-color border-secondary text-secondary-color">
		<p class="title">Names in this set</p>
		<p class="desc">Players can set their own name on their phone — what you type here replaces it.</p>
		<input class="name border-secondary" placeholder="Player 1" bind:value={names[0]} />
		<input class="name border-secondary" placeholder="Player 2" bind:value={names[1]} />
		<div class="actions">
			<button class="btn text-sm h-9 px-5 border-secondary rounded" on:click={() => (open = false)}>Cancel</button>
			<button class="btn text-sm h-9 px-5 border-secondary rounded confirm-ok" on:click={save}>Save</button>
		</div>
	</div>
</Modal>

<style>
	.confirm-box { max-width: 400px; padding: 1.25rem; border-radius: 0.375rem; display: flex; flex-direction: column; gap: 0.6rem; }
	.title { font-weight: 700; }
	.desc { font-size: 0.75rem; opacity: 0.55; }
	.name { height: 2.2rem; padding: 0 0.7rem; background: transparent; color: var(--secondary-color); border-radius: 0.3rem; }
	.actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.4rem; }
	.confirm-ok { background: var(--secondary-color); color: var(--primary-color); }
</style>
