<script lang="ts">
	let fileinput: any;
	const allowedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
	const onFileSelected = async (e: any) => {
		let reader = new FileReader();
		if (!allowedFileTypes.includes(e.target.files[0].type)) return;
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (e) => {
			image = `${e.target!.result}`;
		};
	};
	export let image: string | undefined;
</script>

<div class="flex flex-col items-center my-2">
	<img
		class="upload w-10 h-10 m-0 cursor-pointer hover:scale-110 duration-300 invert"
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
