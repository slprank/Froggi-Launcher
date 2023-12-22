import { NotificationType } from "../models/enum";
import { MessageEvents, TypedEmitter } from "./customEventEmitter";
import { Worker } from 'worker_threads';

const unauthorized: (keyof MessageEvents)[] = ["InitData", "InitElectron", "InitAuthentication", "Ping", "AuthorizationKey"];

export let sendAuthenticatedMessage = <K extends keyof MessageEvents>(socketId: string, incomingKey: string = "", authorizationKey: string = "", emitter: TypedEmitter, webSocketWorker: Worker, topic: K, ...value: Parameters<MessageEvents[K]>) => {
    const isAuthorized = incomingKey === authorizationKey;
    console.log("Here", topic, value)
    if (isAuthorized) {
        emitter.emit(topic, ...value as any);
    } else if (unauthorized.includes(topic)) {
        emitter.emit(topic, ...value as any);
    } else {
        sendSocketMessage(webSocketWorker, socketId, "Notification", "You are not authorized to perform this action.", NotificationType.Danger);
    }
}

const sendSocketMessage = <J extends keyof MessageEvents>(worker: Worker, socketId: string, topic: J, ...payload: Parameters<MessageEvents[J]>) => {
    worker?.postMessage(
        JSON.stringify({
            [topic]: payload,
            socketId: socketId,
        }),
    );
}