import fs from "fs";

class FileManager {
    saveFile(filePath, text) {
        return new Promise(resolve => {
            fs.writeFileSync(filePath, text);
            resolve();
        })
    }
}

export default function createFileManager() {
    return new FileManager()
}