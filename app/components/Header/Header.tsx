"use client";
import { usePathname } from "next/navigation";
import { HamburgerButton, Logo } from "..";
import "../../styles/header.scss";

export default function Header() {
    const pathName = usePathname();
    const isLoginPage = pathName === "/login";

    return (
        !isLoginPage &&
        <header className="header">
            <div className="container">
                <div className="row justify-content-between">
                    <HamburgerButton />
                </div>
                <Logo />
            </div>
        </header>
    )
}