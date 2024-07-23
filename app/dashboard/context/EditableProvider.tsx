"use client";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface EditableState {
    isEditable: boolean;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
}

export const EditableContext = createContext<EditableState>({
    isEditable: false,
    setIsEditable: () => { },

});

export default function EditableProvider({ children }: { children: React.ReactNode }) {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    return (
        <EditableContext.Provider value={{ isEditable, setIsEditable }} >
            {children}
        </EditableContext.Provider>
    )
}
