import { NotificationType } from "../models/enum";
import { MessageEvents, TypedEmitter } from "./customEventEmitter";

const unauthorized: (keyof MessageEvents)[] = ["InitData", "InitElectron", "InitAuthentication", "Ping"];

export let sendAuthenticatedMessage = <K extends keyof MessageEvents>(incomingKey: string = "", authorizationKey: string = "", emitter: TypedEmitter, topic: K, ...value: Parameters<MessageEvents[K]>) => {
    const isAuthorized = incomingKey === authorizationKey;
    if (isAuthorized) {
        emitter.emit(topic, ...value as any);
    } else if (unauthorized.includes(topic)) {
        emitter.emit(topic, ...value as any);
    } else {
        emitter.emit("Notification", "You are not authorized to perform this action.", NotificationType.Danger);
    }
}