<script lang="ts" context="module">
	export async function asyncForEach(array: any[], callback: Function) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}

	export const getRelativePixelSize = (
		size: number,
		windowHeight: number,
		windowWidth: number,
	): number => {
		return windowWidth > windowHeight
			? size * (windowWidth / 1920)
			: size * (windowHeight / 1080);
	};
</script>
