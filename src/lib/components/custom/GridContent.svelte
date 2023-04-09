<script lang="ts">
	export const item: any = {};
	export let edit: boolean = false;
</script>

<div class={`h-full w-full flex justify-center items-center ${edit ? 'bg-white' : 'text-white'}`}>
	{item?.data ?? 'hmm'}
</div>
