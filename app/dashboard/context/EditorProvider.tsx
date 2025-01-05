"use client";
import { showToast } from "@/utils/showToast";
import DOMPurify from "isomorphic-dompurify";
import { createContext, Dispatch, MouseEvent, ReactNode, SetStateAction, useEffect, useState } from "react";

type EditorContextType = {
    isEditable: boolean;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
    isUpdated: boolean;
    setIsUpdated: Dispatch<SetStateAction<boolean>>;
    editorContent: string;
    setEditorContent: Dispatch<SetStateAction<string>>;
    handleEditorContent: (event: MouseEvent<HTMLButtonElement>, saveContent: () => void, isEditorLoading: boolean) => void;
};

export const EditorActionContext = createContext<EditorContextType | undefined>(undefined);

export const EditorActionProvider = ({ defaultContent, children }: { defaultContent: string, children: ReactNode }) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const sanitizedContent: string | TrustedHTML = DOMPurify.sanitize(defaultContent);
    const [editorContent, setEditorContent] = useState<string>(sanitizedContent);

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
    return (
        <EditorActionContext.Provider value={{ isEditable, setIsEditable, isUpdated, setIsUpdated, editorContent, setEditorContent, handleEditorContent }}>
            {children}
        </EditorActionContext.Provider>
    );
};


