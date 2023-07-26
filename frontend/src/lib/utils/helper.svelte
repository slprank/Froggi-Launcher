<script lang="ts" context="module">
	export async function asyncForEach(array: any[], callback: Function) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}

	export const getRelativePixelSize = (
		size: number,
		windowWidth: number,
		windowHeight: number,
	): number => {
		return windowWidth > windowHeight
			? size * (innerWidth / 1920)
			: size * (innerHeight / 1080);
	};
</script>
