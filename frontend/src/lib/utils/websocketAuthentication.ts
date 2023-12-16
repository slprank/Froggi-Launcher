import { NotificationType } from "../models/enum";
import { MessageEvents, TypedEmitter } from "./customEventEmitter";

const unauthorized: (keyof MessageEvents)[] = ["InitData", "InitElectron"];

export let sendAuthenticatedMessage = (incomingKey: string = "", authorizationKey: string = "", emitter: TypedEmitter, topic: keyof MessageEvents, ...value: any[]) => {
    const isAuthorized = incomingKey === authorizationKey;
    if (isAuthorized) {
        emitter.emit(topic, ...value as any);
    } else if (unauthorized.includes(topic)) {
        emitter.emit(topic, ...value as any);
    } else {
        emitter.emit("Notification", "You are not authorized to perform this action.", NotificationType.Danger);
    }
}