<script lang="ts">
	import { obs } from '$lib/utils/store.svelte';
	import TextFitMulti from '../TextFitMulti.svelte';

	export let dataItem: any;
	export let edit: boolean = false;
</script>

{#key $obs}
	<div class={`h-full w-full overflow-hidden  ${edit ? 'bg-white' : 'text-white'} bg-opacity-50`}>
		<TextFitMulti divClass="w-full h-full flex justify-center items-center text-6xl">
			{dataItem?.data ?? 'Snider'}
		</TextFitMulti>
	</div>
{/key}
