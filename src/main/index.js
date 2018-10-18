import { app } from "electron";
import createMainWindow from "./createMainWindow"
import setAppMenu from "./setAppMenu"
import createFileManager from "./createFileManager"
import showSaveDialog from "./showSaveDialog";
import showOpenDialog from "./showOpenDialog";
import createPDFWindow from "./createPDFWindow";
import showExportPDFDialog from "./showExportPDFDialog";

let mainWindow = null;
let fileManager = null;


function openFile() {
    showOpenDialog()
        .then((filePath) => fileManager.loadFile(filePath))
        .then((text) => mainWindow.sendText(text))
        .catch(error => {
            console.log(error);
        });
} 

function saveFile() {
    if (!fileManager.filePath) {
        saveAsNewFile();
    } else {
        mainWindow.requestText()
            .then(text => fileManager.overwriteFile(text))
            .catch(error => {
                console.log(error);
            });
    }
}

function saveAsNewFile() {
    Promise.all([ showSaveDialog(), mainWindow.requestText()])
        .then(([filePath, text]) => fileManager.saveFile(filePath, text))
        .catch((error) => {
            console.log(error);
        })
}

function exportPDF() {
    Promise.all([ showExportPDFDialog(), mainWindow.requestText() ])
        .then(([filePath, text]) => {
            const pdfWindow = createPDFWindow(text);
            pdfWindow.on("RENDERED_CONTENTS", () => {
                pdfWindow.generatePDF()
                    .then((pdf) => fileManager.writePDF(filePath, pdf))
                    .then(() => pdfWindow.close)
                    .catch(error => {
                        console.log(error);
                    })
            })
        })
        .catch(error => {
            console.log(error);
        })
    
}

app.on("ready", () => {
    mainWindow = createMainWindow();
    fileManager = createFileManager();
    setAppMenu({openFile, saveFile, saveAsNewFile, exportPDF});
})


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})

app.on("activate", (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        mainWindow = createMainWindow();
    }
})

