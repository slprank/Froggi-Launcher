<script lang="ts">
	export let value = '1';

	let tempValue: number = 100;

	$: value = `${tempValue / 100}`;
</script>

<input
	id="default-range"
	type="range"
	class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
	bind:value={tempValue}
/>
