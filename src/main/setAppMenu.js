import { app, Menu, BrowserWindow } from "electron";

function setAppMenu(options) {
    const template = [
        {
            label: "File",
            submenu: [
                { label: "Open", accelerator: "CmdOrCtrl+O", click: () => options.openFile() },
                { label: "Save", accelerator: "CmdOrCtrl+S", click: () => options.saveFile() },
                { label: "Save As...", accelerator: "CmdOrCtrl+O", click: () => options.saveAsNewFile() },
                { label: "Export PDF", accelerator: "CmdOrCtrl+O", click: () => options.exportPDF() },
            ]
        },
        {
            label: "Edit",
            submenu: [
                { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" }
            ]
        },
        {
            label: "View",
            submenu: [
                { label: "Toggle DevTools", accelerator: process.platform === "darwin" ? "Alt+Command+I":"Ctrl+Shift+I", click: () => BrowserWindow.focusedWindow.toggleDevTools() }
            ]
        }
    ];
    
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

export default setAppMenu;
    