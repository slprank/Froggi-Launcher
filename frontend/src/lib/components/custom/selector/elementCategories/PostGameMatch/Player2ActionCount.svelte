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
		description="Player2 Number Of Air Dodges Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountAirDodge}
		on:select={select}
	>
		Air Dodge Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Dash Dances Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountDashDance}
		on:select={select}
	>
		Dash Dance Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Ledge Grabs"
		value={CustomElement.PostGameMatchPlayer2ActionCountLedgeGrab}
		on:select={select}
	>
		Ledge Grab Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Rolls Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountRoll}
		on:select={select}
	>
		Roll Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Spot Dodges Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountSpotDodge}
		on:select={select}
	>
		Spot Dodge Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Wave Dashes Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountWaveDash}
		on:select={select}
	>
		Wave Dash Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Wave Lands Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountWaveLand}
		on:select={select}
	>
		Wave Land Count
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Grabs Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountGrabTotal}
		on:select={select}
	>
		Grab Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Successful Grabs Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountGrabSuccess}
		on:select={select}
	>
		Grab Success Count
	</SelectOption>
	<SelectOption
		description="Player2 Percentage Of Successful Grabs Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountGrabSuccessPercent}
		on:select={select}
	>
		Grab Success Percent
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed Grabs Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountGrabFail}
		on:select={select}
	>
		Grab Fail Count
	</SelectOption>
	<SelectOption
		description="Player2 Percentage Of Failed Grabs Executed"
		value={CustomElement.PostGameMatchPlayer2ActionCountGrabFailPercent}
		on:select={select}
	>
		Grab Fail Percent
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Ground Tech Situations"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechTotal}
		on:select={select}
	>
		Ground Tech Attempt Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Ground Techs In"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechIn}
		on:select={select}
	>
		Ground Tech In Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Ground Techs Out"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechAway}
		on:select={select}
	>
		Ground Tech Out Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Ground Techs Neutral"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechNeutral}
		on:select={select}
	>
		Ground Tech Neutral Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Successful Ground Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechSuccess}
		on:select={select}
	>
		Ground Tech Success Count
	</SelectOption>
	<SelectOption
		description="Player2 Percent Of Ground Techs Success"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechSuccessPercent}
		on:select={select}
	>
		Ground Tech Success Percent
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed Ground Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechFail}
		on:select={select}
	>
		Ground Tech Fail Count
	</SelectOption>
	<SelectOption
		description="Player2 Percent Of Failed Ground Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountGroundTechFailPercent}
		on:select={select}
	>
		Ground Tech Fail Percent
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Potential Wall Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountWallTechTotal}
		on:select={select}
	>
		Wall Tech Attempt Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Successful Wall Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountWallTechSuccess}
		on:select={select}
	>
		Successful Wall Tech Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Successful Wall Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountWallTechSuccessPercent}
		on:select={select}
	>
		Successful Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed Wall Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountWallTechFail}
		on:select={select}
	>
		Failed Wall Tech Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed Wall Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed Wall Techs"
		value={CustomElement.PostGameMatchPlayer2ActionCountWallTechFailPercent}
		on:select={select}
	>
		Failed Wall Tech Percent
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Potential L-Cancels"
		value={CustomElement.PostGameMatchPlayer2ActionCountLCancelTotal}
		on:select={select}
	>
		L-Cancel Attempt Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Successful L-Cancels"
		value={CustomElement.PostGameMatchPlayer2ActionCountLCancelSuccess}
		on:select={select}
	>
		Successful L-Cancel Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Successful L-Cancels"
		value={CustomElement.PostGameMatchPlayer2ActionCountLCancelSuccessPercent}
		on:select={select}
	>
		Successful L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed L-Cancels"
		value={CustomElement.PostGameMatchPlayer2ActionCountLCancelFail}
		on:select={select}
	>
		Failed L-Cancel Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed L-Cancels"
		value={CustomElement.PostGameMatchPlayer2ActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Failed L-Cancels"
		value={CustomElement.PostGameMatchPlayer2ActionCountLCancelFailPercent}
		on:select={select}
	>
		Failed L-Cancel Percent
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Throws"
		value={CustomElement.PostGameMatchPlayer2ActionCountThrowTotal}
		on:select={select}
	>
		Throw Count
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Up-Throws"
		value={CustomElement.PostGameMatchPlayer2ActionCountThrowUp}
		on:select={select}
	>
		Up-Throw Count
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Forward-Throws"
		value={CustomElement.PostGameMatchPlayer2ActionCountThrowForward}
		on:select={select}
	>
		Forward-Throw Count
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Back-Throws"
		value={CustomElement.PostGameMatchPlayer2ActionCountThrowBack}
		on:select={select}
	>
		Back-Throw Count
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Down-Throws"
		value={CustomElement.PostGameMatchPlayer2ActionCountThrowDown}
		on:select={select}
	>
		Down-Throw Count
	</SelectOption>
</div>
