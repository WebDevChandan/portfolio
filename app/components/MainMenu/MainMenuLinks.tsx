"use client";
import useAuth from "@/app/hook/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toggleMainMenuBar } from '../Header/HamburgerButton';
import { dashboardNavLinks as dashboardMainMenuLinks, navLinks as mainMenuLinks } from "../Sidebar/SideMenuLinks";

export default function MainMenuLinks() {
    const { logOutHandler } = useAuth();
    const pathName = usePathname();
    const isDashboard = pathName === "/dashboard" || pathName.startsWith("/dashboard");

    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault();
        await logOutHandler();
        const mainMenu = document.querySelector('.nav-menu');
        mainMenu?.classList.toggle("open");
    }

    return (
        <>
            <div className="close-btn outer-shadow hover-in-shadow"
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
                            label === "Logout"
                                ? (<li key={index}>
                                    <Link href={"#"}
                                        className={`${active ? "active inner-shadow " : "outer-shadow hover-in-shadow"}`}
                                        onClick={(e) => handleLogout(e)}
                                    >
                                        {label}
                                    </Link>
                                </li>) : (<li key={index}>
                                    <Link href={label !== "Dashboard" ? `/dashboard/${label.toLowerCase()}` : "/dashboard"}
                                        className={`${active ? "active inner-shadow " : "outer-shadow hover-in-shadow"}`}
                                        onClick={(e) => toggleMainMenuBar(e.currentTarget)}
                                        prefetch={true}
                                    >
                                        {label}
                                    </Link>
                                </li>)
                        )))}
                </ul>
            </div>
        </>
    )
}
