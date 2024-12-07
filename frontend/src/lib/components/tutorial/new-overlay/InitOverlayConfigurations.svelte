<script lang="ts">
	import { LiveStatsScene } from '$lib/models/enum';
</script>

<h1 class="text-2xl font-semibold">Init overlay configurations</h1>

<h2>
	Before starting with adding elements into an overlay, we can start with settings some default
	scene transitions and font.
</h2>

<h2>
	Start by clicking the <b>Settings</b>
	button top left of the page
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/open-settings.png"
	alt="Open settings"
/>

<h2>
	Here we can start by changing the name of the overlay to something that is more fitting. <br />
	As we want to create a custom HUD for a game, we can name it
	<b>Custom HUD</b>
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/change-title.png"
	alt="Change title"
/>

<h2>
	Next we can look at the active scenes. The selected and active scenes will display when the game
	is in that specific state.
</h2>
<h2>If a scene is not selected, it will fall back to one of the other scenes.</h2>
<h2>
	This is useful if you want to create an overlay where you only want to display a single scene.
	For example if you want to create an overlay to display controller inputs when a game is active,
	but blank otherwise. Then you can select the <b>InGame</b>
	scene and leave the other scenes fall back to an empty scene.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/active-scenes.png"
	alt="Active scenes"
/>

<h2>
	For this tutorial we will only worry about <b>{LiveStatsScene.WaitingForDolphin}</b>
	,
	<b>{LiveStatsScene.Menu}</b>
	and
	<b>{LiveStatsScene.InGame}</b>
	.
	<br />
	These scenes will teach you the basics of creating an overlay. How scene transitions work, create
	and style elements, apply transitions and set conditional visibility.
</h2>

<h2>
	The <b>{LiveStatsScene.PostGame}</b>
	and
	<b>{LiveStatsScene.PostSet}</b>
	scenes can be used to display stats after a game or set has finished, but is out of scope for this
	tutorial.
</h2>

<h2>
	The <b>{LiveStatsScene.RankChange}</b>
	scene can be used to display rank changes after a ranked match, but is also out of scope for this
	tutorial.
</h2>

<h2>
	There exists pre-made demo overlays that includes these scenes that you can create a copy of and
	use as inspiration.
</h2>

<h2>
	Next we can look at the default font settings. Here you can change the default font for the
	entire overlay.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/change-font.png"
	alt="Change font"
/>

<h2>
	When selecting a scene, you can update the default font for that scene. Either use the preset
	fonts that are available or upload your own custom font.
</h2>

<h2>
	For this tutorial, we will choose <b>Roboto Bold Italic</b>
	. But you can change it to something to your liking.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/change-background.png"
	alt="Change background"
/>

<h2>
	This also applies to the background settings. Here you can change the background for a scene. <br
	/>
	You can select between no background, a color, an image or a custom image.
	<br />
	If you select
	<b>{LiveStatsScene.InGame}</b>
	,
	<b>{LiveStatsScene.PostGame}</b>
	or
	<b>{LiveStatsScene.PostSet}</b>
	you will get the option to select a stage image. This can be useful in overlays that is used on external
	displays.
</h2>

<h2>
	These background can apply transitions to them. This can be useful if you want to apply a fade
	or other transitions between scenes.
</h2>

<h2>For this tutorial, it is not necessary to apply any background and we will keep it empty.</h2>

<h2>
	Over to the fun part we can apply transitions to the scenes. Here you can select between a few
	preset transitions where you can change properties like duration, delay and easing.
</h2>

<h2>
	As many scenes may include multiple layers it is possible to change the <b>
		Layers rendering delay
	</b>
	. This is used to delay the rendering of the layers in the scene from the back to the front if you
	want to create some space in the transition.
</h2>

<h2>
	For this tutorial we will select the <b>Fly Automatic</b>
	transition for all scenes. This will make the elements fly from an angle relative to their placement
	into the scene.
</h2>

<img
	class="rounded-sm border"
	src="/image/tutorial/new-overlay/update-scene-transition.png"
	alt="Update scene transition"
/>

<h2>On the entry transition we add a duration of 250ms and no delay.</h2>

<h2>
	On the exit transition we add a duration of 250ms and a delay of 750ms. The total transition
	lasts a full second and this will give a nice and smooth transition between the scenes.
</h2>

<h2>Remember to update the transition and font for all the selected scenes</h2>
