<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import { sampleObject, type SchemaRow } from '$lib/utils/flowKeys';

	// A card's output schema: what fires it (When cards), then every key it hands on — type, meaning,
	// example — and the same as a sample object. Extra sections: related state (e.g. {{state.strike}}).
	export let open: boolean;
	export let title: string;
	export let firesWhen: string | undefined = undefined;
	export let sections: { title: string; rows: SchemaRow[]; strip?: string }[] = [];

	const show = (v: unknown) => (v === null || v === undefined || v === '' ? '–' : typeof v === 'string' ? `"${v}"` : String(v));
	const copy = async (key: string) => {
		await navigator.clipboard.writeText(`{{${key}}}`);
		notifications.success(`Copied {{${key}}}`, 1200);
	};
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div class="confirm-box background-primary-color border-secondary text-secondary-color">
		<p class="title">{title}</p>
		{#if firesWhen}<p class="fires"><span class="lbl">Fires when</span> {firesWhen}</p>{/if}
		<div class="list">
			{#each sections as section (section.title)}
				<p class="section">{section.title}</p>
				{#if !section.rows.length}
					<p class="desc">Nothing — the cards after it get no new keys.</p>
				{:else}
					<table>
						<thead><tr><th>Key</th><th>Type</th><th>Meaning</th><th>Example</th></tr></thead>
						<tbody>
							{#each section.rows as row (row.key)}
								<tr>
									<td><button class="key" title="Copy {'{{'}{row.key}{'}}'}" on:click={() => copy(row.key)}>{row.key}</button></td>
									<td class="type">{row.type}</td>
									<td>{row.meaning}</td>
									<td class="example">{show(row.example)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<details>
						<summary>Sample object</summary>
						<pre>{JSON.stringify(sampleObject(section.rows, section.strip), null, 2)}</pre>
					</details>
				{/if}
			{/each}
		</div>
		<div class="actions">
			<button class="btn text-sm h-9 px-5 border-secondary rounded" on:click={() => (open = false)}>Close</button>
		</div>
	</div>
</Modal>

<style>
	.confirm-box { max-width: 760px; width: 100%; padding: 1.25rem; border-radius: 0.375rem; display: flex; flex-direction: column; gap: 0.6rem; }
	.title { font-weight: 700; }
	.fires { font-size: 0.8rem; }
	.lbl { font-size: 0.65rem; text-transform: uppercase; opacity: 0.45; margin-right: 0.3rem; }
	.desc { font-size: 0.75rem; opacity: 0.55; }
	.list { max-height: 65vh; overflow-y: auto; }
	.section { font-size: 0.65rem; text-transform: uppercase; opacity: 0.45; margin: 0.6rem 0 0.3rem; }
	table { width: 100%; border-collapse: collapse; font-size: 0.72rem; }
	th { text-align: left; font-weight: 600; opacity: 0.5; padding: 0.2rem 0.4rem; }
	td { vertical-align: top; padding: 0.25rem 0.4rem; border-top: 1px solid color-mix(in srgb, var(--secondary-color) 12%, transparent); }
	.key { background: none; color: inherit; font-family: monospace; font-size: 0.72rem; text-align: left; padding: 0; }
	.key:hover { text-decoration: underline; }
	.type { opacity: 0.6; white-space: nowrap; }
	.example { font-family: monospace; opacity: 0.7; max-width: 12rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	details { margin-top: 0.4rem; font-size: 0.72rem; }
	summary { cursor: pointer; opacity: 0.6; }
	pre { font-size: 0.68rem; padding: 0.5rem; border-radius: 0.3rem; background: color-mix(in srgb, var(--secondary-color) 6%, transparent); overflow-x: auto; }
	.actions { display: flex; justify-content: flex-end; }
</style>
