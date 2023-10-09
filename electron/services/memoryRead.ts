import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { readMemoryWithDataSize, DataTypeSize } from "node_memory_reader";
import os from 'os';

@singleton()
export class MemoryRead {
	memoryReadInterval: NodeJS.Timeout
	isWindows = os.platform() === 'win32';
	isMac = os.platform() === 'darwin';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('EventEmitter') private eventEmitter: EventEmitter,
	) {
		this.initMemoryRead();
	}

	async initMemoryRead() {
		if (this.isMac) return;
		this.log.info('Initializing Memory Read');
		this.runMemoryRead();
	}

	async runMemoryRead() {
		const pid = await this.getPid()
		if (!pid) return;
		this.memoryReadInterval = setInterval(() => {
			// TODO: Create .ts file with controller inputs and addresses
			try {
				const memory: number[] = readMemoryWithDataSize(
					pid,
					0x804c1fac + 0x44 * 0,
					20,
					DataTypeSize.B32
				);
				console.log('memory', memory);
				this.eventEmitter.emit("memory_read", "hei")
			} catch (err) {
				this.log.error(err);
			}
		}, 8);
	}

	async getPid(): Promise<number> {
		this.log.info("Looking for PID")
		const exec = require('child_process').exec;
		const command = this.isWindows
			? `(Get-Process | Where-Object { $_.ProcessName.ToLower() -like "*dolphin*".ToLower() }).Id`
			: `pgrep -o Dolphin`
		const shell = this.isWindows ? 'powershell.exe' : "/bin/bash"

		let pidInterval: NodeJS.Timeout;
		const pid = await new Promise<number>(resolve => pidInterval = setInterval(() => {
			try {
				return exec(command, { 'shell': shell }, (err: Error, stdout: string, stderr: Error) => {
					console.log("stdout", stdout)
					if (err) this.log.error(err)
					if (stderr) this.log.error(stderr);
					if (stdout) {
						clearInterval(pidInterval)
						resolve(Number(stdout))
					}
				})
			} catch (err) {
				this.log.error(err)
			}
		}, 1000))
		this.log.info("Found PID:", pid)
		return pid
	}
}
