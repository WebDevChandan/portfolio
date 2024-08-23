"use client";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { InputField } from "../../components";
import { SiLeetcode } from "react-icons/si";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { EditableContext } from "../../context/EditableProvider";

type SocialLinksType = {
    label: string;
    link: string;
}[]

export default function SocialLinks({ socialLinksProp }: { socialLinksProp: SocialLinksType }) {
    const { setIsUpdateable } = useContext(EditableContext);

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


    const socialIcons = [{
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
        <div className="row">
            {socialLinks.map(({ label, link }) => (
                <div className="social-item" key={label}>
                    <InputField
                        label={label}
                        icon={socialIcons.find(icon => icon.label === label.toLocaleLowerCase())?.icon}
                        value={link}
                        // specificName="social"
                        handleChangeInput={handleChange} />
                </div>
            ))}
        </div>
    )
}
