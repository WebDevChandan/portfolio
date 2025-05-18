"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { InputField } from "../../components";
import { useProfile } from "../../context/ProfileProvider";
import '../styles/manageSocialLinks.scss';
import { allSocialLinks } from "./ProfileSocialLinks";
import { saveSocialLinks } from "../server/profile.action";
import { showToast } from "@/utils/showToast";
import ServerSpinLoader from "@/app/components/Loader/ServerSpinLoader";
import { useModalAction } from "@/app/hook/useModalAction";

export type SocialLinksType = {
    label: string;
    link: string;
}[]


export default function ManageSocialLinks() {
    const { profileData, isProfileUpdating, setIsProfileUpdating } = useProfile();
    const { setModalPopup } = useModalAction();

    const [socialLinks, setSocialLinks] = useState<SocialLinksType>(profileData ? profileData.socialLinks : []);

    const [hasContentChanged, setHasContentChanged] = useState(false);

    useEffect(() => {
        if (!socialLinks.length)
            setHasContentChanged(false)

        else if (profileData?.socialLinks.length !== socialLinks.length)
            setHasContentChanged(true);

        else {
            const hasSkillsChanged = socialLinks.some(socialLink =>
                profileData?.socialLinks.some(prevSocialLink =>
                    prevSocialLink.label.toLocaleLowerCase() === socialLink.label.toLocaleLowerCase() && prevSocialLink.link !== socialLink.link
                )
            );

            setHasContentChanged(hasSkillsChanged);
        }

    }, [socialLinks]);

    const handleNewSocialLink = (event: { target: { value: string; }; }) => {
        const { value } = event.target;
        if (value)
            setSocialLinks([
                ...socialLinks,
                {
                    label: value,
                    link: "",
                }
            ])
    };

    const handleSocialLinks = (event: ChangeEvent<HTMLInputElement>) => {
        setSocialLinks((socialLinks) =>
            socialLinks.map((socialLink) =>
                socialLink.label.toLocaleLowerCase() === event.target.name.toLocaleLowerCase()
                    ? { ...socialLink, link: event.target.value.trim() }
                    : socialLink
            )
        );
    }

    const handleDeleteSocialLink = (name: string, value: string) => {
        if (!value.trim())
            setSocialLinks((socialLinks) =>
                socialLinks.filter((socialLink) =>
                    socialLink.label.toLocaleLowerCase() !== name.toLocaleLowerCase()
                )
            );

        else if (confirm('Are you sure you want to delete?'))
            setSocialLinks((socialLinks) =>
                socialLinks.filter((socialLink) =>
                    socialLink.label.toLocaleLowerCase() !== name.toLocaleLowerCase()
                )
            );
    };


    const handleSaveSocialLinks = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isProfileUpdating) return;

        if (!socialLinks.length) return;

        setIsProfileUpdating(true);

        const { message, errorMessage } = await saveSocialLinks(socialLinks) as { message?: string, errorMessage?: string };

        if (message) {
            setIsProfileUpdating(false);
            setModalPopup(false);
            showToast("success", message)
            return;
        }

        if (errorMessage) {
            showToast("error", errorMessage)
            setIsProfileUpdating(false);
            return;
        }
    }


    return (
        <div className="add-content-container">
            <div className="content-header">
                <div className="content-label">Manage social links</div>
                <select
                    id="newSocialLabel"
                    onChange={handleNewSocialLink}
                >
                    <option value="">Add new link</option>
                    {allSocialLinks?.map((socialLink, index) => {
                        const isNewSocialLink = !socialLinks.find(
                            existedSocialLink => existedSocialLink.label.toLocaleLowerCase() === socialLink.label.toLocaleLowerCase())

                        return isNewSocialLink && (
                            <option
                                key={index}
                                value={socialLink.label}
                            >
                                {socialLink.label}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="add-content">
                {socialLinks.map((socialLink, index) => (
                    <InputField
                        key={index}
                        value={socialLink.link}
                        placeholder="enter social link"
                        specificName={socialLink.label}
                        icon={allSocialLinks.find(icon => icon.label === socialLink.label.toLocaleLowerCase())?.icon}
                        deleteIcon={true}
                        handleChangeInput={handleSocialLinks}
                        handleDeleteInput={() => handleDeleteSocialLink(socialLink.label, socialLink.link)}
                    />
                ))}
            </div>

            <div className="modal-btn">
                <button onClick={handleSaveSocialLinks} disabled={isProfileUpdating || !hasContentChanged} className={`btn-1 outer-shadow ${isProfileUpdating ? "btn-disabled" : !hasContentChanged ? "btn-disabled-without-loader" : "hover-in-shadow"}`}>{isProfileUpdating && <ServerSpinLoader />} Save Links</button>
            </div>
        </div>
    )
}
