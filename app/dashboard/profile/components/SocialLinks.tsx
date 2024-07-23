"use client";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { InputField } from "../../components";
import { SiLeetcode } from "react-icons/si";
import React, { ChangeEvent, useState } from "react";

export default function SocialLinks() {
    const [socialLinks, setSocialLinks] = useState<Record<string, string>>({
        linkedin: "hhttp://",
        leetcode: "hhttp://",
        github: "hhttp://",
        twitter: "hhttp://",
    });

    const socialIcons = [<FaLinkedinIn />, <SiLeetcode />, <FaGithub />, <FaTwitter />];

    const handleChange = (link: ChangeEvent<HTMLInputElement>) => {
        setSocialLinks({
            ...socialLinks,
            [link.target.name]: link.target.value,
        })
    }

    return (
        <div className="row">
            <div className="social-item">
                <InputField label='Linkedin' icon={socialIcons[0]} value={socialLinks.linkedin} isTextArea={false} handleChangeInput={handleChange} />
            </div>
            <div className="social-item">
                <InputField label='Leetcode' icon={socialIcons[1]} value={socialLinks.leetcode} isTextArea={false} handleChangeInput={handleChange} />
            </div>
            <div className="social-item">
                <InputField label='Github' icon={socialIcons[2]} value={socialLinks.github} isTextArea={false} handleChangeInput={handleChange} />
            </div>
            <div className="social-item">
                <InputField label='Twitter' icon={socialIcons[3]} value={socialLinks.twitter} isTextArea={false} handleChangeInput={handleChange} />
            </div>
        </div>
    )
}
