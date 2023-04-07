<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
</script>

<div class="fixed place-items-center h-screen w-screen grid gap-y-0 z-2">
	<div class="w-3/4 max-h-full max-w-md grid gap-y-0">
		<div class="grid place-items-center w-full">
			<TextFitMulti divClass="w-full text-white h-16 md:h-20 lg:h-24 text-center text-shadow">
				FluentCoding
			</TextFitMulti>
		</div>
		<div class="grid place-items-center w-full">
			<TextFitMulti divClass="w-full text-gray-300 h-10 text-center text-shadow">
				FLUE#123
			</TextFitMulti>
		</div>
		<div class="grid place-items-center my-2 w-full">
			<img
				src="/image/rank-icons/DIAMOND 2.svg"
				alt="rank"
				class="h-4/12 w-4/12 max-h-full max-w-full"
			/>
		</div>
		<div class="grid place-items-center w-full">
			<TextFitMulti divClass="w-full text-white h-12 md:h-14 lg:h-16 text-center text-shadow">
				DIAMOND 2
			</TextFitMulti>
		</div>
		<div class="grid place-items-center w-full">
			<TextFitMulti divClass="w-full text-gray-300 h-10 text-center text-shadow">
				2613.4
			</TextFitMulti>
		</div>
	</div>
</div>
