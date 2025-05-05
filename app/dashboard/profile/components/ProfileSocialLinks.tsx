"use client";
import ModalProvider from "@/app/context/ModalProvider";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { ManageSocialLinks } from ".";
import { InputField } from "../../components";
import ModalButton from "../../components/ModalButton";
import { useProfile } from "../../context/ProfileProvider";

export const allSocialLinks = [{
    label: "linkedin",
    icon: <FaLinkedinIn />,
}, {
    label: "leetcode",
    icon: <SiLeetcode />,
}, {
    label: "github",
    icon: <FaGithub />,
}, {
    label: "twitter",
    icon: <FaTwitter />,
}, {
    label: "facebook",
    icon: <FaFacebook />,
}, {
    label: "instagram",
    icon: <FaInstagram />,
}, {
    label: "youtube",
    icon: <FaYoutube />,
}];

export default function ProfileSocialLinks() {
    const { profileData } = useProfile();

    return (
        <ModalProvider>
            <div className="row">
                {profileData?.socialLinks &&
                    profileData.socialLinks.map(({ label, link }) => (
                        <div className="social-item" key={label}>
                            <InputField
                                label={label}
                                icon={allSocialLinks.find(icon => icon.label === label.toLocaleLowerCase())?.icon}
                                value={link}
                                specificName="socialLink"
                                disabled={true}
                            />
                        </div>
                    ))}

                <ModalButton label="Edit Links">
                    <ManageSocialLinks />
                </ModalButton>
            </div>
        </ModalProvider>
    )
}
