<script lang="ts">
	export let value = '';
	export let key: string;

	let tempValue: number = 100;

	$: value = `${key}: ${tempValue / 100}`;
</script>

<input
	id="default-range"
	type="range"
	class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
	bind:value={tempValue}
/>
