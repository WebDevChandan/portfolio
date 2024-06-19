import prisma from "@/utils/prisma";
import Link from "next/link"
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import { SiLeetcode } from "react-icons/si"

const fetchSocialLinks = async () => {
    const [socialLinks] = await prisma.personalInfo.findMany({
        select: {
            socialLinks: {
                select: {
                    label: true,
                    link: true
                }
            }
        }
    })
    return socialLinks;
}

export default async function SocialLinks() {
    const { socialLinks } = await fetchSocialLinks();
    const socialIcons = [<FaLinkedinIn />, <SiLeetcode />, <FaGithub />, <FaTwitter />]


    return (
        <div className="social-links">
            {socialLinks.map(({ label, link }, index) => (
                <Link href={link} target="_blank" key={index}
                    className="outer-shadow hover-in-shadow" title={label}><i>{socialIcons[index]}</i></Link>
            ))}

        </div>
    )
}
