import React from "react";
import Previewer from "./Previewer";
import { ipcRenderer } from "electron";

export default class PDFUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
    }

    componentDidMount() {
        const text = ipcRenderer.sendSync("REQUEST_TEXT");
        this.setState({ text });
    }

    componentDidUpdate() {
        this.syncImageRendered()
            .then(() => {
                ipcRenderer.send("RENDERED_CONTENTS");
            })
    }

    syncImageRendered() {
        const images = Array.prototype.slice.call(document.querySelectorAll("img"));
        const loadingImages = images.filter((image) => !image.complete);
        if (loadingImages.length === 0) {
            return Promise.resolve();
        }

        return new Promise.all(loadingImages.map((image) => {
            return new Promise((resolve) => {
                image.onload = () => resolve();
            })
        }));
    }

    render() {
        return (
            <Previewer value={this.state.text}/>
        )
    }
}
