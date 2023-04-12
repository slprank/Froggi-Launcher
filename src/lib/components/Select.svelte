<script lang="ts">
	export let selected;
</script>

<div class="w-full h-full flex justify-center items-center">
	<select
		id="dropdown"
		class="w-22 rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		on:change={(e) => (selected = e?.target?.value ?? '')}
	>
		<slot />
	</select>
</div>
