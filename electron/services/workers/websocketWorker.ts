import WebSocket, { WebSocketServer } from 'ws';
import { WEBSOCKET_PORT } from '../../../frontend/src/lib/models/const';
import type { MessageEvents } from '../../../frontend/src/lib/utils/customEventEmitter';
import { parentPort } from 'worker_threads';
import { newId } from '../../utils/functions';
import { isNil } from 'lodash';

const webSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT });
const connections: Connection[] = [];

interface Connection {
    socket: WebSocket,
    id: string,
}

webSocketServer.on('connection', (socket: WebSocket) => {
    console.log('New WebSocket Connection');
    const connection: Connection = { socket: socket, id: newId() }
    connections.push(connection);
    initSocket(socket);
    initData(connection.id);
    console.log("New WebSocket Connection", connections.length);

});

const initSocket = (socket: WebSocket) => {
    socket.addEventListener("message", (message: WebSocket.MessageEvent) => {
        const parse = JSON.parse(message.data as string);
        parentPort?.postMessage([message.data]);
        initAuthentication(connections?.find(conn => conn.socket === message.target)?.id ?? "", parse["authorizationKey"] ?? "");
    });

    socket.addEventListener('close', () => {
        const connection: Connection | undefined = connections.find(conn => conn.socket === socket);
        if (!connection) return;
        const index = connections.indexOf(connection)
        if (index > -1) {
            connections.splice(index, 1);
            console.log('Connection removed');
        }
        console.log('WebSocket closed:', connections.length);
    });
}

parentPort?.on("message", <J extends keyof MessageEvents>(message: string) => {
    const parse = JSON.parse(message);
    for (const [topic, payload] of Object.entries(parse) as [topic: J, payload: Parameters<MessageEvents[J]>]) {
        if (isNil(parse["socketId"])) {
            connections.forEach((conn: any) => {
                conn.socket.send(
                    JSON.stringify({
                        [`${topic}`]: payload,
                    }),
                );
            });
        } else {
            connections.find(conn => conn.id === parse["socketId"])?.socket.send(JSON.stringify({
                [`${topic}`]: payload,
            }),)
        }
    }
})

const initData = (socketId: string) => {
    parentPort?.postMessage(JSON.stringify({
        ["InitData"]: [socketId],
    }));
}

const initAuthentication = (socketId: string, authKey: string) => {
    parentPort?.postMessage(JSON.stringify({
        ["InitAuthentication"]: [socketId, authKey],
    }));
}