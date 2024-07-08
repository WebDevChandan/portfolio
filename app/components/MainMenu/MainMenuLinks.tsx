"use client";
import Link from "next/link";
import { toggleMainMenuBar } from '../Header/HamburgerButton';
import { dashboardNavLinks as dashboardMainMenuLinks, navLinks as mainMenuLinks } from "../Sidebar/SideMenuLinks";
import { usePathname } from "next/navigation";

export default function MainMenuLinks() {
    const pathName = usePathname();
    const isDashboard = pathName === "/dashboard";
    return (
        <>
            <div className="close-nav-menu outer-shadow hover-in-shadow"
                onClick={() => toggleMainMenuBar()}
                tabIndex={0}>&times;
            </div >

            <div className="nav-menu-inner">
                <ul>
                    {!isDashboard
                        ? (mainMenuLinks.map(({ label, active }, index) => (
                            <li key={index}>
                                <Link href={label !== "Home" ? label.toLowerCase() : "/"}
                                    className={`${active ? "active inner-shadow " : "outer-shadow hover-in-shadow"}`}
                                    onClick={(e) => toggleMainMenuBar(e.currentTarget)}
                                >{label}</Link>
                            </li>
                        )))
                        : (dashboardMainMenuLinks.map(({ label, active }, index) => (
                            <li key={index}>
                                <Link href={label !== "Home" ? label.toLowerCase() : "/"}
                                    className={`${active ? "active inner-shadow " : "outer-shadow hover-in-shadow"}`}
                                    onClick={(e) => toggleMainMenuBar(e.currentTarget)}
                                >{label}</Link>
                            </li>
                        )))}
                </ul>
            </div>
        </>
    )
}
