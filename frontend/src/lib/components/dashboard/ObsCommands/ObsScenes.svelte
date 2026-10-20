<script lang="ts">
	import { CommandType } from '$lib/models/types/commandTypes';
	import { electronEmitter, obsConnection } from '$lib/utils/store.svelte';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	// Dashboard scene switcher. Favourites are shown first as big buttons; picked in a modal and stored
	// per device (localStorage), so each control device can keep its own shortlist.
	const FAVOURITES_KEY = 'froggi.dashboard.favouriteScenes';
	let favourites: string[] = [];
	let showAll = false;
	let pickOpen = false;

	onMount(() => {
		try {
			favourites = JSON.parse(localStorage.getItem(FAVOURITES_KEY) ?? '[]');
		} catch {
			favourites = [];
		}
	});

	const toggleFavourite = (name: string) => {
		favourites = favourites.includes(name) ? favourites.filter((f) => f !== name) : [...favourites, name];
		localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
	};

	const switchScene = (sceneName: string) =>
		$electronEmitter.emit('ExecuteCommand', CommandType.Obs, 'SetCurrentProgramScene', { sceneName });

	// OBS lists scenes bottom-up; show them top-down like the OBS scene dock.
	$: scenes = [...($obsConnection?.scenes?.scenes ?? [])].reverse().map((s) => s.sceneName);
	$: current = $obsConnection?.scenes?.currentProgramSceneName;
	$: favouriteScenes = favourites.filter((f) => scenes.includes(f));
	$: listed = showAll || !favouriteScenes.length ? scenes : [];
</script>

{#if scenes.length}
	{#if favouriteScenes.length}
		<div class="fav-grid">
			{#each favouriteScenes as name (name)}
				<button class="scene-btn scene-btn--fav" class:scene-btn--live={current === name} on:click={() => switchScene(name)}>
					{name}
				</button>
			{/each}
		</div>
		<button class="show-all" on:click={() => (showAll = !showAll)}>{showAll ? 'Hide other scenes' : 'All scenes'}</button>
	{/if}
	{#if listed.length}
		<div class="flex flex-col gap-1.5" class:mt-2={favouriteScenes.length}>
			{#each listed as name (name)}
				<button class="scene-btn" class:scene-btn--live={current === name} on:click={() => switchScene(name)}>{name}</button>
			{/each}
		</div>
	{/if}
	<button class="show-all" on:click={() => (pickOpen = true)}>★ {favouriteScenes.length ? 'Edit favourites' : 'Pick favourite scenes'}</button>

	<Modal bind:open={pickOpen} on:close={() => (pickOpen = false)}>
		<div class="confirm-box background-primary-color border-secondary text-secondary-color">
			<p class="title">Favourite scenes</p>
			<p class="desc">Favourites are big buttons at the top — saved on this device.</p>
			<div class="pick-list">
				{#each scenes as name (name)}
					<label class="pick-row border-secondary">
						<input type="checkbox" class="toggle-check" checked={favourites.includes(name)} on:change={() => toggleFavourite(name)} />
						<span>{name}</span>
					</label>
				{/each}
			</div>
			<div class="actions">
				<button class="btn text-sm h-9 px-5 border-secondary rounded confirm-ok" on:click={() => (pickOpen = false)}>Done</button>
			</div>
		</div>
	</Modal>
{:else}
	<p class="hint">No scenes — connect OBS.</p>
{/if}

<style>
	.fav-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
		gap: 0.4rem;
	}
	.scene-btn {
		text-align: left;
		font-size: 0.8rem;
		padding: 0.35rem 0.6rem;
		border-radius: 0.3rem;
		border: 1px solid color-mix(in srgb, var(--secondary-color) 25%, transparent);
		color: var(--secondary-color);
		background: transparent;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.scene-btn--fav {
		text-align: center;
		font-weight: 600;
		padding: 0.6rem 0.5rem;
	}
	.scene-btn:hover {
		background: color-mix(in srgb, var(--secondary-color) 10%, transparent);
	}
	.scene-btn--live {
		border-color: #ef4444;
		background: color-mix(in srgb, #ef4444 15%, transparent);
	}
	.confirm-box { width: min(380px, 90vw); max-height: 80vh; padding: 1.25rem; border-radius: 0.375rem; display: flex; flex-direction: column; gap: 0.6rem; }
	.title { font-weight: 700; }
	.desc { font-size: 0.75rem; opacity: 0.55; }
	.pick-list { display: flex; flex-direction: column; gap: 0.35rem; overflow-y: auto; }
	.pick-row { display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.6rem; border-radius: 0.3rem; font-size: 0.85rem; cursor: pointer; }
	.toggle-check { width: 0.9rem; height: 0.9rem; }
	.actions { display: flex; justify-content: flex-end; margin-top: 0.3rem; }
	.confirm-ok { background: var(--secondary-color); color: var(--primary-color); }
	.show-all {
		margin-top: 0.4rem;
		font-size: 0.7rem;
		opacity: 0.5;
		color: var(--secondary-color);
		background: none;
	}
	.hint {
		font-size: 0.7rem;
		opacity: 0.4;
		margin-top: 0.4rem;
	}
</style>
