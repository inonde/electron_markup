import React from "react";
import { ipcRenderer } from "electron";
import Editor from "./Editor"
import style from "./MarkdownEditorUI.css"
import Previewer from "./Previewer";

export default class MarkdownEditorUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on("REQUEST_TEXT", () => {
            ipcRenderer.send("RESPONSE_TEXT", this.state.text);
        })

        ipcRenderer.on("SEND_TEXT", (_e, text) => {
            this.setState({ text });
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    onChangeText(e) {
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <div className={style.markdownEditor}>
                <Editor className={style.editorArea} value={this.state.text} onChange={this.onChangeText}/>
                <Previewer className={style.previewerArea} value={this.state.text}/>
            </div>
        )
    }
}
