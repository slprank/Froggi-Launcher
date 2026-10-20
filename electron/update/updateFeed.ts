import { autoUpdater } from 'electron-updater';
import type { ElectronLog } from 'electron-log';

const OWNER = 'SindreVatnaland';
const REPO = 'Froggi';

/** Download page for a version (tag = "v" + version). */
export const releaseDownloadUrl = (version: string, file: string) => `https://github.com/${OWNER}/${REPO}/releases/download/v${version}/${file}`;

/** The update file electron-updater reads for this OS. */
const channelFile = () => (process.platform === 'darwin' ? 'latest-mac.yml' : process.platform === 'linux' ? 'latest-linux.yml' : 'latest.yml');

export interface Release {
	tag_name: string;
	draft: boolean;
	prerelease: boolean;
	assets: { name: string }[];
}

/** Tag of the release to offer instead of the newest, or null when the newest already has this OS's
 *  build (or nothing has it). Releases come newest first, as the GitHub API returns them. */
export function releaseToOffer(releases: Release[], file: string, allowPrerelease: boolean): string | null {
	const usable = releases.filter((r) => !r.draft && (allowPrerelease || !r.prerelease));
	const hasBuild = (r: Release) => r.assets.some((a) => a.name === file);
	if (!usable.length || hasBuild(usable[0])) return null;
	return usable.find(hasBuild)?.tag_name ?? null;
}

/**
 * Point the updater at the newest release that already has this OS's build. CI publishes a release
 * as soon as the first OS finishes (usually Linux); until the others upload, the newest release has
 * no update file for them and electron-updater fails with a 404. Then we pin the feed to the newest
 * release that does have it, so users still get the previous build. Any problem (offline, rate limit)
 * leaves the normal GitHub feed in place.
 */
export async function configureUpdateFeed(allowPrerelease: boolean, log: ElectronLog): Promise<void> {
	const github = () => autoUpdater.setFeedURL({ provider: 'github', owner: OWNER, repo: REPO });
	try {
		const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases?per_page=100`, {
			headers: { Accept: 'application/vnd.github+json' },
			signal: AbortSignal.timeout(5000),
		});
		if (!res.ok) return github();
		const releases = (await res.json()) as Release[];
		const file = channelFile();
		const built = releaseToOffer(releases, file, allowPrerelease);
		if (!built) return github();
		log.info(`The newest release has no ${file} yet — offering ${built} meanwhile`);
		autoUpdater.setFeedURL({ provider: 'generic', url: `https://github.com/${OWNER}/${REPO}/releases/download/${built}` });
	} catch (err) {
		log.warn('Could not read the release list, using the default update feed:', err);
		github();
	}
}
