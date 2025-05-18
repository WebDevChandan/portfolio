import { Editor } from "@tiptap/react";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import '../styles/editor.scss';

export interface HandleEditorUpdateProps {
    editor: {
        isEditable: boolean;
        getHTML: () => string;
    };
}

export type EditorContextType = {
    isEditable: boolean;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
    isUpdated: boolean;
    setIsUpdated: Dispatch<SetStateAction<boolean>>;
    editorContent: string;
    setEditorContent: Dispatch<SetStateAction<string>>;
    handleEditorContent: (event: MouseEvent<HTMLButtonElement>, saveContent: () => void, isEditorLoading: boolean) => void;
    handleCancelEditor: () => void;
    editor: Editor | null
};