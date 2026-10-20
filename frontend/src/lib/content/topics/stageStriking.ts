import type { ContentTopic } from '../types';

export const stageStrikingTopics: ContentTopic[] = [
	{
		id: 'stage-striking',
		title: 'Stage striking (tournament sets)',
		category: 'app',
		summary: 'Run a set with the Melee tournament ruleset: the TO starts it on the Tournament Dashboard, each player picks/strikes on their phone, and game winners come in automatically from Slippi.',
		blocks: [
			{
				type: 'list',
				text: 'Flow (Melee ruleset):',
				items: [
					'Only the host (the Froggi app, or a browser with the host password) starts a set: Stream → Tournament Dashboard "Start Set" — names, Bo3/Bo5, and whether players may agree to play a DSR-blocked stage (on by default). Player 1 = the lower controller port.',
					'Players scan their own QR ("P1/P2 phone · stage striking"; QR codes stay hidden until the host clicks them, so links don\'t end up on stream). Players can type their own name on their phone (✎ next to their name); the host can overwrite it by clicking the name on the Dashboard. Each link carries a secret for that player, so a phone can only act as its own player and only on its turn; resetting the set makes new links. The phone keeps the screen on (HTTPS links) and reconnects by itself after being locked.',
					'Game 1: characters double blind on the phones, then rock-paper-scissors (30s, random pick on timeout); the RPS winner chooses to strike first or second; the 5 starters are struck 1-2-1 and the last one is played.',
					'Overlay: the "P1 / P2 RPS Icon" elements show each pick as a hand — hidden until both have picked (a ✓ shows who is ready), then a short shuffle lands on the pick. Upload your own rock / paper / scissors images under Styling → Icons.',
					'Game 2+: the previous winner bans 1 stage (no ban in Bo5), the loser picks — not a stage they already won on (DSR), unless both players agree on their phones — then the winner picks a character, then the loser. While a game is played the phones show a small live view (stocks, percent, timer).',
					'Results: the set\'s games list (Dashboard → Edit Games) is the one source — Slippi games of the set\'s players (never ranked/unranked) come in automatically; the host can add a game by hand (characters, stage, winner, stocks left) or from one of the latest replays, delete/reorder games, and change a game\'s winner with a required note (stored as resultOverride: forfeit, DQ, LRAS by mistake…; winner none = doesn\'t count). Score, overlays and the striking state (score, DSR, next step) all follow that list. On the striking card: Report result… (adds the running game, prefilled), Cancel game (doesn\'t count, replay it), Undo / Restart step / Pause striking (devices can\'t act; the host still can), End match. The old /set page redirects to the Dashboard. A set left idle for 3 hours ends on startup.',
				],
			},
			{
				type: 'list',
				text: 'Scenes:',
				items: [
					'Starting a set shows the Strike Phase scene. After each game the normal Post Game scene shows; the first striking action (a character pick, RPS, a ban or pick) switches back to Strike Phase. A running game is never interrupted.',
					'Overlays without a Strike Phase scene simply keep showing their Menu content.',
				],
			},
			{
				type: 'paragraph',
				text: 'Doubles: pick the Doubles ruleset when starting the set (Dashboard follows the Singles/Doubles format). One phone per team — "Team 1/2 phone" QRs; team names come from the Dashboard. As in the rules, a team picks for both its players: the phone shows each teammate (tag, else "Port N") and Confirm sends both characters — blind in game 1, winning team first in game 2+. Game results count for the team. Doubles stages: starters Battlefield, Dream Land, Final Destination, Pokémon Stadium, Yoshi\'s Story; no counterpicks (Fountain of Dreams is not legal). Start Set (doubles) asks for both team names and each player\'s tag (team names left empty: "Tag & Tag" when both have a tag, else Team 1 / Team 2). Sides the wrong way round? Dashboard → Fix set… → Swap teams (or Player 1 ↔ 2): names, score and overlays follow, and each phone keeps its link but now plays the other side.',
			},
			{
				type: 'paragraph',
				text: 'Stages: starters Fountain of Dreams, Yoshi\'s Story, Dream Land, Battlefield, Final Destination; counterpick Pokémon Stadium. The demo overlay "Stage Striking" shows all six from plain stage-image elements plus coloured layers driven by the per-stage conditions (grey = locked/counterpick in game 1, yellow = struck or banned, red = DSR, green outline = picked), with a caption per phase — copy it and restyle anything.',
			},
		],
	},
];
