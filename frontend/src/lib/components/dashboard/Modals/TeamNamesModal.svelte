<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { electronEmitter, teamNames } from '$lib/utils/store.svelte';

	// Doubles team names. Empty = automatic "Tag & Tag".
	export let open: boolean;
	export let placeholders: [string, string];
	let names: [string, string] = ['', ''];
	$: if (open) names = [...$teamNames] as [string, string];

	const save = () => {
		$electronEmitter.emit('SetTeamNames', names);
		open = false;
	};
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div class="confirm-box background-primary-color border-secondary text-secondary-color">
		<p class="title">Team names</p>
		<p class="desc">Leave empty to use the players' tags ("{placeholders[0]}").</p>
		<input class="name border-secondary" placeholder={placeholders[0]} bind:value={names[0]} />
		<input class="name border-secondary" placeholder={placeholders[1]} bind:value={names[1]} />
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
