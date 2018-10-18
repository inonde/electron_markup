import { dialog } from "electron";

export default function showOpenDialog() {
    return new Promise((resolve, reject) => {
        const files = dialog.showOpenDialog(
            { title: "open", properties: [ "openFile" ], filters: [{ name: "markdown file", extensions: [ "md" ]}] }
        );

        if (files && files.length > 0) {
            resolve(files[0]);
        } else {
            reject();
        }
    })
}