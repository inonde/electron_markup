import { BrowserWindow, ipcMain, shell } from "electron";

class MainWindow {
    constructor() {
        this.window = new BrowserWindow({ width: 800, height: 600 });
        this.window.loadURL(`file://${__dirname}/../../index.html`)
        this.window.on("close", () => {
            this.window = null;
        })
        this.window.webContents.on("will-navigate", (e, url) => {
            e.preventDefault();
            shell.openExternal(url);
        })
    }

    requestText() {
        return new Promise(resolve => {
            this.window.webContents.send("REQUEST_TEXT");
            ipcMain.once("RESPONSE_TEXT", (_e, text) => resolve(text));
        })
    }

    sendText(text) {
        return new Promise(resolve => {
            this.window.webContents.send("SEND_TEXT", text);
            resolve();
        })
        
    }
}
export default function createMainWindow() {
    return new MainWindow();
}
