<script lang="ts">
	let fileinput: any;
	const onFileSelected = async (e: any) => {
		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (e) => {
			image = e.target!.result;
		};
	};
	export let image: string | undefined;
</script>

<h1>Profilbilde</h1>
<div class="flex flex-col content-center items-center gap-5">
	{#if image}
		<img alt="avatar" class="inline object-cover relative w-24 h-24 rounded-full" src={image} />
	{:else}
		<img
			alt="avatar"
			class="inline object-cover relative w-24 h-24 rounded-full"
			src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg"
		/>
	{/if}
</div>

<div class="flex flex-col items-center my-2">
	<img
		class="upload w-10 h-10 m-0 cursor-pointer hover:scale-110 duration-300"
		src="https://static.thenounproject.com/png/625182-200.png"
		alt=""
		on:click={() => {
			fileinput.click();
		}}
	/>
	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png, .gif, .svg"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileinput}
	/>
</div>
