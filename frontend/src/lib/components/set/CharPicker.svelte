<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Character grid + confirm bar for the striking phones. One pick (singles) or one per teammate
	// (doubles: `members` = the team's tags, lower port first) — Confirm sends them all at once.
	export let members: string[] = [];

	const MELEE_CHARS = [
		22,  8,  7,  5, 12, 17,  1,  0, 25, // Dr.Mario Mario Luigi Bowser Peach Yoshi DK Falcon Ganon
		20,  2, 11, 14,  4, 16, 18,  6, 21, // Falco Fox Ness ICs Kirby Samus Zelda Link Y.Link
		24, 13, 15, 10,  3,  9, 23,          // Pichu Pikachu Puff Mewtwo G&W Marth Roy
	];
	const CHAR_NAMES: Record<number, string> = {
		0:'C. Falcon',1:'Donkey Kong',2:'Fox',3:'Mr. Game & Watch',4:'Kirby',5:'Bowser',6:'Link',
		7:'Luigi',8:'Mario',9:'Marth',10:'Mewtwo',11:'Ness',12:'Peach',
		13:'Pikachu',14:'Ice Climbers',15:'Jigglypuff',16:'Samus',17:'Yoshi',
		18:'Zelda',19:'Sheik',20:'Falco',21:'Young Link',22:'Dr. Mario',
		23:'Roy',24:'Pichu',25:'Ganondorf',
	};

	const dispatch = createEventDispatcher<{ confirm: number[] }>();
	$: count = Math.max(1, members.length);
	let picks: (number | null)[] = [];
	$: if (picks.length !== count) picks = Array(count).fill(null);
	let active = 0;

	function tap(charId: number) {
		picks[active] = charId;
		picks = picks;
		const next = picks.findIndex((p) => p === null);
		if (next >= 0) active = next;
	}
	$: ready = picks.length > 0 && picks.every((p) => p !== null);
	$: anyPicked = picks.some((p) => p !== null);
	const confirm = () => ready && dispatch('confirm', picks as number[]);
	const cancel = () => {
		picks = Array(count).fill(null);
		active = 0;
	};
</script>

{#if members.length > 1}
	<div class="member-row">
		{#each members as name, i}
			<button class="member" class:member--active={active === i} on:click={() => (active = i)}>
				{#if picks[i] !== null}<img src="/image/characters/css/{picks[i]}.png" alt="" class="member-img" />{:else}<span class="member-empty">?</span>{/if}
				<span class="member-name">{name}</span>
			</button>
		{/each}
	</div>
{/if}

<div class="char-grid">
	{#each MELEE_CHARS as charId}
		<button class="char-btn" class:char-btn--pending={picks[active] === charId} on:click={() => tap(charId)} title={CHAR_NAMES[charId]}>
			<img src="/image/characters/css/{charId}.png" alt={CHAR_NAMES[charId]} class="char-btn-img" />
		</button>
	{/each}
</div>

{#if anyPicked}
	<div class="char-confirm-bar">
		{#each picks as p}
			{#if p !== null}<img src="/image/characters/css/{p}.png" alt="" class="char-confirm-img" />{/if}
		{/each}
		<div class="char-confirm-btns">
			<button class="char-confirm-ok" disabled={!ready} on:click={confirm}>{ready ? 'Confirm' : `Pick for ${members[active]}`}</button>
			<button class="char-confirm-cancel" on:click={cancel}>Cancel</button>
		</div>
	</div>
{/if}

<style>
	.member-row { display: flex; gap: 0.5rem; }
	.member {
		flex: 1; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.6rem;
		background: color-mix(in srgb, var(--fg) 4%, transparent); border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent);
		border-radius: 0.4rem; color: var(--fg); cursor: pointer; min-width: 0;
	}
	.member--active { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); }
	.member-img { width: 32px; height: 32px; object-fit: contain; }
	.member-empty { width: 32px; text-align: center; opacity: 0.4; font-weight: 700; }
	.member-name { font-size: 0.8rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	/* Square cells; the column count follows the orientation so all 26 fit on one screen:
	   portrait 6 wide (big icons), landscape 13 wide (two rows). */
	.char-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.35rem; max-width: 34rem; }
	@media (orientation: landscape) { .char-grid { grid-template-columns: repeat(13, minmax(0, 1fr)); max-width: 60rem; } }
	.char-btn {
		aspect-ratio: 1; background: color-mix(in srgb, var(--fg) 4%, transparent);
		border: 1px solid color-mix(in srgb, var(--fg) 10%, transparent); border-radius: 0.3rem;
		cursor: pointer; overflow: hidden; padding: 0;
	}
	.char-btn:active { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
	.char-btn-img { width: 100%; height: 100%; object-fit: contain; display: block; }
	.char-btn--pending { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 15%, transparent); }

	.char-confirm-bar {
		display: flex; align-items: center; gap: 0.75rem;
		background: color-mix(in srgb, var(--fg) 6%, transparent); border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent);
		border-radius: 0.5rem; padding: 0.5rem 0.75rem; margin-top: 0.25rem;
	}
	.char-confirm-img { width: 48px; height: 48px; object-fit: contain; }
	.char-confirm-btns { display: flex; gap: 0.5rem; margin-left: auto; }
	.char-confirm-ok {
		padding: 0.4rem 1rem; border-radius: 0.35rem; font-size: 0.8rem; font-weight: 700;
		background: var(--accent); color: var(--on-accent); border: none; cursor: pointer;
	}
	.char-confirm-ok:disabled { opacity: 0.5; cursor: default; }
	.char-confirm-cancel {
		padding: 0.4rem 0.75rem; border-radius: 0.35rem; font-size: 0.8rem;
		background: color-mix(in srgb, var(--fg) 8%, transparent); color: var(--fg);
		border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent); cursor: pointer;
	}
</style>
