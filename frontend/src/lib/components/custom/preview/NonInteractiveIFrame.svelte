<script lang="ts">
	let _class: string = '';
	export { _class as class };
	export let src: string;
	export let title: string;
</script>

<div class={`${_class} w-full h-full relative m-0`}>
	<iframe class="w-full h-full absolute m-0" {src} {title} allowtransparency={true} />
	<div class="w-full h-full absolute z-2" />
</div>
