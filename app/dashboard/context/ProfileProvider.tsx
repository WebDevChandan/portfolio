"use client";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

// Corrected typo: 'lable' to 'label'
type SocialsLinkType = {
    label: string;
    link: string;
}[];

type SkillsType = {
    name: string;
    level: string;
}[];

interface Profile {
    aboutImage: string;
    bio: string;
    socials: SocialsLinkType;
    skills: SkillsType;
}

interface ProfileState {
    profileFields: Profile;
    setProfileFields: Dispatch<SetStateAction<Profile>>;
}

export const ProfileContext = createContext<ProfileState>({
    profileFields: {
        aboutImage: "",
        bio: "",
        socials: [{
            label: "",
            link: "",
        }],
        skills: [{
            name: "",
            level: "",
        }]
    },
    setProfileFields: () => {}
});

export default function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profileFields, setProfileFields] = useState<Profile>({
        aboutImage: "",
        bio: "",
        socials: [{
            label: "",
            link: "",
        }],
        skills: [{
            name: "",
            level: "",
        }]
    });

    return (
        <ProfileContext.Provider value={{ profileFields, setProfileFields }} >
            {children}
        </ProfileContext.Provider>
    );
}
