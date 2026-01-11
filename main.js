// ---- Imports ---- //
import { join as Join, basename as BaseName } from "path";
import { createReadStream as CreateReadStream } from "fs";
import { readdir as ReadDirectory } from "fs/promises";
import { Catbox } from "node-catbox";


// ---- Configuration ---- //
const CatboxApp = new Catbox();
const Directory = "./Videos";


// ---- Main ---- //
try {
    const Files = await ReadDirectory(Directory);
    for (const File of Files) {
        const Stream = CreateReadStream(Join(Directory, File));

        try {
            const Response = await CatboxApp.uploadFileStream({
                stream: Stream,
                filename: BaseName(File)
            });

            console.log(`[*] ${File} uploaded -> ${Response}`);
        } catch (Error) {
            console.error(`[*] Failed to upload ${File}:`, Error);
        };
    };
} catch (Error) {
    console.error("[*] Error reading directory:", Error);
};
