"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction } from "react";
import Toolbar from "./Toolbar";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

type EditorContentType = {
    content: string,
    setContent: Dispatch<SetStateAction<string>>
}

export default function Editor() {
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
                spellcheck:"false"
            },
        },
        // content: `${content}`,
        content: `Hi`,
        immediatelyRender: false,
        // onUpdate: ({ editor }) => { setContent(editor.getHTML()), console.log(editor.state) },
    })

    // editor?.setEditable(false)
    return (
        <>
            <Toolbar editor={editor} />
            <EditorContent
                editor={editor}
                // onChange={() => setContent(content)}
                style={{
                    whiteSpace: "pre-line",
                    width: "100%",
                    height: "85%",
                    overflow: "auto",
                    position:"absolute",
                }} />

            {/* {editor && <div className="char-count">
        <p className="count">Character Count: {editor.getCharacterCount()}</p>
        </div>} */}
        </>
    )
}
