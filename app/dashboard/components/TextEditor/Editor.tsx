"use client";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useProfile } from "../../context/ProfileProvider";
import '../../styles/editor.scss';
import Toolbar from "./Toolbar";

 type EditorType = {
    isEditable: boolean,
    isUpdated: boolean,
    setIsUpdated: Dispatch<SetStateAction<boolean>>,
}

export default function Editor({ isEditable, isUpdated, setIsUpdated }: EditorType) {
    const { profileData } = useProfile();
    const sanitizedContent: string | TrustedHTML = DOMPurify.sanitize(profileData?.about ? profileData.about : "");
    const [editorContent, setEditorContent] = useState(sanitizedContent);

    useEffect(() => {
        const hasContentChanged = editorContent !== sanitizedContent;

        const hasContent = editorContent.length >= 30;

        setIsUpdated(hasContentChanged && hasContent);
    }, [editorContent, sanitizedContent, setIsUpdated]);

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
                disabled={!isEditable && !isUpdated}  />
        </div>
    )
}
