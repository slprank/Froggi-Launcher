<script lang="ts">
</script>

<h1 class="text-2xl font-semibold">Adding layers</h1>

<h2>
	As other centered hud components are not allowed to overlap with other components it is
	necessary to add a new layers.
</h2>

<h2>
	We want to replicate most of the HUD from melee as possible. Thus we want to implement the <b>
		Ready
	</b>
	and
	<b>Go</b>
	text when game starts.
</h2>

<img class="rounded-sm border" src="/image/tutorial/new-overlay/add-layer.png" alt="Add layer" />

<h2>
	Create two new layers above the <b>Pause</b>
	layer.
</h2>

<h2>
	As the topmost layers are rendered first, this is essential to get the into elements to display
</h2>

<h2>
	Add a new custom text element with <b>READY</b>
	as the value.
</h2>

<h2>
	Create two options where on have an inverted (Red) <b>Game Paused</b>
	selected. And the other have the
	<b>Ready</b>
	selected
</h2>

<h2>
	This tells the program that the element is visible when the game is <b>not</b>
	paused and the game timer is in the entry window for displaying
	<b>Ready</b>
	(Based on timer from the vanilla game).
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/transition-ready.png"
	alt="Add ready transition"
/>

<h2>
	These transitions are inspired by the original game and have the text scale in on the correct
	time window.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/preview-hud-text.png"
	alt="Preview intro and pause text"
/>

<h2>When both components are added, it should look something like this.</h2>

<h2>You will see that the preview is getting quite messy when multiple layers are overlapping.</h2>

<h2>You can toggle each scene to only preview layers you find necessary to preview.</h2>

<h2>
	You can also click on the <b>Preview</b>
	 button which will allow you to open a preview window on an external screen or device.
</h2>
