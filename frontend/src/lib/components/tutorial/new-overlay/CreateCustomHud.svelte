<script lang="ts">
	import { LiveStatsScene } from '$lib/models/enum';
</script>

<h1 class="text-2xl font-semibold">Create Modern HUD</h1>

<h2>
	In this part of the tutorial we will introduce a couple of more features to be able to build a
	good looking modern overlay.
</h2>

<h2>
	We will go through how to add elements with realtime data, add visibility conditions to them and
	animations based on in-game events.
</h2>

<h2>
	Now we can move on an click the <b>{LiveStatsScene.InGame}</b>
	button.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/select-in-game-scene.png"
	alt="Select in game scene"
/>

<h2>
	It is fully possible to also include the player tag and score introduced in the <b>Menu</b>
	scene.
</h2>

<h2>
	But for the tutorial we will only focus on creating a modern looking <b>HUD</b>
	for this scene.
</h2>

<br />

<h1 class="text-lg font-bold">Creating a Pause View</h1>

<h2>
	Lets start by making a layer that is responsible for displaying <b>Pause</b>
	when the game is paused.
</h2>

<h2>
	This will help us get an understanding on how visibility conditions work and how to apply
	animations to elements based on the events.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/add-custom-pause.png"
	alt="Add custom pause"
/>

<h2>
	We start off by creating a custom text element where we type <b>Paused</b>
</h2>

<h2>
	Next we can scroll down to the <b>Visibility conditions</b>
	section.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/select-visibility-condition.png"
	alt="Select visibility condition"
/>

<h2>
	Then click the <b>New Option</b>
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/apply-visibility-options.png"
	alt="Apply visibility options"
/>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/apply-game-paused-visibility-condition.png"
	alt="Apply visibility options"
/>

<h2>Here you will get a couple of options depending on the category.</h2>

<h2>
	How this works is that any option you click on will turn <b>Red</b>
	or
	<b>Green</b>
	signifying if you want the condition to be true or false.
</h2>

<h2>In this case this means that this element will become visible if the game is paused</h2>

<h2>You can apply multiple conditions between multiple categories on a single option.</h2>

<h2>
	Condition applied to a single option works as an <b>or</b>
	operation. This means that only one of the conditions needs to be true to make the element visible.
	This will be further explored further down in this step.
</h2>

<h2>
	If you want multiple conditions to be meet, you will need to create a new <b>Option</b>
	for each condition.
</h2>

<h2>
	For the <b>Paused</b>
	element, only a single
	<b>Option</b>
	with the
	<b>Game Paused</b>
	condition is required.
</h2>

<h2>
	Then scroll down and press <b>Update</b>
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/apply-visibility-condition-animation.png"
	alt="Apply visibility transitions"
/>

<h2>
	When you return to the <b>Style</b>
	page there will an option to apply transitions.
</h2>

<h2>
	The transition properties shown in the image above have the element enter from the left and exit
	to the right.
</h2>

<h2>
	Press <b>Test Animation</b>
	 see how to transition looks and tweak it to you liking.
</h2>
