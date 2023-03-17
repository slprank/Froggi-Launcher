<script lang="ts">
	import { isMobile } from '$lib/utils/store.svelte';
	import CurrentSet from '$lib/components/live/OngoingGame/CurrentSet.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import PlayerRank from '$lib/components/live/OngoingGame/PlayerRank.svelte';
	import CharacterIcon from '$lib/components/live/OngoingGame/CharacterIcon.svelte';
	import StatColumn from '$lib/components/live/OngoingGame/StatColumn.svelte';
	import CharacterStatsColumn from '$lib/components/live/OngoingGame/CharacterStatsColumn.svelte';
</script>

<div class="fixed place-items-start h-screen w-screen grid gap-y-0 z-3">
	<div class="w-full mt-2 z-20 px-2 md:px-16">
		<CurrentSet />
		<StatColumn textLeft={'2917.3'} textCenter={'RATING'} textRight={'2604.7'} />
		<StatColumn textLeft={'#17 [EU]'} textCenter={'RANK'} textRight={'#3 [NA]'} />
		<StatColumn textLeft={'1024 / 256'} textCenter={'W / L'} textRight={'420 / 69'} />
		<CharacterStatsColumn
			charactersLeft={[
				[20, 0],
				[0, 0],
			]}
			charactersRight={[
				[14, 0],
				[21, 0],
			]}
		/>
	</div>
	<PlayerRank player1Rank="DIAMOND 2" player2Rank="DIAMOND 3" />
</div>
