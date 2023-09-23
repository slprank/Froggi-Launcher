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
		description="Player1 Number Of Air Dodges Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountAirDodge}
		on:select={select}
	>
		Air Dodge Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Dash Dances Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountDashDance}
		on:select={select}
	>
		Dash Dance Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Ledge Grabs"
		customElement={CustomElement.PostGamePlayer1ActionCountLedgeGrab}
		on:select={select}
	>
		Ledge Grab Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Rolls Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountRoll}
		on:select={select}
	>
		Roll Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Spot Dodges Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountSpotDodge}
		on:select={select}
	>
		Spot Dodge Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Wave Dashes Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountWaveDash}
		on:select={select}
	>
		Wave Dash Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Wave Lands Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountWaveLand}
		on:select={select}
	>
		Wave Land Count
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Grabs Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountGrabTotal}
		on:select={select}
	>
		Grab Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Successful Grabs Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountGrabSuccess}
		on:select={select}
	>
		Grab Success Count
	</ElementOption>
	<ElementOption
		description="Player1 Percentage Of Successful Grabs Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountGrabSuccessPercent}
		on:select={select}
	>
		Grab Success Percent
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed Grabs Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountGrabFail}
		on:select={select}
	>
		Grab Fail Count
	</ElementOption>
	<ElementOption
		description="Player1 Percentage Of Failed Grabs Executed"
		customElement={CustomElement.PostGamePlayer1ActionCountGrabFailPercent}
		on:select={select}
	>
		Grab Fail Percent
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Ground Tech Situations"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechTotal}
		on:select={select}
	>
		Ground Tech Attempt Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Ground Techs In"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechIn}
		on:select={select}
	>
		Ground Tech In Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Ground Techs Out"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechAway}
		on:select={select}
	>
		Ground Tech Out Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Ground Techs Neutral"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechNeutral}
		on:select={select}
	>
		Ground Tech Neutral Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Successful Ground Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechSuccess}
		on:select={select}
	>
		Ground Tech Success Count
	</ElementOption>
	<ElementOption
		description="Player1 Percent Of Ground Techs Success"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechSuccessPercent}
		on:select={select}
	>
		Ground Tech Success Percent
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed Ground Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechFail}
		on:select={select}
	>
		Ground Tech Fail Count
	</ElementOption>
	<ElementOption
		description="Player1 Percent Of Failed Ground Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountGroundTechFailPercent}
		on:select={select}
	>
		Ground Tech Fail Percent
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Potential Wall Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountWallTechTotal}
		on:select={select}
	>
		Wall Tech Attempt Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Successful Wall Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountWallTechSuccess}
		on:select={select}
	>
		Successful Wall Tech Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Successful Wall Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountWallTechSuccessPercent}
		on:select={select}
	>
		Successful Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed Wall Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountWallTechFail}
		on:select={select}
	>
		Failed Wall Tech Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed Wall Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed Wall Techs"
		customElement={CustomElement.PostGamePlayer1ActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Potential L-Cancels"
		customElement={CustomElement.PostGamePlayer1ActionCountLCancelTotal}
		on:select={select}
	>
		L-Cancel Attempt Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Successful L-Cancels"
		customElement={CustomElement.PostGamePlayer1ActionCountLCancelSuccess}
		on:select={select}
	>
		Successful L-Cancel Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Successful L-Cancels"
		customElement={CustomElement.PostGamePlayer1ActionCountLCancelSuccessPercent}
		on:select={select}
	>
		Successful L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed L-Cancels"
		customElement={CustomElement.PostGamePlayer1ActionCountLCancelFail}
		on:select={select}
	>
		Failed L-Cancel Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed L-Cancels"
		customElement={CustomElement.PostGamePlayer1ActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Failed L-Cancels"
		customElement={CustomElement.PostGamePlayer1ActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Throws"
		customElement={CustomElement.PostGamePlayer1ActionCountThrowTotal}
		on:select={select}
	>
		Throw Count
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Up-Throws"
		customElement={CustomElement.PostGamePlayer1ActionCountThrowUp}
		on:select={select}
	>
		Up-Throw Count
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Forward-Throws"
		customElement={CustomElement.PostGamePlayer1ActionCountThrowForward}
		on:select={select}
	>
		Forward-Throw Count
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Back-Throws"
		customElement={CustomElement.PostGamePlayer1ActionCountThrowBack}
		on:select={select}
	>
		Back-Throw Count
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Down-Throws"
		customElement={CustomElement.PostGamePlayer1ActionCountThrowDown}
		on:select={select}
	>
		Down-Throw Count
	</ElementOption>
</div>
