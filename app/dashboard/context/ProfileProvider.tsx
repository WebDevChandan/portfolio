"use client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { ProfileType } from '../profile/page';

type ProfileContextType = {
    profileData: ProfileType;
    isEditable: boolean;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
    isUpdateable: boolean;
    setIsUpdateable: Dispatch<SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

export const ProfileProvider = ({ children, profileData }: { children: React.ReactNode; profileData: ProfileType }) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isUpdateable, setIsUpdateable] = useState<boolean>(false);

    return (
        <ProfileContext.Provider value={{ isEditable, setIsEditable, isUpdateable, setIsUpdateable, profileData }}>
            {children}
        </ProfileContext.Provider>
    );
};
