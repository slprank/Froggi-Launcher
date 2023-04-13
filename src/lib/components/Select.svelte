<script lang="ts">
	export let selected: any;
</script>

<div class="w-full flex justify-center items-center">
	<select
		id="dropdown"
		class="w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		bind:value={selected}
	>
		<slot />
	</select>
</div>
