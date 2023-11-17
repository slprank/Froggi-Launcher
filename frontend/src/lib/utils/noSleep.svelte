<script lang="ts" context="module">
	import NoSleep from 'nosleep.js';

	// Is only active if touching the screen after visiting
	export const initNoSleep = () => {
		const noSleep = new NoSleep();
		document.addEventListener(
			'touchstart',
			function enableNoSleep() {
				document.removeEventListener('click', enableNoSleep, false);
				noSleep.enable();
			},
			false,
		);
	};
</script>
