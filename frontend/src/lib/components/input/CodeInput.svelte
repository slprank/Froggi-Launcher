<script lang="ts">
	import { AceEditor } from 'svelte-ace';
	import 'brace/mode/json';
	import 'brace/theme/chrome';
	export let label: string | undefined = undefined;
	export let value: string | undefined;
</script>

{#if label}
	<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
{/if}
<AceEditor width={'100%'} height={'100px'} lang="css" theme="chrome" bind:value />
