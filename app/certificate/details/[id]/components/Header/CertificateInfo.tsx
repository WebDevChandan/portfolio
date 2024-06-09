import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function CertificateInfo(
    { issueDate, expiryDate, skill, link }:
    { issueDate?: string, expiryDate?: string, skill?: string, link: string }
    ) {
    return (
        <div className="info">
            <h3>Certificate Authentication</h3>
            <ul>
                <li>Issue Date - <span>{issueDate}</span></li>
                <li>Expiry Date - <span>{expiryDate}</span></li>
                <li>Skill - <span>{skill}</span></li>
                <li>Live -
                    <span><Link href={link} target="_blank"> Click Here <FaExternalLinkAlt /></Link></span>
                </li>
            </ul>
        </div>
    )
}
