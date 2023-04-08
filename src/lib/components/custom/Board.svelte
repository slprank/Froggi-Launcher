<script lang="ts">
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';

	const COL = 32;

	export let editable = false;
	export let height: number | undefined = undefined;

	const id = () => '_' + Math.random().toString(36).substr(2, 9);
	export let items = [
		{
			32: gridHelp.item({
				x: 0,
				y: 0,
				w: 2,
				h: 2,
				max: { y: 32 },
			}),
			id: id(),
		},

		{
			32: gridHelp.item({
				x: 2,
				y: 0,
				w: 2,
				h: 4,
				max: { y: 32 },
			}),
			id: id(),
			data: 'damn',
		},
	];

	items.forEach((item) => {
		item[COL].draggable = editable;
		item[COL].resizable = editable;
	});

	function updateScene() {
		// TODO: Store in electron-store
		console.log(items);
	}

	const cols = [[32, 32]];

	let innerHeight: number;
</script>

<svelte:window bind:innerHeight />

{#key height}
	<div class={`'w-full h-full' overflow-hidden`}>
		<Grid
			bind:items
			rowHeight={(height ?? innerHeight) / (COL + 2)}
			gap={[0, 0]}
			let:item
			let:dataItem
			{cols}
			fastStart={true}
			on:change={updateScene}
		>
			<div
				class={`h-full w-full flex justify-center items-center ${
					editable ? 'bg-white' : 'text-white'
				}`}
			>
				{dataItem?.data ?? 'hmm'}
			</div>
		</Grid>
	</div>
{/key}
