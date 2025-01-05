import { useContext } from "react";
import { EditorActionContext } from "../context/EditorProvider";

export const useEditorAction = () => {
    const context = useContext(EditorActionContext);
    if (context === undefined) {
        throw new Error("useEditorContext must be used within an EditorProvider");
    }
    return context;
};