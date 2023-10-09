import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { readMemoryWithDataSize, DataTypeSize } from "node_memory_reader";
import os from 'os';

@singleton()
export class MemoryRead {
	private memoryReadInterval: NodeJS.Timeout
	private isWindows = os.platform() === 'win32';
	private isMac = os.platform() === 'darwin';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('EventEmitter') private eventEmitter: EventEmitter,
	) { }

	async runMemoryRead() {
		if (this.isMac) return;
		this.log.info('Initializing Memory Read');
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

	stopMemoryRead() {
		this.log.info("Stopping memory read")
		clearInterval(this.memoryReadInterval)
	}

	private async getPid(): Promise<number> {
		this.log.info("Looking for PID")
		const exec = require('child_process').exec;
		const command = this.isWindows
			? `(Get-Process | Where-Object { $_.ProcessName.ToLower() -like "*dolphin*".ToLower() }).Id`
			: `pgrep -o Dolphin`
		const shell = this.isWindows ? 'powershell.exe' : "/bin/bash"

		let pidInterval: NodeJS.Timeout;
		const pid = await new Promise<number>(resolve => pidInterval = setInterval(() => {
			return exec(command, { 'shell': shell }, (err: Error, stdout: string, stderr: Error) => {
				if (err) this.log.error(err)
				if (stderr) this.log.error(stderr);
				if (stdout) {
					clearInterval(pidInterval)
					resolve(Number(stdout))
				}
			})
		}, 1000))
		this.log.info("Found PID:", pid)
		return pid
	}
}
