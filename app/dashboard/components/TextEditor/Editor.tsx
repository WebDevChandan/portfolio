"use client";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { useEffect } from "react";
import { useEditorAction } from "../../hook/useEditorAction";
import '../../styles/editor.scss';
import Toolbar from "./Toolbar";

interface HandleEditorUpdateProps {
    editor: {
        isEditable: boolean;
        getHTML: () => string;
    };
}

export default function Editor() {
    const { isEditable, isUpdated, editorContent, setEditorContent } = useEditorAction();

    
    const handleEditorUpdate = ({ editor }: HandleEditorUpdateProps) => {
        if (editor.isEditable)
            setEditorContent(DOMPurify.sanitize(editor.getHTML()));
    };

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
                class: `text-editor${isEditable ? "" : " disabled"}`,
                spellcheck: "false"
            },
        },
        content: `${editorContent}`,
        immediatelyRender: false,
        onUpdate: (editor) => handleEditorUpdate(editor),
        editable: false,
        autofocus: false,
    });

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
