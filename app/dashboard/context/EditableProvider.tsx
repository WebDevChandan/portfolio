"use client";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface EditableState {
    isEditable: boolean;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
    isUpdateable: boolean;
    setIsUpdateable: Dispatch<SetStateAction<boolean>>;
}

export const EditableContext = createContext<EditableState>({
    isEditable: false,
    setIsEditable: () => { },
    isUpdateable: false,
    setIsUpdateable: () => { },

});

export default function EditableProvider({ children }: { children: React.ReactNode }) {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isUpdateable, setIsUpdateable] = useState<boolean>(false);

    return (
        <EditableContext.Provider value={{ isEditable, setIsEditable, isUpdateable, setIsUpdateable }} >
            {children}
        </EditableContext.Provider>
    )
}
