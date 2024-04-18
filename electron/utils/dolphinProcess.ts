import os from 'os';
import find from 'find-process';

export const getProcessPid = async (): Promise<number | undefined> => {
	const validProcesses = getValidProcesses();

	for (const processName of validProcesses) {
		const processes = await find('name', processName);

		if (processes.length > 0) {
			return processes[0].pid;
		}
	}

	return undefined;
};

// This solution was so slow on windows that it stacked powershell processes over time if it didnt find dolphin instantly, resulting in a crash.
// export const isDolphinRunning = async (): Promise<boolean> => {
// 	const validProcesses = getValidProcesses();

// 	for (const processName of validProcesses) {
// 		const processes = await find('name', processName);
// 		console.log('processes', processes);
// 		if (processes.length > 0) {
// 			return true;
// 		}
// 	}

// 	return false;
// };

export const isDolphinRunning = async (isWindows: boolean) => {
	const validProcesses = getValidProcesses();
	const exec = require('child_process').exec;
	const command = isWindows
		? `Get-Process | Select-Object -ExpandProperty ProcessName`
		: `ps -e -o comm=`;
	const shell = isWindows ? 'powershell.exe' : '/bin/bash';
	return await new Promise((resolve) => {
		exec(command, { shell: shell }, (_: Error, stdout: string) => {
			if (stdout) {
				console.log(stdout);
				stdout = stdout.toLowerCase();
				for (const process of validProcesses) {
					if (stdout.includes(process.toLowerCase())) {
						return resolve(true);
					}
				}
			}
			return resolve(false);
		});
	});
};

const getValidProcesses = (): string[] => {
	let validProcess: string[] = [];
	if (os.platform() === 'win32')
		validProcess = [
			'Dolphin.exe',
			'Code',
			'Slippi_Dolphin.exe',
			'Slippi Dolphin.exe',
			'Citrus Dolphin.exe',
			'DolphinWx.exe',
			'DolphinQt2.exe',
		];
	if (os.platform() === 'linux')
		validProcess = [
			'AppRun',
			'AppRun.wrapped',
			'dolphin-emu',
			'dolphin-emu-qt2',
			'dolphin-emu-wx',
			'launch-fm',
			'slippi-r18-netplay',
			'slippi-r16-netplay',
			'slippi-r11-netplay',
			'slippi-r10-netplay',
		];
	if (os.platform() === 'darwin')
		validProcess = [
			'Slippi Dolphin.app',
			'Slippi Dolphin',
			'Slippi_Dolphin.app',
			'Slippi_Dolphin',
		];
	return validProcess;
};
