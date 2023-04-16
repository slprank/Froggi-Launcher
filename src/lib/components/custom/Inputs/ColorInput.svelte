<script lang="ts">
	export let value = '';
	export let key: string;

	let tempValue: string = '#000000';

	$: value = `${key}: ${tempValue}`;
</script>

<input class="w-full h-full rounded-md" type="color" id="head" name="head" bind:value={tempValue} />
