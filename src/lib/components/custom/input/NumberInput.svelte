<script lang="ts">
	export let value: number;
	export let label: string;
</script>

<div class="w-full h-full">
	<input
		type="number"
		class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
		id="numberInput"
		bind:value
	/>
	<label
		for="numberInput"
		class="absolute left-3 top-0 mb-0 max-w-[90%] w-14 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-shadow transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none text-gray-500 text-md font-medium text-shadow"
	>
		{label}
	</label>
</div>
