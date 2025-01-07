import os from 'os';
import child_process, { ExecException } from 'child_process';
import getAppDataPath from 'appdata-path';
import path from 'path';
import fs from 'fs';
import { ObsWebsocketConfig } from '../../frontend/src/lib/models/types/obsTypes';
import ini from 'ini';


export const isObsRunning = async () => {
	const isWindows = os.platform() === 'win32';
	const validProcesses = ['obs64.exe', 'obs'];
	const exec = child_process.exec;
	const command = isWindows
	  ? `tasklist`
	  : `ps -e -o comm=`;
	const shell = isWindows ? 'powershell.exe' : '/bin/bash';
  
	return await new Promise((resolve) => {
	  exec(command, { shell: shell }, (_: ExecException | null, stdout: string) => {
		if (stdout) {
		  stdout = stdout.toLowerCase();
		  for (const process of validProcesses) {
			if (stdout.includes(process.toLowerCase())) {
			  return resolve(true);
			}
		  }
		}
		resolve(false);
	  });
	});
  };

  export const isObsWEbsocketEnabled = () => {
	const isWindows = os.platform() === 'win32';
	const isMac = os.platform() === 'darwin';
	const isLinux = os.platform() === 'linux';
	const appDataPath = getAppDataPath('obs-studio');
	if (isWindows) {
		const configPath = path.join(appDataPath, 'plugin_config', 'obs-websocket', 'obs-websocket.json');
		if (!fs.existsSync(configPath)) return;
		const config = JSON.parse(fs.readFileSync(configPath, 'utf8')) as ObsWebsocketConfig;
		return config.server_enabled;
	}

	if (isMac || isLinux) { 
		const configPath = path.join(appDataPath, 'obs-studio', 'global.ini');
		if (!fs.existsSync(configPath)) return;
		const iniContent = fs.readFileSync(configPath, 'utf8');
		const config = ini.parse(iniContent);
	
		if (config.OBSWebSocket && config.OBSWebSocket.ServerEnabled) {
		  return config.OBSWebSocket.ServerEnabled === 'true';
		}
	
		return false;
	}

	return false 
  }
