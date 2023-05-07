import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	send: (channel: string, data: any) => {
		ipcRenderer.send(channel, data);
	},
	sendSync: (channel: string, data: any) => {
		ipcRenderer.sendSync(channel, data);
	},
	receive: (channel: string, func: any) => {
		ipcRenderer.on(channel, (_, ...args) => func(...args));
	},
	message: (topic: string, payload: any) => ipcRenderer.invoke('message', topic, payload),
});
