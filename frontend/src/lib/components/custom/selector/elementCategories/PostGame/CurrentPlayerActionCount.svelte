<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import { createEventDispatcher } from 'svelte';
	import ElementOption from '../ElementOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<ElementOption
		description="Current Player Number Of Air Dodges Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountAirDodge}
		on:select={select}
	>
		Air Dodge Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Dash Dances Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountDashDance}
		on:select={select}
	>
		Dash Dance Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Ledge Grabs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountLedgeGrab}
		on:select={select}
	>
		Ledge Grab Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Rolls Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountRoll}
		on:select={select}
	>
		Roll Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Spot Dodges Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountSpotDodge}
		on:select={select}
	>
		Spot Dodge Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Wave Dashes Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWaveDash}
		on:select={select}
	>
		Wave Dash Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Wave Lands Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWaveLand}
		on:select={select}
	>
		Wave Land Count
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Grabs Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGrabTotal}
		on:select={select}
	>
		Grab Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Successful Grabs Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGrabSuccess}
		on:select={select}
	>
		Grab Success Count
	</ElementOption>
	<ElementOption
		description="Current Player Percentage Of Successful Grabs Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGrabSuccessPercent}
		on:select={select}
	>
		Grab Success Percent
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed Grabs Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGrabFail}
		on:select={select}
	>
		Grab Fail Count
	</ElementOption>
	<ElementOption
		description="Current Player Percentage Of Failed Grabs Executed"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGrabFailPercent}
		on:select={select}
	>
		Grab Fail Percent
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Ground Tech Situations"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechTotal}
		on:select={select}
	>
		Ground Tech Attempt Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Ground Techs In"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechIn}
		on:select={select}
	>
		Ground Tech In Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Ground Techs Out"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechAway}
		on:select={select}
	>
		Ground Tech Out Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Ground Techs Neutral"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechNeutral}
		on:select={select}
	>
		Ground Tech Neutral Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Successful Ground Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccess}
		on:select={select}
	>
		Ground Tech Success Count
	</ElementOption>
	<ElementOption
		description="Current Player Percent Of Ground Techs Success"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccessPercent}
		on:select={select}
	>
		Ground Tech Success Percent
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed Ground Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechFail}
		on:select={select}
	>
		Ground Tech Fail Count
	</ElementOption>
	<ElementOption
		description="Current Player Percent Of Failed Ground Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountGroundTechFailPercent}
		on:select={select}
	>
		Ground Tech Fail Percent
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Potential Wall Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWallTechTotal}
		on:select={select}
	>
		Wall Tech Attempt Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Successful Wall Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWallTechSuccess}
		on:select={select}
	>
		Successful Wall Tech Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Successful Wall Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWallTechSuccessPercent}
		on:select={select}
	>
		Successful Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed Wall Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWallTechFail}
		on:select={select}
	>
		Failed Wall Tech Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed Wall Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed Wall Techs"
		customElement={CustomElement.PostGameCurrentPlayerActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Potential L-Cancels"
		customElement={CustomElement.PostGameCurrentPlayerActionCountLCancelTotal}
		on:select={select}
	>
		L-Cancel Attempt Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Successful L-Cancels"
		customElement={CustomElement.PostGameCurrentPlayerActionCountLCancelSuccess}
		on:select={select}
	>
		Successful L-Cancel Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Successful L-Cancels"
		customElement={CustomElement.PostGameCurrentPlayerActionCountLCancelSuccessPercent}
		on:select={select}
	>
		Successful L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed L-Cancels"
		customElement={CustomElement.PostGameCurrentPlayerActionCountLCancelFail}
		on:select={select}
	>
		Failed L-Cancel Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed L-Cancels"
		customElement={CustomElement.PostGameCurrentPlayerActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Failed L-Cancels"
		customElement={CustomElement.PostGameCurrentPlayerActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Throws"
		customElement={CustomElement.PostGameCurrentPlayerActionCountThrowTotal}
		on:select={select}
	>
		Throw Count
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Up-Throws"
		customElement={CustomElement.PostGameCurrentPlayerActionCountThrowUp}
		on:select={select}
	>
		Up-Throw Count
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Forward-Throws"
		customElement={CustomElement.PostGameCurrentPlayerActionCountThrowForward}
		on:select={select}
	>
		Forward-Throw Count
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Back-Throws"
		customElement={CustomElement.PostGameCurrentPlayerActionCountThrowBack}
		on:select={select}
	>
		Back-Throw Count
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Down-Throws"
		customElement={CustomElement.PostGameCurrentPlayerActionCountThrowDown}
		on:select={select}
	>
		Down-Throw Count
	</ElementOption>
</div>
