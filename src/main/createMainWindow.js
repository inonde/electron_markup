import { BrowserWindow } from "electron";

class MainWindow {
    constructor() {
        this.window = new BrowserWindow({ width: 800, height: 600 });
        this.window.loadURL(`file://${__dirname}/../../index.html`)
        this.window.on("close", () => {
            this.window = null;
        })
    }
}
export default function createMainWindow() {
    return new MainWindow();
}
