<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { BestOf } from '$lib/models/enum';
	import { electronEmitter } from '$lib/utils/store.svelte';

	export let open: boolean;

	const handleUpdate = (bestOf: BestOf) => {
		$electronEmitter.emit('BestOfUpdate', bestOf)
		open = false;
	};

</script>

<Modal
	bind:open
	on:close={() => (open = false)}
	class="flex justify-center"
>
	<div
		class="w-[70vw] max-w-[600px] max-h-[80vh] min-w-72  flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="flex gap-4 justify-center items-center">
			<h1 class="text-white text-3xl font-semibold">Games</h1>
		</div>
		
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
			on:click={() => handleUpdate(BestOf.BestOf3)}
		>
			Best Of 3
		</button>
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
			on:click={() => handleUpdate(BestOf.BestOf5)}
		>
			Best Of 5
		</button>
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
			on:click={() => handleUpdate(BestOf.BestOf7)}
		>
			Best Of 7
		</button>
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
			on:click={() => handleUpdate(BestOf.BestOf9)}
		>
			Best Of 9
		</button>
	</div>
</Modal>
