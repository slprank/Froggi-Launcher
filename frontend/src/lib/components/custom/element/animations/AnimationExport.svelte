<script lang="ts" context="module">
	import { fly } from 'svelte/transition';

	export const testAnimation = (node, option) => {
		return fly(node, option);
	};
</script>
