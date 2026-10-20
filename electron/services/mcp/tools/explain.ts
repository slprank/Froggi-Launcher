import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ALL_TOPICS, getTopic, renderAsMarkdown } from '../../../../frontend/src/lib/content';
import { TUTORIALS, getTutorial, tutorialAsMarkdown } from '../../../../frontend/src/lib/content/tutorials';

const text = (value: unknown) => ({ content: [{ type: 'text' as const, text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] });
const error = (message: string) => ({ content: [{ type: 'text' as const, text: message }], isError: true });

export function registerExplainTools(server: McpServer) {
	server.registerTool(
		'list_explainer_topics',
		{ description: 'List available Froggi topics you can explain to the user (OBS setup, overlay building, remote access, minigames, automation, game-event webhooks + smart-home integration, and the WebSocket game-state stream).', inputSchema: {} },
		async () => text(ALL_TOPICS.map((t) => ({ id: t.id, title: t.title, category: t.category, summary: t.summary }))),
	);

	server.registerTool(
		'explain_topic',
		{ description: 'Get the full explanation for one topic id (see list_explainer_topics).', inputSchema: { topicId: z.string() } },
		async ({ topicId }) => {
			const topic = getTopic(topicId);
			if (!topic) return error(`Unknown topic "${topicId}" — call list_explainer_topics first.`);
			return text(renderAsMarkdown(topic));
		},
	);

	server.registerTool(
		'list_tutorials',
		{ description: 'List Froggi\'s step-by-step tutorials — the same ones the user sees under Stream → Tutorial (build an overlay, OBS, remote control, running a tournament, minigames online, flows, the AI assistant, webhooks). Use them to guide the user step by step with the same wording and screenshots they see in the app.', inputSchema: {} },
		async () => text(TUTORIALS.map((t) => ({ id: t.id, title: t.title, description: t.description, path: t.path, pages: t.pages.map((p) => p.title) }))),
	);

	server.registerTool(
		'get_tutorial',
		{ description: 'Get one tutorial in full (markdown, page by page, screenshots described by caption and path). Point the user to the tutorial page in the app (path) when they want to follow along.', inputSchema: { tutorialId: z.string() } },
		async ({ tutorialId }) => {
			const tutorial = getTutorial(tutorialId);
			if (!tutorial) return error(`Unknown tutorial "${tutorialId}" — call list_tutorials first.`);
			return text(tutorialAsMarkdown(tutorial));
		},
	);
}
