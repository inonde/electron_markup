import { dialog } from "electron";

export default function showSaveDialog() {
    return new Promise((resolve, reject) => {
        const file = dialog.showSaveDialog(
            {
                title: "save",
                filters: [ { name: "markdown file", extensions: ["md"] }]
            }
        );

        if (file) {
            resolve(file);
        } else {
            reject();
        }
    })
}