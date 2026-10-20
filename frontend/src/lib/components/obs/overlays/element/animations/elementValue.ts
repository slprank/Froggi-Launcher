import { elementValues } from '$lib/utils/store.svelte';

/**
 * What an element shows, as one string: its own `data-trigger-value` when it sets one (e.g. the Video
 * element: the reel, not every clip), else its text + image / video sources + inline background images.
 */
export function elementSnapshot(node: Element): string {
	const own = node.querySelector('[data-trigger-value]');
	if (own) return own.getAttribute('data-trigger-value') ?? '';
	const srcs = Array.from(node.querySelectorAll('img, video, source, image')).map((e) => e.getAttribute('src') ?? e.getAttribute('href') ?? '');
	const backgrounds = Array.from(node.querySelectorAll<HTMLElement>('[style*="background-image"]')).map((e) => e.style.backgroundImage);
	return [node.textContent?.trim() ?? '', ...srcs, ...backgrounds].join('|');
}

/**
 * Publishes the element's shown value under its item id while mounted. An animation replay mounts a new
 * copy before the old one has faded out — the newest copy owns the id, so the fading copy never counts.
 */
export function elementValue(node: HTMLElement, id: string) {
	const owner = {};
	let frame = 0;
	const publish = () => {
		frame = 0;
		if (owners.get(id) !== owner) return;
		const value = elementSnapshot(node);
		elementValues.update((v) => (v[id] === value ? v : { ...v, [id]: value }));
	};
	const schedule = () => (frame ||= requestAnimationFrame(publish));
	owners.set(id, owner);
	const observer = new MutationObserver(schedule);
	observer.observe(node, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['src', 'href', 'style', 'data-trigger-value'] });
	schedule();
	return {
		destroy() {
			observer.disconnect();
			if (frame) cancelAnimationFrame(frame);
			if (owners.get(id) !== owner) return;
			owners.delete(id);
			elementValues.update(({ [id]: _gone, ...rest }) => rest);
		},
	};
}

const owners = new Map<string, object>();
