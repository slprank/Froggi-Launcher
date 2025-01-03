import path from "path";
import fs from "fs"
import { ShareCustomFile, ShareCustomFiles } from "../../frontend/src/lib/models/types/overlay";

const listAllFiles = (dirPath: string): string[] => {
    const results: string[] = []
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            results.push(...listAllFiles(entryPath));
        } else {
            results.push(entry.name);
        }
    }

    return results;
}

function fileToBase64(filePath: string): string {
    const data = fs.readFileSync(filePath);
    return data.toString('base64');
}


function base64ToFile(base64String: string, filePath: string) {
    const fileBuffer = Buffer.from(base64String, 'base64');
    const dir = path.dirname(filePath);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, fileBuffer);
}

export const getCustomFiles = (customFileDir: string): ShareCustomFiles => {
    if (!fs.existsSync(customFileDir)) return {}
    const dirents = fs.readdirSync(customFileDir, { withFileTypes: true });
    const entries = dirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    const shareCustomFiles = entries.reduce((acc: ShareCustomFiles, entry) => {
        const subDir = `${customFileDir}/${entry}`
        const files = listAllFiles(subDir)
        acc[entry] = []
        files.forEach(file => {
            const shareFile: ShareCustomFile = {
                fileName: file,
                base64: fileToBase64(path.join(customFileDir, entry, file))
            }
            acc[entry].push(shareFile)
        })
        return acc
    }, {})
    return shareCustomFiles;
}

export const saveCustomFiles = (customFileDir: string, customFiles: ShareCustomFiles) => {
    Object.entries(customFiles).forEach((customFile) => {
        const [dir, files] = customFile;
        files.forEach(file => {
            const absoluteDir = path.join(customFileDir, dir, file.fileName)
            base64ToFile(file.base64, absoluteDir)
        })
    })
}

export function findFilesStartingWith(dir: string, prefix: string) {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Recurse into subdirectories
            results = results.concat(findFilesStartingWith(fullPath, prefix));
        } else {
            // Check if file name starts with the given prefix
            if (entry.name.startsWith(prefix)) {
                results.push(fullPath);
            }
        }
    }

    return results;
}