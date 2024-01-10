<script lang="ts">
	import { ControllerButtons } from '$lib/models/types/controller';
	import { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let buttonPresses: ControllerButtons | undefined;

	const getImage = (buttons: ControllerButtons | undefined) => {
		if (!buttons) return 'DPadNeutral';
		if (buttons.isDPadUpPressed && buttons.isDPadLeftPressed) return 'DPadTopLeft';
		if (buttons.isDPadUpPressed && buttons.isDPadRightPressed) return 'DPadTopRight';
		if (buttons.isDPadDownPressed && buttons.isDPadLeftPressed) return 'DPadDownLeft';
		if (buttons.isDPadDownPressed && buttons.isDPadRightPressed) return 'DPadDownRight';
		if (buttons.isDPadUpPressed) return 'DPadUp';
		if (buttons.isDPadDownPressed) return 'DPadDown';
		if (buttons.isDPadLeftPressed) return 'DPadLeft';
		if (buttons.isDPadRightPressed) return 'DPadRight';
		return 'DPadNeutral';
	};

	$: pressedButton = getImage(buttonPresses);
</script>

<div class="w-full h-full flex justify-center object-contain">
	<img
		style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow} ${
			pressedButton === 'DPadNeutral' ? 'opacity: 0.5' : ''
		}`}
		src={`/image/controller-buttons/${pressedButton}.svg`}
		alt="button"
	/>
</div>
