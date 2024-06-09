import Link from 'next/link';
import { FaCode, FaEnvelope, FaFileAlt, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { PiCertificateFill } from 'react-icons/pi';
import { activateNavLink } from '../Header/HamburgerButton';

export const activateSideLink = (pathName?: string | null) => {
    const sideLinkLIst = document.querySelector('.menu-links')?.childNodes;

    sideLinkLIst?.forEach((item) => {
        const link = item.firstChild as HTMLElement;

        if (link.getAttribute('href')?.replace(/[/]/g, "") === pathName)
            link.parentElement?.classList.add('active');

        else if (link.parentElement?.classList.contains('active'))
            link.parentElement?.classList.remove('active');

    })
}

export const navLinks = [
    {
        label: "Home",
        icon: <FaHome />,
        active: true,
    },
    {
        label: "About",
        icon: <FaUser />,
        active: false,
    },
    {
        label: "Resume",
        icon: <FaFileAlt />,
        active: false,
    },
    {
        label: "Certificate",
        icon: <PiCertificateFill />,
        active: false,
    },
    {
        label: "Portfolio",
        icon: <FaCode />,
        active: false,
    },
    {
        label: "Testimonial",
        icon: <FaUsers />,
        active: false,
    },
    {
        label: "Contact",
        icon: <FaEnvelope />,
        active: false,
    },
]
export default function SideNavLinks() {

    return (
        <div className="menu-bar">
            <div className="menu">
                <ul className="menu-links">
                    {
                        navLinks.map(({ label, icon, active }, index) => (
                            <li className={`nav-link${active ? " active" : ""} outer-shadow`} key={index}
                                onClick={(e) => {
                                    const link = e.currentTarget.firstChild as HTMLElement;
                                    activateNavLink(link.getAttribute('href')?.replace(/[/]/g,""));
                                }}>
                                <Link href={label !== "Home" ? label.toLowerCase() : "/"}>
                                    <i className='icon'>{icon}</i>
                                    <span className="text nav-text">{label}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
