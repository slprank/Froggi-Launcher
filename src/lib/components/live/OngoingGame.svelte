<script lang="ts">
	import { textfit } from 'svelte-textfit';

	let parent: Node;
</script>

<div class="fixed place-items-start h-screen w-screen grid gap-y-0">
	<div class="w-full mt-5 z-20 px-16">
		<div class="h-28 w-full grid grid-cols-12 gap-2 place-items-center justify-items-stretch">
			<div
				class="grid justify-items-end col-span-5 h-26 max-w-full border"
				bind:this={parent}
			>
				<h1
					class="text-white text-5xl font-medium text-shadow"
					use:textfit={{
						parent,
						mode: 'multi',
					}}
				>
					VeryMuchFluentCoding
				</h1>
			</div>
			<div class="grid justify-items-center col-span-2">
				<h1 class="text-white text-5xl font-medium text-shadow">1-0</h1>
			</div>
			<div
				class="grid justify-items-start col-span-5 h-26 max-w-full border"
				bind:this={parent}
			>
				<h1
					class="text-white text-5xl font-medium text-shadow"
					use:textfit={{
						parent,
						mode: 'multi',
					}}
				>
					Ginger
				</h1>
			</div>
		</div>
		<div class="h-1/12 w-full grid grid-cols-1 gap-y-2 border">
			<div class="grid justify-items-center col-span-5">
				<h1 class="text-white text-5xl font-medium text-shadow">FluentCoding</h1>
			</div>
		</div>
		<div class="h-1/12 w-full grid grid-cols-1 gap-y-2 border">
			<div class="grid justify-items-center col-span-5">
				<h1 class="text-white text-5xl font-medium text-shadow">FluentCoding</h1>
			</div>
		</div>
		<div class="h-1/12 w-full grid grid-cols-1 gap-y-2 border">
			<div class="grid justify-items-center col-span-5">
				<h1 class="text-white text-5xl font-medium text-shadow">FluentCoding</h1>
			</div>
		</div>
	</div>
	<div class="fixed w-full mt-5 z-10">
		<div
			class="w-full grid grid-cols-2 gap-2 place-items-center justify-items-stretch opacity-80"
		>
			<div class="grid justify-items-start col-span-1">
				<img
					src="./rank-icons/DIAMOND 2.svg"
					alt="rank"
					class="aspect-square w-28 h-28 ml-2"
				/>
			</div>
			<div class="grid justify-items-end col-span-1">
				<img
					src="./rank-icons/DIAMOND 2.svg"
					alt="rank"
					class="aspect-square w-28 h-28 mr-2"
				/>
			</div>
		</div>
	</div>
</div>
