<script lang="ts">
	import SceneSelect from '../custom/selector/SceneSelect.svelte';
</script>

<div class="flex flex-col gap-2">
	<div class="flex gap-2 justify-center items-center">
		<h1 class="text-white text-3xl font-semibold">Overlay Scenes</h1>
	</div>
	<div class="flex gap-2 justify-center items-center">
		<SceneSelect />
	</div>
</div>

<div class="flex flex-col gap-2">
	<div class="flex gap-2 justify-center items-center">
		<h1 class="text-white text-3xl font-semibold">OBS Scenes</h1>
	</div>
	<div class="flex gap-2 justify-center items-center">
		<SceneSelect />
	</div>
</div>
