"use client";
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { useEditorAction } from "../../hook/useEditorAction";
import '../../styles/editor.scss';
import Toolbar from "./Toolbar";

export default function Editor() {
    const { isEditable, isUpdated, editorContent, editor } = useEditorAction();

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable);
        }
    }, [isEditable, editor]);

    return (
        <div className={`textarea-group ${isEditable ? "inner-shadow" : "outer-shadow disabled"}`}>
            <Toolbar editor={editor} />
            <EditorContent
                editor={editor}
                style={{
                    whiteSpace: "pre-line",
                    width: "100%",
                    height: "89%",
                    overflow: "auto",
                    position: "absolute",
                }} />

            <input
                type="hidden"
                name="editor"
                id="editor-text-area"
                defaultValue={editorContent}
                hidden
                readOnly={!isEditable}
                disabled={!isEditable && !isUpdated} />
        </div>
    );
}
