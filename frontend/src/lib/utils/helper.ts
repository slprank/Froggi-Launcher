import { ControllerButtons } from "../models/types/controller";

export async function asyncForEach(array: any[], callback: Function) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

export function newId() {
	return `c${Math.random().toString(36).slice(-8)}`;
}

const getEnumKeys = <T>(e: T): (keyof T)[] => {
	return Object.keys(e as any) as (keyof T)[];
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

export const getButtonPressesMemory = (buttonPresses: number | undefined): ControllerButtons | undefined => {
	if (!buttonPresses) return;
	return {
		isAPressed: Boolean(buttonPresses & (1 << 8)),
		isBPressed: Boolean(buttonPresses & (1 << 9)),
		isDPadLeftPressed: Boolean(buttonPresses & (1 << 0)),
		isDPadRightPressed: Boolean(buttonPresses & (1 << 1)),
		isDPadUpPressed: Boolean(buttonPresses & (1 << 3)),
		isDPadDownPressed: Boolean(buttonPresses & (1 << 2)),
		isLPressed: Boolean(buttonPresses & (1 << 6)),
		isRPressed: Boolean(buttonPresses & (1 << 5)),
		isStartPressed: Boolean(buttonPresses & (1 << 12)),
		isXPressed: Boolean(buttonPresses & (1 << 10)),
		isYPressed: Boolean(buttonPresses & (1 << 11)),
		isZPressed: Boolean(buttonPresses & (1 << 4)),
	};
};

export const getButtonPressesGame = (buttonPresses: number | undefined): ControllerButtons | undefined => {
	if (!buttonPresses) return;
	return {
		isAPressed: Boolean(buttonPresses & (1 << 8) && !(buttonPresses & (1 << 4))),
		isBPressed: Boolean(buttonPresses & (1 << 9)),
		isDPadLeftPressed: Boolean(buttonPresses & (1 << 0)),
		isDPadRightPressed: Boolean(buttonPresses & (1 << 1)),
		isDPadUpPressed: Boolean(buttonPresses & (1 << 3)),
		isDPadDownPressed: Boolean(buttonPresses & (1 << 2)),
		isLPressed: Boolean(buttonPresses & (1 << 6)),
		isRPressed: Boolean(buttonPresses & (1 << 5)),
		isStartPressed: Boolean(buttonPresses & (1 << 12)),
		isXPressed: Boolean(buttonPresses & (1 << 10)),
		isYPressed: Boolean(buttonPresses & (1 << 11)),
		isZPressed: Boolean(buttonPresses & (1 << 4)),
	};
};