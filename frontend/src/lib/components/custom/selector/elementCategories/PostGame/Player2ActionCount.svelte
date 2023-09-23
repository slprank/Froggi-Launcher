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
		description="Player2 Number Of Air Dodges Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountAirDodge}
		on:select={select}
	>
		Air Dodge Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Dash Dances Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountDashDance}
		on:select={select}
	>
		Dash Dance Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Ledge Grabs"
		customElement={CustomElement.PostGamePlayer2ActionCountLedgeGrab}
		on:select={select}
	>
		Ledge Grab Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Rolls Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountRoll}
		on:select={select}
	>
		Roll Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Spot Dodges Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountSpotDodge}
		on:select={select}
	>
		Spot Dodge Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Wave Dashes Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountWaveDash}
		on:select={select}
	>
		Wave Dash Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Wave Lands Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountWaveLand}
		on:select={select}
	>
		Wave Land Count
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Grabs Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountGrabTotal}
		on:select={select}
	>
		Grab Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Successful Grabs Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountGrabSuccess}
		on:select={select}
	>
		Grab Success Count
	</ElementOption>
	<ElementOption
		description="Player2 Percentage Of Successful Grabs Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountGrabSuccessPercent}
		on:select={select}
	>
		Grab Success Percent
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed Grabs Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountGrabFail}
		on:select={select}
	>
		Grab Fail Count
	</ElementOption>
	<ElementOption
		description="Player2 Percentage Of Failed Grabs Executed"
		customElement={CustomElement.PostGamePlayer2ActionCountGrabFailPercent}
		on:select={select}
	>
		Grab Fail Percent
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Ground Tech Situations"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechTotal}
		on:select={select}
	>
		Ground Tech Attempt Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Ground Techs In"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechIn}
		on:select={select}
	>
		Ground Tech In Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Ground Techs Out"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechAway}
		on:select={select}
	>
		Ground Tech Out Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Ground Techs Neutral"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechNeutral}
		on:select={select}
	>
		Ground Tech Neutral Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Successful Ground Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechSuccess}
		on:select={select}
	>
		Ground Tech Success Count
	</ElementOption>
	<ElementOption
		description="Player2 Percent Of Ground Techs Success"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechSuccessPercent}
		on:select={select}
	>
		Ground Tech Success Percent
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed Ground Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechFail}
		on:select={select}
	>
		Ground Tech Fail Count
	</ElementOption>
	<ElementOption
		description="Player2 Percent Of Failed Ground Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountGroundTechFailPercent}
		on:select={select}
	>
		Ground Tech Fail Percent
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Potential Wall Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountWallTechTotal}
		on:select={select}
	>
		Wall Tech Attempt Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Successful Wall Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountWallTechSuccess}
		on:select={select}
	>
		Successful Wall Tech Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Successful Wall Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountWallTechSuccessPercent}
		on:select={select}
	>
		Successful Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed Wall Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountWallTechFail}
		on:select={select}
	>
		Failed Wall Tech Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed Wall Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed Wall Techs"
		customElement={CustomElement.PostGamePlayer2ActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Potential L-Cancels"
		customElement={CustomElement.PostGamePlayer2ActionCountLCancelTotal}
		on:select={select}
	>
		L-Cancel Attempt Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Successful L-Cancels"
		customElement={CustomElement.PostGamePlayer2ActionCountLCancelSuccess}
		on:select={select}
	>
		Successful L-Cancel Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Successful L-Cancels"
		customElement={CustomElement.PostGamePlayer2ActionCountLCancelSuccessPercent}
		on:select={select}
	>
		Successful L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed L-Cancels"
		customElement={CustomElement.PostGamePlayer2ActionCountLCancelFail}
		on:select={select}
	>
		Failed L-Cancel Count
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed L-Cancels"
		customElement={CustomElement.PostGamePlayer2ActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Player2 Number Of Failed L-Cancels"
		customElement={CustomElement.PostGamePlayer2ActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Throws"
		customElement={CustomElement.PostGamePlayer2ActionCountThrowTotal}
		on:select={select}
	>
		Throw Count
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Up-Throws"
		customElement={CustomElement.PostGamePlayer2ActionCountThrowUp}
		on:select={select}
	>
		Up-Throw Count
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Forward-Throws"
		customElement={CustomElement.PostGamePlayer2ActionCountThrowForward}
		on:select={select}
	>
		Forward-Throw Count
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Back-Throws"
		customElement={CustomElement.PostGamePlayer2ActionCountThrowBack}
		on:select={select}
	>
		Back-Throw Count
	</ElementOption>
	<ElementOption
		description="Player2 Total Number Of Down-Throws"
		customElement={CustomElement.PostGamePlayer2ActionCountThrowDown}
		on:select={select}
	>
		Down-Throw Count
	</ElementOption>
</div>
