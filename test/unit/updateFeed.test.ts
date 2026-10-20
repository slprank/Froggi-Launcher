import { releaseToOffer, type Release } from '../../electron/update/updateFeed';

const rel = (tag: string, files: string[], prerelease = true, draft = false): Release => ({ tag_name: tag, draft, prerelease, assets: files.map((name) => ({ name })) });

describe('update feed fallback', () => {
	const releases = [
		rel('v2.0.0-beta.92', [], true, true), // draft — ignored
		rel('v2.0.0-beta.91', ['latest-linux.yml']), // still building for mac/windows
		rel('v2.0.0-beta.90', ['latest-linux.yml', 'latest-mac.yml', 'latest.yml']),
		rel('v1.0.17', ['latest-linux.yml', 'latest-mac.yml', 'latest.yml'], false),
	];

	it('offers the newest release that has this OS build while the newest is still building', () => {
		expect(releaseToOffer(releases, 'latest-mac.yml', true)).toBe('v2.0.0-beta.90');
		expect(releaseToOffer(releases, 'latest.yml', true)).toBe('v2.0.0-beta.90');
	});

	it('keeps the normal feed when the newest release already has the build', () => {
		expect(releaseToOffer(releases, 'latest-linux.yml', true)).toBeNull();
	});

	it('stable users only look at stable releases', () => {
		expect(releaseToOffer(releases, 'latest-mac.yml', false)).toBeNull();
		expect(releaseToOffer([rel('v1.1.0', ['latest-linux.yml'], false), ...releases], 'latest-mac.yml', false)).toBe('v1.0.17');
	});
});
