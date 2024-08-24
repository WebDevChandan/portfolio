"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import '../../styles/Editor.scss';
import DOMPurify from "isomorphic-dompurify";
import Toolbar from "./Toolbar";

type EditorContentType = {
    content: string,
    isEditable: boolean,
    isUpdateable: boolean,
    setIsUpdateable: Dispatch<SetStateAction<boolean>>
}

export default function Editor({ content, isEditable, isUpdateable, setIsUpdateable }: EditorContentType) {
    const sanitizedContent: string | TrustedHTML = DOMPurify.sanitize(content);
    const [editorContent, setEditorContent] = useState(sanitizedContent);

    useEffect(() => {
        const hasContentChanged = editorContent !== sanitizedContent;

        const hasContent = editorContent.length >= 30;

        setIsUpdateable(hasContentChanged && hasContent);
    }, [editorContent, sanitizedContent, setIsUpdateable]);

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
                class: 'text-editor',
                spellcheck: "false"
            },
        },
        content: `${editorContent}`,
        immediatelyRender: false,
        onUpdate: ({ editor }) => { editor.isEditable ? setEditorContent(DOMPurify.sanitize(editor.getHTML())) : null },
        editable: false,
        autofocus: false,
    })

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable);
        }
    }, [isEditable]);

    return (
        <div className={`textarea-group ${isEditable ? "inner-shadow" : "outer-shadow disabled"}`}>

            <Toolbar editor={editor} isEditable={isEditable} />
            <EditorContent
                editor={editor}
                style={{
                    whiteSpace: "pre-line",
                    width: "100%",
                    height: "85%",
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
                disabled={!isEditable && !isUpdateable} />
        </div>
    )
}
