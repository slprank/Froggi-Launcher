<script lang="ts">
	import CurrentSet from '$lib/components/live/PostGameStats/CurrentSet.svelte';
	import PlayerRank from '$lib/components/live/PostGameStats/PlayerRank.svelte';
	import StatColumn from '$lib/components/live/PostGameStats/StatColumn.svelte';
	import CharacterStatsColumn from '$lib/components/live/PostGameStats/CharacterStatsColumn.svelte';
	import { fade } from 'svelte/transition';
	// TODO: Use stage id to display stage background
	let stageId = 8;
</script>

<div class="fixed place-items-start justify-items-center h-screen w-screen grid gap-y-0 z-3">
	<div class="w-full max-w-6xl mt-2 z-20 px-2 md:px-20">
		<CurrentSet />
		<StatColumn textLeft={'44.8%'} textCenter={'NEUTRAL WINS'} textRight={'45.2%'} />
		<StatColumn textLeft={'4.2'} textCenter={'OPENING / KILL'} textRight={'3.6'} />
		<StatColumn textLeft={'32.3'} textCenter={'DAMAGE / OPENING'} textRight={'36.0'} />
		<StatColumn textLeft={'37.3%'} textCenter={'EDGEGUARD / KILL'} textRight={'23.9%'} />
		<StatColumn textLeft={'371.0'} textCenter={'TOTAL DAMAGE'} textRight={'421.4'} />
		<CharacterStatsColumn
			charactersLeft={[
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0],
			]}
			charactersRight={[
				[14, 0],
				[14, 0],
				[14, 0],
				[14, 0],
			]}
		/>
	</div>
	<PlayerRank player1Rank="DIAMOND 2" player2Rank="DIAMOND 3" />
	<div
		in:fade={{ delay: 1300 }}
		out:fade={{ duration: 300 }}
		class="fixed h-screen w-screen bg-cover bg-center opacity-50"
		style={`background-image: url('/image/stages/${stageId}.png')`}
	/>
</div>
