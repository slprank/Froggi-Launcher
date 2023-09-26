<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../SelectOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Number Of Air Dodges Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountAirDodge}
		on:select={select}
	>
		Air Dodge Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Dash Dances Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountDashDance}
		on:select={select}
	>
		Dash Dance Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ledge Grabs"
		value={CustomElement.PostGameCurrentPlayerActionCountLedgeGrab}
		on:select={select}
	>
		Ledge Grab Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Rolls Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountRoll}
		on:select={select}
	>
		Roll Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Spot Dodges Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountSpotDodge}
		on:select={select}
	>
		Spot Dodge Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Wave Dashes Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountWaveDash}
		on:select={select}
	>
		Wave Dash Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Wave Lands Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountWaveLand}
		on:select={select}
	>
		Wave Land Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Grabs Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountGrabTotal}
		on:select={select}
	>
		Grab Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Grabs Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountGrabSuccess}
		on:select={select}
	>
		Grab Success Count
	</SelectOption>
	<SelectOption
		description="Current Player Percentage Of Successful Grabs Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountGrabSuccessPercent}
		on:select={select}
	>
		Grab Success Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Grabs Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountGrabFail}
		on:select={select}
	>
		Grab Fail Count
	</SelectOption>
	<SelectOption
		description="Current Player Percentage Of Failed Grabs Executed"
		value={CustomElement.PostGameCurrentPlayerActionCountGrabFailPercent}
		on:select={select}
	>
		Grab Fail Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Ground Tech Situations"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechTotal}
		on:select={select}
	>
		Ground Tech Attempt Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ground Techs In"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechIn}
		on:select={select}
	>
		Ground Tech In Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ground Techs Out"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechAway}
		on:select={select}
	>
		Ground Tech Out Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Ground Techs Neutral"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechNeutral}
		on:select={select}
	>
		Ground Tech Neutral Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Ground Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccess}
		on:select={select}
	>
		Ground Tech Success Count
	</SelectOption>
	<SelectOption
		description="Current Player Percent Of Ground Techs Success"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccessPercent}
		on:select={select}
	>
		Ground Tech Success Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Ground Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechFail}
		on:select={select}
	>
		Ground Tech Fail Count
	</SelectOption>
	<SelectOption
		description="Current Player Percent Of Failed Ground Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountGroundTechFailPercent}
		on:select={select}
	>
		Ground Tech Fail Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Potential Wall Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountWallTechTotal}
		on:select={select}
	>
		Wall Tech Attempt Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Wall Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountWallTechSuccess}
		on:select={select}
	>
		Successful Wall Tech Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful Wall Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountWallTechSuccessPercent}
		on:select={select}
	>
		Successful Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Wall Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountWallTechFail}
		on:select={select}
	>
		Failed Wall Tech Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Wall Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed Wall Techs"
		value={CustomElement.PostGameCurrentPlayerActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Potential L-Cancels"
		value={CustomElement.PostGameCurrentPlayerActionCountLCancelTotal}
		on:select={select}
	>
		L-Cancel Attempt Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful L-Cancels"
		value={CustomElement.PostGameCurrentPlayerActionCountLCancelSuccess}
		on:select={select}
	>
		Successful L-Cancel Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Successful L-Cancels"
		value={CustomElement.PostGameCurrentPlayerActionCountLCancelSuccessPercent}
		on:select={select}
	>
		Successful L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed L-Cancels"
		value={CustomElement.PostGameCurrentPlayerActionCountLCancelFail}
		on:select={select}
	>
		Failed L-Cancel Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed L-Cancels"
		value={CustomElement.PostGameCurrentPlayerActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Failed L-Cancels"
		value={CustomElement.PostGameCurrentPlayerActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Throws"
		value={CustomElement.PostGameCurrentPlayerActionCountThrowTotal}
		on:select={select}
	>
		Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Up-Throws"
		value={CustomElement.PostGameCurrentPlayerActionCountThrowUp}
		on:select={select}
	>
		Up-Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Forward-Throws"
		value={CustomElement.PostGameCurrentPlayerActionCountThrowForward}
		on:select={select}
	>
		Forward-Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Back-Throws"
		value={CustomElement.PostGameCurrentPlayerActionCountThrowBack}
		on:select={select}
	>
		Back-Throw Count
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Down-Throws"
		value={CustomElement.PostGameCurrentPlayerActionCountThrowDown}
		on:select={select}
	>
		Down-Throw Count
	</SelectOption>
</div>
