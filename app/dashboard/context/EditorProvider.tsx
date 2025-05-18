"use client";
import { showToast } from "@/utils/showToast";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { createContext, MouseEvent, ReactNode, useEffect, useState } from "react";
import '../styles/editor.scss';
import { EditorContextType, HandleEditorUpdateProps } from "../types/EditorTypes";


export const EditorActionContext = createContext<EditorContextType | undefined>(undefined);

export const EditorActionProvider = ({ defaultContent, defaultOpen, children }: { defaultContent: string, defaultOpen: boolean, children: ReactNode }) => {
    const [isEditable, setIsEditable] = useState<boolean>(defaultOpen);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const sanitizedContent: string | TrustedHTML = DOMPurify.sanitize(defaultContent);
    const [editorContent, setEditorContent] = useState<string>(sanitizedContent);

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
        const hasContentChanged = editorContent !== sanitizedContent;
        const hasContent = editorContent.length >= 30;
        setIsUpdated(hasContentChanged && hasContent);
    }, [editorContent, sanitizedContent, setIsUpdated]);

    const handleEditorContent = (event: MouseEvent<HTMLButtonElement>, saveContent: () => void, isEditorLoading: boolean) => {
        event.preventDefault();

        if (isEditorLoading) return

        if (!editorContent.length) {
            showToast("error", "Editor content cannot be empty.");
            return;
        }

        if (isEditable && isUpdated) {
            saveContent();
        }

        setIsEditable(!isEditable);
    };

    const handleCancelEditor = () => {
        if (editor) {
            editor.commands.setContent(sanitizedContent);
            setIsEditable(defaultOpen);
            setIsUpdated(false);
        }
    }

    return (
        <EditorActionContext.Provider
            value={{
                isEditable,
                setIsEditable,
                isUpdated,
                setIsUpdated,
                editorContent,
                setEditorContent,
                handleEditorContent,
                handleCancelEditor,
                editor
            }}>
            {children}
        </EditorActionContext.Provider >
    );
};


