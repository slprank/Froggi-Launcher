<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';

	// TODO add filter dropdowns
	// Add and generate 500 lines of dummy data
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('./background/MeleeMenuGreen.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-12 place-items-start gap-2 px-2 md:px-20 grid content-center">
		<h1 class="text-2xl m-0">Leaderboard</h1>
	</div>
	<div class="w-full h-16 place-items-start flex gap-2 px-2 md:px-20">
		<div class="w-16 h-full border">Region</div>
		<div class="w-16 h-full border">Character</div>
		<div class="w-16 h-full border">Something</div>
	</div>

	<div class="w-full h-12 grid grid-cols-12 col-span-12 px-2 md:px-20">
		<div
			class="w-full h-full grid grid-cols-12 col-span-12 border-b-1 border-gray-500 rounded-t-md bg-black bg-opacity-50"
		>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">RANK</h1>
			</div>
			<div class="w-full h-12 col-span-3 grid content-center justify-start">
				<h1 class="text-white text-xl">PLAYER</h1>
			</div>
			<div class="w-full h-12 col-span-3 grid content-center justify-start">
				<h1 class="text-white text-xl">CHARACTERS</h1>
			</div>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">RATING</h1>
			</div>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">W/L</h1>
			</div>
		</div>
	</div>

	<div class="w-full place-items-start grid grid-cols-12 px-2 md:px-20 overflow-auto">
		<div
			class="w-full h-12 grid grid-cols-12 col-span-12 border-b-1 border-gray-500 bg-black bg-opacity-25"
		>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">1</h1>
			</div>
			<div class="w-full h-12 col-span-3 grid grid-rows-2 content-center">
				<h1 class="w-full h-full max-w-full text-white text-xl">GATE OF STEINER</h1>
				<h1 class="w-full h-full max-w-full text-gray-500 text-sm">ABBE#0</h1>
			</div>
			<div class="w-full h-12 col-span-3 grid content-center justify-start">
				<h1 class="text-white text-xl">ICO</h1>
			</div>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">2891.3</h1>
			</div>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">1024/194</h1>
			</div>
		</div>
		<div
			class="w-full h-12 grid grid-cols-12 col-span-12 border-b-1 border-gray-500 bg-black bg-opacity-50"
		>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">2</h1>
			</div>
			<div class="w-full h-12 col-span-3 grid grid-rows-2 content-center">
				<h1 class="w-full h-full max-w-full text-white text-xl">Nicki</h1>
				<h1 class="w-full h-full max-w-full text-gray-500 text-sm">NICKI#1</h1>
			</div>
			<div class="w-full h-12 col-span-3 grid content-center justify-start">
				<h1 class="text-white text-xl">ICO</h1>
			</div>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">2791.3</h1>
			</div>
			<div class="w-full h-12 col-span-2 grid content-center justify-center">
				<h1 class="text-white text-xl">1024/1</h1>
			</div>
		</div>
	</div>
</main>

<style>
</style>
