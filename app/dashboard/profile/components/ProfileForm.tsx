"use client";
import { useContext, useState } from "react";
import { updateProfile } from "../../action";
import { SubSectionTitle } from "../../components";
import MainProfile from "./MainProfile";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";
import { ProfileType } from "../page";
import ProfileProvider, { ProfileContext } from "../../context/ProfileProvider";

function ProfileForm({ profileData }: { profileData: ProfileType }) {
    const [editorContent, setEditorContent] = useState(profileData ? profileData?.about : "");

    return (
        <form action={updateProfile}>

            {profileData &&
                <>
                    <MainProfile
                        aboutImage={profileData?.myImages[1]}
                        bio={editorContent}
                        setBio={setEditorContent}
                    />

                    <SubSectionTitle title='Social Links' />
                    <SocialLinks socialLinksProp={profileData.socialLinks} />

                    <SubSectionTitle title='Skills' />
                    <Skills skillsProp={profileData.skills} />

                </>
            }

        </form>
    )
}

export default ProfileForm