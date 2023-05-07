export class Achievements {
	messageHandler: any;
	eventEmitter: any;
	log: any;

	constructor(messageHandler: any, eventEmitter: any, log: any) {
		this.messageHandler = messageHandler;
		this.eventEmitter = eventEmitter;
		this.log = log;

		this.initAchievements();
	}
	initAchievements() {
		this.log.info('Init Stat Display');
	}

	updateAchievements = () => {
		this.log.info('Updating achievements');
	};
}
