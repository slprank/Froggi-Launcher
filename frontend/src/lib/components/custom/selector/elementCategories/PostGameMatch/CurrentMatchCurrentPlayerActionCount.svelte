<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../visibilityCategories/SelectVisibilityOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Number Of Air Dodges Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountAirDodge}
		on:select={select}
	>
		Air Dodge Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Dash Dances Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountDashDance}
		on:select={select}
	>
		Dash Dance Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ledge Grabs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountLedgeGrab}
		on:select={select}
	>
		Ledge Grab Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Rolls Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountRoll}
		on:select={select}
	>
		Roll Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Spot Dodges Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountSpotDodge}
		on:select={select}
	>
		Spot Dodge Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Wave Dashes Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWaveDash}
		on:select={select}
	>
		Wave Dash Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Wave Lands Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWaveLand}
		on:select={select}
	>
		Wave Land Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Grabs Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGrabTotal}
		on:select={select}
	>
		Grab Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Grabs Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGrabSuccess}
		on:select={select}
	>
		Grab Success Count
	</SelectOption>
	<SelectOption
		description="Current Player Percentage Of Successful Grabs Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGrabSuccessPercent}
		on:select={select}
	>
		Grab Success Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Grabs Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGrabFail}
		on:select={select}
	>
		Grab Fail Count
	</SelectOption>
	<SelectOption
		description="Current Player Percentage Of Failed Grabs Executed"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGrabFailPercent}
		on:select={select}
	>
		Grab Fail Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Ground Tech Situations"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechTotal}
		on:select={select}
	>
		Ground Tech Attempt Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ground Techs In"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechIn}
		on:select={select}
	>
		Ground Tech In Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ground Techs Out"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechAway}
		on:select={select}
	>
		Ground Tech Out Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ground Techs Neutral"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechNeutral}
		on:select={select}
	>
		Ground Tech Neutral Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Ground Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechSuccess}
		on:select={select}
	>
		Ground Tech Success Count
	</SelectOption>
	<SelectOption
		description="Current Player Percent Of Ground Techs Success"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechSuccessPercent}
		on:select={select}
	>
		Ground Tech Success Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Ground Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechFail}
		on:select={select}
	>
		Ground Tech Fail Count
	</SelectOption>
	<SelectOption
		description="Current Player Percent Of Failed Ground Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechFailPercent}
		on:select={select}
	>
		Ground Tech Fail Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Potential Wall Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWallTechTotal}
		on:select={select}
	>
		Wall Tech Attempt Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Wall Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWallTechSuccess}
		on:select={select}
	>
		Successful Wall Tech Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Wall Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWallTechSuccessPercent}
		on:select={select}
	>
		Successful Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Wall Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWallTechFail}
		on:select={select}
	>
		Failed Wall Tech Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Wall Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Wall Techs"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Potential L-Cancels"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountLCancelTotal}
		on:select={select}
	>
		L-Cancel Attempt Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful L-Cancels"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountLCancelSuccess}
		on:select={select}
	>
		Successful L-Cancel Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful L-Cancels"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountLCancelSuccessPercent}
		on:select={select}
	>
		Successful L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed L-Cancels"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountLCancelFail}
		on:select={select}
	>
		Failed L-Cancel Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed L-Cancels"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed L-Cancels"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Throws"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountThrowTotal}
		on:select={select}
	>
		Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Up-Throws"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountThrowUp}
		on:select={select}
	>
		Up-Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Forward-Throws"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountThrowForward}
		on:select={select}
	>
		Forward-Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Back-Throws"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountThrowBack}
		on:select={select}
	>
		Back-Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Down-Throws"
		value={CustomElement.PostGameMatchCurrentPlayerActionCountThrowDown}
		on:select={select}
	>
		Down-Throw Count
	</SelectOption>
</div>
