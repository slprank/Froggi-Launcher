import type { Tutorial } from './types';

export const webhooksTutorial: Tutorial = {
	id: 'webhook',
	title: 'Webhooks',
	description: 'Send real-time game events to any HTTP endpoint.',
	icon: 'Webhook',
	path: '/obs/tutorial/webhook',
	pages: [
		{
			title: 'What webhooks do',
			blocks: [
				{ type: 'text', text: 'Every time something happens — a game starts or ends, the score changes, a stage is struck, a stock is lost — Froggi sends a **POST** with a JSON body to your URL: your own server, a cloud function, a Discord bot, a smart home or a stream deck.' },
				{ type: 'note', text: 'Want conditions, or OBS actions? That\'s [Flows](/obs/tutorial/flows). Webhooks send every event you subscribe to.' },
			],
		},
		{
			title: 'Create a profile',
			blocks: [
				{ type: 'text', text: 'Go to **Stream** → **Automation** → **Webhooks**. The switch at the top turns all webhooks on or off. Click **New Profile** — each profile is one destination:' },
				{ type: 'list', items: ['**Name** — e.g. "My stream bot"', '**URL** — the endpoint that receives the POSTs, e.g. `https://myserver.com/froggi`', '**Auth** — none, a bearer token, or OAuth2 (next page)', '**Events** — only ticked events are sent to this URL'] },
				{ type: 'text', text: 'Save it. Profiles can be switched off without deleting them.' },
			],
		},
		{
			title: 'Authentication',
			blocks: [
				{ type: 'list', items: ['**None** — no Authorization header (fine for webhook.site or a smart home URL that is secret itself).', '**Bearer token** — a fixed secret sent as `Authorization: Bearer <token>` on every request.', '**OAuth2 · client credentials** — Froggi gets a short-lived token from your login URL (client id + secret) and renews it before it expires. For Keycloak, Auth0 and similar.'] },
			],
		},
		{
			title: 'What Froggi sends',
			blocks: [
				{ type: 'text', text: 'Every body has the same wrapper: `{"eventName": "GameStart", "timestamp": "…", "payload": {…}}`. The payload depends on the event:' },
				{ type: 'list', items: ['**GameStart** / **GameEnd** — stage, mode, players, score', '**GameScore** — the set score `[p1, p2]`', '**StrikeState** — the full stage striking state on every change', '**PercentChange** / **StockChange** — before, after and difference per player', '**PlayerInfo** / **RankChange** — players and ranked rating changes', '**BingoUpdate**, **BingoBoardState**, **IronManUpdate** — minigame progress'] },
				{ type: 'note', text: 'The exact example of every event is under **Event Schemas** on the Webhooks page.' },
			],
		},
		{
			title: 'Test it',
			blocks: [
				{ type: 'text', text: 'Each profile has a **Test** button: it sends one example request per subscribed event — the same shape as the real thing, no game needed.' },
				{ type: 'list', items: ['**webhook.site** — open it, paste its URL into a profile, press Test and watch requests arrive.', 'Your server must answer with a 2xx status. Failed requests are logged in Froggi but not retried.'] },
			],
		},
	],
};
