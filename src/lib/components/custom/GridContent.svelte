<script lang="ts">
	export let dataItem: any;
	export let edit: boolean = false;
</script>

<div class={`h-full w-full overflow-hidden  ${edit ? 'bg-white' : 'text-white'}`}>
	<h1>
		{dataItem?.data ?? 'hmmmmmmmm'}
	</h1>
</div>
