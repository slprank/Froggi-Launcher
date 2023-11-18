export async function asyncForEach(array: any[], callback: Function) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const getEnumKeys = <T>(e: T): (keyof T)[] => {
	return Object.keys(e) as (keyof T)[];
};

export const getEnumStringValues = <T>(e: T): string[] => {
	const keys = getEnumKeys(e);
	return keys
		.map((key) => e[key])
		.filter((e) => typeof e === 'string')
		.map((s) => `${s}`);
};

export const getRelativePixelSize = (
	size: number,
	windowHeight: number,
	windowWidth: number,
): number => {
	return windowWidth > windowHeight
		? size * (windowWidth / 1920)
		: size * (windowHeight / 1080);
};

export const asyncTimeout = async (ms: number) => {
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}