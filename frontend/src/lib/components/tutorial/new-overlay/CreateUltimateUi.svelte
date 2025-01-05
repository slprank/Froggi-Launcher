<script lang="ts">
</script>

<h1 class="text-2xl font-semibold">Adding Ultimate Elements</h1>

<h2>
	One of (hopefully many more) elements are inspired by <b>Ultimate</b>
</h2>

<h2>
	Thus we can demonstrate the <b>Player Radar</b>
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/add-player-radar.png"
	alt="Add player radar"
/>

<h2>
	In ultimate, this element is only visible when a player is far off stage and fades away when he
	gets closer.
</h2>

<h2>Here you apply conditions for exactly this.</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/apply-player-radar-transition.png"
	alt="Add player radar transition"
/>

<h2>
	When conditions are applied, we can add a transition that has a delayed out transition. This
	allows the radar to stay active for little longer.
</h2>

<style>
	h1,
	h2 {
		color: var(--secondary-color);
	}
</style>
