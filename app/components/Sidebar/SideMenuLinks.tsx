"use client";
import useAuth from '@/app/hook/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaBriefcase, FaFileAlt, FaGraduationCap, FaHome, FaUser, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdDashboard, MdWorkHistory } from 'react-icons/md';
import { PiCertificateFill } from 'react-icons/pi';
import { SlLogout } from "react-icons/sl";
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
        icon: <FaUserCircle />,
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
        icon: <MdWorkHistory />,
        active: false,
    },
    {
        label: "Testimonial",
        icon: <FaUsers />,
        active: false,
    },
    {
        label: "Contact",
        icon: <BiSolidMessageRoundedDetail />,
        active: false,
    },
];

export const dashboardNavLinks = [
    {
        label: "Dashboard",
        icon: <MdDashboard />,
        active: true,
    },
    {
        label: "Profile",
        icon: <FaUser />,
        active: false,
    },
    {
        label: "Education",
        icon: <FaGraduationCap />,
        active: false,
    },
    {
        label: "Experience",
        icon: <FaBriefcase />,
        active: false,
    },
    {
        label: "Certificate",
        icon: <PiCertificateFill />,
        active: false,
    },
    {
        label: "Portfolio",
        icon: <MdWorkHistory />,
        active: false,
    },
    {
        label: "Testimonial",
        icon: <FaUsers />,
        active: false,
    },
    {
        label: "Logout",
        icon: <SlLogout />,
        active: false,
    },
];

export default function SideNavLinks({ pathName }: { pathName: string }) {
    const isDashboard = pathName === "/dashboard" || pathName.startsWith("/dashboard");
    const { logOut } = useAuth();
    const router = useRouter();

    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault();
        await logOut();
        router.push("/");
    }

    return (
        <div className="menu-bar">
            <div className="menu">
                <ul className="menu-links">
                    {
                        !isDashboard
                            ? (navLinks.map(({ label, icon, active }, index) => (
                                <li
                                    className={`nav-link ${active ? "active" : ""} outer-shadow`}
                                    key={index}
                                    onClick={(e) => {
                                        const link = e.currentTarget.firstChild as HTMLElement;
                                        activateNavLink(link.getAttribute('href')?.replace(/[/]/g, ""));
                                    }}
                                    title={label}
                                >
                                    <Link href={label !== "Home" ? label.toLowerCase() : "/"}>
                                        <i className='icon'>{icon}</i>
                                        <span className="text nav-text">{label}</span>
                                    </Link>
                                </li>
                            )))
                            : (dashboardNavLinks.map(({ label, icon, active }, index) => (
                                label === "Logout"
                                    ? (<li
                                        className={`nav-link ${active ? "active" : ""} outer-shadow`}
                                        key={index}
                                        onClick={(e) => { handleLogout(e) }}
                                        title={label}
                                    >
                                        <i className='icon'>{icon}</i>
                                        <span className="text nav-text">{label}</span>
                                    </li>)
                                    : (<li
                                        className={`nav-link ${active ? "active" : ""} outer-shadow`}
                                        key={index}
                                        onClick={(e) => {
                                            const link = e.currentTarget.firstChild as HTMLElement;
                                            activateNavLink(link.getAttribute('href')?.replace(/[/]/g, ""));
                                        }}
                                        title={label}
                                    >
                                        <Link href={label !== "Dashboard" ? `/dashboard/${label.toLowerCase()}` : "/dashboard"}>
                                            <i className='icon'>{icon}</i>
                                            <span className="text nav-text">{label}</span>
                                        </Link>
                                    </li>)
                            )))
                    }
                </ul>
            </div>
        </div>
    )
}
