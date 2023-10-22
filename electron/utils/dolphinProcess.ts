import os from 'os';
import find from "find-process"

export const getProcessPid = async (): Promise<number | undefined> => {
    const validProcesses = getValidProcesses();

    for (const processName of validProcesses) {
        const processes = await find("name", processName);

        if (processes.length > 0) {
            return processes[0].pid;
        }
    }

    return undefined;
};

export const isDolphinRunning = async (): Promise<boolean> => {
    const validProcesses = getValidProcesses();

    for (const processName of validProcesses) {
        const processes = await find("name", processName);
        if (processes.length > 0) {
            return true;
        }
    }

    return false;
}

const getValidProcesses = (): string[] => {
    let validProcess: string[] = [];
    if (os.platform() === 'win32') validProcess = [
        "Dolphin.exe",
        "Slippi Dolphin.exe",
        "Citrus Dolphin.exe",
        "DolphinWx.exe",
        "DolphinQt2.exe",
    ]
    if (os.platform() === "linux") validProcess = [
        "AppRun",
        "AppRun.wrapped",
        "dolphin-emu",
        "dolphin-emu-qt2",
        "dolphin-emu-wx",
        "launch-fm",
        "slippi-r18-netplay",
        "slippi-r16-netplay",
        "slippi-r11-netplay",
        "slippi-r10-netplay"]
    if (os.platform() === "darwin") validProcess = [
        "Slippi Dolphin.app",
        "Slippi Dolphin"
    ]
    return validProcess
}