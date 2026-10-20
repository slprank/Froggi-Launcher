/**
 * Tutorials are data: the app renders them as step pages (components/tutorial/TutorialBlocks.svelte)
 * and the AI assistant reads the same content (MCP list_tutorials / get_tutorial). Text supports
 * **bold**, *italic* and `code`.
 */
export type TutorialBlock =
	| { type: 'heading'; text: string }
	| { type: 'text'; text: string }
	| { type: 'list'; items: string[]; ordered?: boolean }
	/** A screenshot / picture — the caption is shown under it and is what the AI reads. */
	| { type: 'image'; src: string; caption: string }
	| { type: 'video'; src: string; caption: string }
	| { type: 'note'; text: string }
	/** The "Copy AI instructions" button (the AI gets the instructions text). */
	| { type: 'copyInstructions' };

export interface TutorialPage {
	title: string;
	blocks: TutorialBlock[];
}

export interface Tutorial {
	id: string;
	title: string;
	description: string;
	/** lucide-svelte icon name for the tutorial list. */
	icon: 'Paintbrush' | 'Plug' | 'Gamepad2' | 'Trophy' | 'Swords' | 'Webhook' | 'Workflow' | 'Bot';
	/** App route of the tutorial. */
	path: string;
	pages: TutorialPage[];
}
