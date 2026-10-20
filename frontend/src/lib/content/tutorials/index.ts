import type { Tutorial, TutorialBlock } from './types';
import { ASSISTANT_INSTRUCTIONS } from '../assistantInstructions';
import { buildOverlayTutorial } from './buildOverlay';
import { integrateObsTutorial } from './integrateObs';
import { remoteObsTutorial } from './remoteObs';
import { tournamentTutorial } from './tournament';
import { minigamesOnlineTutorial } from './minigamesOnline';
import { flowsTutorial } from './flows';
import { aiAssistantTutorial } from './aiAssistant';
import { webhooksTutorial } from './webhooks';

/** Every tutorial, A–Z by title (the Tutorials page and the AI list them in this order). */
export const TUTORIALS: Tutorial[] = [
	buildOverlayTutorial,
	integrateObsTutorial,
	remoteObsTutorial,
	tournamentTutorial,
	minigamesOnlineTutorial,
	flowsTutorial,
	aiAssistantTutorial,
	webhooksTutorial,
].sort((a, b) => a.title.localeCompare(b.title));

export const getTutorial = (id: string) => TUTORIALS.find((t) => t.id === id);

const blockMarkdown = (b: TutorialBlock): string => {
	switch (b.type) {
		case 'heading':
			return `### ${b.text}`;
		case 'text':
			return b.text;
		case 'list':
			return b.items.map((item, i) => (b.ordered ? `${i + 1}. ${item}` : `- ${item}`)).join('\n');
		case 'image':
			return `[Screenshot: ${b.caption} — ${b.src}]`;
		case 'video':
			return `[Video: ${b.caption} — ${b.src}]`;
		case 'note':
			return `> ${b.text}`;
		case 'copyInstructions':
			return `[Button "Copy AI instructions" — copies:]\n${ASSISTANT_INSTRUCTIONS}`;
	}
};

/** The whole tutorial as markdown — what the AI assistant reads (MCP get_tutorial). */
export function tutorialAsMarkdown(t: Tutorial): string {
	const pages = t.pages.map((p, i) => `## ${i + 1}. ${p.title}\n\n${p.blocks.map(blockMarkdown).join('\n\n')}`);
	return `# ${t.title}\n\n${t.description}\nIn the app: ${t.path}\n\n${pages.join('\n\n')}`;
}
