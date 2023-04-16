<script lang="ts">
	export let value = '';
	export let key: string;
	export let type: string = 'text';
</script>

<input
	class="w-full h-full rounded-md"
	{type}
	id="head"
	name="head"
	on:change={(e) => {
		value = `${key}: ${e.target.value}`;
	}}
/>
