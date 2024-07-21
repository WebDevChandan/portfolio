import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { InputField } from "../../components";
import { SiLeetcode } from "react-icons/si";

export default function SocialLinks() {
    const socialIcons = [<FaLinkedinIn />, <SiLeetcode />, <FaGithub />, <FaTwitter />]
    return (
        <div className="row">
            <div className="social-item">
                <InputField label='Linkedin' icon={socialIcons[0]} value="hhttp://" isTextArea={false} />
            </div>
            <div className="social-item">
                <InputField label='Leetcode' icon={socialIcons[1]} value="hhttp://" isTextArea={false}  />
            </div>
            <div className="social-item">
                <InputField label='Github' icon={socialIcons[2]} value="hhttp://" isTextArea={false}  />
            </div>
            <div className="social-item">
                <InputField label='Twitter' icon={socialIcons[3]} value="hhttp://" isTextArea={false}  />
            </div>
        </div>
    )
}
