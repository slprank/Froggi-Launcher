import fs from 'fs';

/**
 * Length in seconds of an MP4 / MOV file, from its `moov/mvhd` box — only box headers and the moov box
 * are read (OBS writes moov at the end of a 360 MB buffer file; reading it is ~50 KB).
 * Returns null when there is no readable length (WebM, fragmented MP4 still being written).
 * ponytail: mvhd only; fragmented MP4 (mehd / summing fragments) if anyone needs that format.
 */
export function videoDuration(file: string): number | null {
	const fd = fs.openSync(file, 'r');
	try {
		const size = fs.fstatSync(fd).size;
		const head = Buffer.alloc(16);
		let off = 0;
		while (off + 8 <= size) {
			fs.readSync(fd, head, 0, 16, off);
			let box = head.readUInt32BE(0);
			const type = head.toString('latin1', 4, 8);
			let header = 8;
			if (box === 1) {
				box = Number(head.readBigUInt64BE(8));
				header = 16;
			} else if (box === 0) box = size - off;
			if (box < header) return null;
			if (type === 'moov') {
				const moov = Buffer.alloc(Math.min(box - header, 8 * 1024 * 1024));
				fs.readSync(fd, moov, 0, moov.length, off + header);
				return mvhdSeconds(moov);
			}
			off += box;
		}
		return null;
	} finally {
		fs.closeSync(fd);
	}
}

/** Seconds from the mvhd box inside a moov payload. */
function mvhdSeconds(moov: Buffer): number | null {
	let off = 0;
	while (off + 8 <= moov.length) {
		const box = moov.readUInt32BE(off);
		if (moov.toString('latin1', off + 4, off + 8) === 'mvhd') {
			const v = moov[off + 8];
			const [scale, duration] = v === 1 ? [moov.readUInt32BE(off + 28), Number(moov.readBigUInt64BE(off + 32))] : [moov.readUInt32BE(off + 20), moov.readUInt32BE(off + 24)];
			return scale && duration ? duration / scale : null;
		}
		if (box < 8) return null;
		off += box;
	}
	return null;
}
