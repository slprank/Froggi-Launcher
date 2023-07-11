<script lang="ts">
	let fileinput: any;
	const onFileSelected = async (e: any) => {
		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (e) => {
			base64 = `${e.target!.result}`;
		};
	};
	export let label: string | undefined = undefined;
	export let base64: string | undefined;
	export let acceptedExtensions: string | undefined = undefined;
</script>

<div class="grid">
	{#if label}
		<h1 class="text-gray-500 text-sm font-medium text-shadow">{label}</h1>
	{/if}
	<div class="flex flex-col items-center">
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 w-full px-2 xl:text-xl border  rounded`}
			on:click={() => {
				fileinput.click();
			}}
		>
			Upload
		</button>
		<input
			style="display:none"
			type="file"
			accept={acceptedExtensions}
			on:change={(e) => onFileSelected(e)}
			bind:this={fileinput}
		/>
	</div>
</div>
