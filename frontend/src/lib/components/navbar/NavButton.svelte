<script lang="ts">
	export let click = () => {};
	export let style: string = '';
	export let disabled: boolean = false;
</script>

<button
	{disabled}
	class={`transition  h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1 col-auto disabled:opacity-50 disabled:cursor-not-allowed`}
	style={`${style}`}
	on:click={click}
>
	<slot />
</button>
