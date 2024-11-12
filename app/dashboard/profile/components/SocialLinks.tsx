"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { AddButton, InputField } from "../../components";
import { useProfile } from "../../context/ProfileProvider";
import { ManageSocialLinks, ModelButton } from ".";

type SocialLinksType = {
    label: string;
    link: string;
}[]

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

export default function SocialLinks({ socialLinksProp }: { socialLinksProp: SocialLinksType }) {
    console.log(socialLinksProp);
    const { setIsUpdateable } = useProfile();

    const [socialLinks, setSocialLinks] = useState<SocialLinksType>(socialLinksProp);
    const [isValidLink, setIsValidLink] = useState<boolean>(true);


    useEffect(() => {
        const hasLinkChanged = socialLinks.some(({ label, link }) => {
            const initialLink = socialLinksProp.find(sl => sl.label === label)?.link;
            return link !== initialLink;
        });

        const isAllLinkValid = socialLinks.every(sl => sl.link.length >= 20);

        setIsUpdateable(hasLinkChanged && isAllLinkValid);
    }, [socialLinks, socialLinksProp]);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSocialLinks((socialLinks) =>
            socialLinks.map((socialLink) =>
                socialLink.label.toLocaleLowerCase() === event.target.name.toLocaleLowerCase()
                    ? { ...socialLink, link: event.target.value }
                    : socialLink
            )
        );
    }

    return (
        <>
            <div className="row">
                {socialLinks.map(({ label, link }) => (
                    <div className="social-item" key={label}>
                        <InputField
                            label={label}
                            icon={allSocialLinks.find(icon => icon.label === label.toLocaleLowerCase())?.icon}
                            value={link}
                            // specificName="social"
                            handleChangeInput={handleChange} />
                    </div>
                ))}

                <ModelButton label="Edit Links" children={<ManageSocialLinks />}/>
            </div>
        </>
    )
}
