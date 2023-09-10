<script lang="ts">
	export let click = () => {};
	export let style: string;
</script>

<button
	class={`transition hover:scale-110 h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1 col-auto`}
	style={`${style}`}
	on:click={click}
>
	<slot />
</button>
