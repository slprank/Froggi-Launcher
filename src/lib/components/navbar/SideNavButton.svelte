<script lang="ts">
	export let click = () => {};
	// TODO: Add click animation
</script>

<button class="h-10 w-10 bg-gray-600 bg-opacity-75 justify-center rounded-2xl p-1" on:click={click}>
	<slot />
</button>
