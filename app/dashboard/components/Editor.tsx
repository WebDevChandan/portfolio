"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction, useState } from "react";
import Toolbar from "./Toolbar";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import '../styles/Editor.scss';

type EditorContentType = {
    content: string,
    isEditable: boolean,
}

export default function Editor({ content, isEditable }: EditorContentType) {
    const [editorContent, setEditorContent] = useState(content);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline.configure({
                HTMLAttributes: {
                    class: "underline-class",
                }
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            })
        ],
        editorProps: {
            attributes: {
                class: "text-editor",
                spellcheck: "false"
            },
        },
        content: `${editorContent}`,
        immediatelyRender: false,
        onBlur: ({ editor }) => { editor.isEditable ? setEditorContent(editor.getHTML()) : null },
        editable: false,
        autofocus: false,
    })

    editor?.setEditable(isEditable);
    return (
        <>
            <Toolbar editor={editor} />
            <EditorContent
                editor={editor}
                style={{
                    whiteSpace: "pre-line",
                    width: "100%",
                    height: "85%",
                    overflow: "auto",
                    position: "absolute",
                }} />

            <input type="text" name="editor" id="editor-text-area" defaultValue={editorContent} hidden />
        </>
    )
}
