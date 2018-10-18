import fs from "fs";
import { shell } from "electron";

class FileManager {
    constructor() {
        this.filePath = "";
    }

    saveFile(filePath, text) {
        return new Promise(resolve => {
            fs.writeFileSync(filePath, text);
            this.filePath = filePath;
            resolve();
        })
    }

    loadFile(filePath) {
        return new Promise(resolve => {
            const text = fs.readFileSync(filePath, "utf8");
            this.filePath = filePath;
            resolve(text);
        })
    }

    overwriteFile(text) {
        this.saveFile(this.filePath, text);
    }

    writePDF(filePath, pdf) {
        return new Promise(resolve => {
            fs.writeFileSync(filePath, pdf);
            resolve();
        })
    }

    openPDFFile(filePath) {
        return new Promise(resolve => {
            shell.openItem(filePath);
            resolve();
        })
    }
}

export default function createFileManager() {
    return new FileManager()
}