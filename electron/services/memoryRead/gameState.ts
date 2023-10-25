import DolphinMemory from 'dolphin-memory-reader';
import { ByteSize } from 'dolphin-memory-reader/dist/types/enum';

export const getPause = (memory: DolphinMemory): boolean => {
    const pauseHex = memory.read(0x80479D68, ByteSize.U32)
    const isPaused = Boolean(pauseHex & (1 << 28))
    return isPaused
}