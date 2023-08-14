import getAppDataPath from "appdata-path";
import * as fs from "fs-extra";
import os from "os";
import path from "path";
import { PlayKey } from "../../frontend/src/lib/models/types";


export async function findPlayKey(): Promise<PlayKey> {
  let slippiDir = "";
  switch (process.platform) {
    case "win32": {
      slippiDir = path.join(getAppDataPath('Slippi Launcher'), "netplay", "User", "Slippi");
      break;
    }
    case "darwin": {
      slippiDir = path.join(os.homedir(), "Library", "Application Support", "com.project-slippi.dolphin", "Slippi");
      break;
    }
    case "linux": {
      slippiDir = path.join(os.homedir(), ".config", "SlippiOnline", "Slippi");
      break;
    }
    default: {
      break;
    }
  }
  const rawData = fs.readFileSync(slippiDir, 'utf-8');
  return JSON.parse(rawData) as PlayKey;
}