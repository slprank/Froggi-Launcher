import type { Tutorial } from './types';

/**
 * The app shows this tutorial as its own interactive page (routes/obs/tutorial/minigames-online:
 * live ngrok / Tailscale status and buttons). These pages are the text version for the AI.
 */
export const minigamesOnlineTutorial: Tutorial = {
	id: 'minigames-online',
	title: 'Play minigames online',
	description: 'Play Bingo or Iron Man with a friend anywhere — only the host needs ngrok.',
	icon: 'Swords',
	path: '/obs/tutorial/minigames-online',
	pages: [
		{
			title: 'Only the host sets this up',
			blocks: [
				{ type: 'text', text: 'Your friend (the guest) installs nothing extra: you share a short **connect code** and they paste it into Froggi. **ngrok** makes a secure, temporary tunnel so your friend can reach your Froggi from another network. The address changes every session, which keeps it private.' },
			],
		},
		{
			title: 'Install ngrok and add your auth token',
			blocks: [
				{ type: 'list', ordered: true, items: ['**Install ngrok** from the tutorial page (or Settings → Remote Access) — Froggi detects it.', 'Create a free ngrok account, copy your **authtoken** from the ngrok dashboard, and paste it in Froggi (tutorial page or Settings → Remote Access). Never paste it in a chat.', '**Start the tunnel** — Froggi turns the address into a share code for you.'] },
			],
		},
		{
			title: 'Share the code',
			blocks: [
				{ type: 'list', ordered: true, items: ['Open **Minigames** in Froggi.', 'Pick **Bingo** or **Iron Man** and choose **Host**.', 'Copy the **share code** and send it to your friend (Discord, chat).', 'Your friend opens Froggi, picks the same game, chooses **Join** and pastes the code.'] },
				{ type: 'note', text: 'The code changes whenever ngrok restarts — share a fresh one each session. The game shows on stream through the /obs/game-preview overlay (OBS browser source, 800×1100).' },
			],
		},
	],
};
