/** A number for display: NaN / Infinity (e.g. 0 of 0 L-cancels) become 0. */
export const finite = (value: unknown): number => {
	const n = Number(value);
	return Number.isFinite(n) ? n : 0;
};
