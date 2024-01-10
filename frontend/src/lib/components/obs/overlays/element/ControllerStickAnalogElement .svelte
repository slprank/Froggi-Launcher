<script lang="ts">
	import { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let analogXValue: number | undefined;
	export let analogYValue: number | undefined;

	$: analogXValuePercent = (analogXValue ?? 0) * 25;
	$: analogYValuePercent = -(analogYValue ?? 0) * 25;
</script>

<div
	class="w-full h-full flex justify-center items-center"
	style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
>
	<div class="aspect-square relative w-full h-full">
		<img
			class="w-full h-full absolute object-contain"
			src="/image/controller-buttons/textures/joystick-gate.png"
			alt="Joystick Gate"
		/>
		<img
			class="w-full h-full absolute object-contain"
			style={`transform: translate(${analogXValuePercent}%, ${analogYValuePercent}%);`}
			src="/image/controller-buttons/textures/joystick-mask.png"
			alt="Joystick Mask"
		/>
	</div>
</div>
