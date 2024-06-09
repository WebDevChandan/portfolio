"use client";

import { MdOutlineChevronRight } from 'react-icons/md';
import { Logo, SideMenuLinks } from "..";
import "../../styles/sidebar.scss";
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const [sideBarMode, setSideBarMode] = useState(true);
    const [shouldRenderSidebar, setShouldRenderSidebar] = useState(true);

    useEffect(() => {
        window.screen.width < 575 ? setShouldRenderSidebar(false) : null;
    }, [])


    return (
        <>
            {
                shouldRenderSidebar &&
                <nav className={`${sideBarMode ? "close " : ""}sidebar outer-shadow`}>
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <Logo />
                            </span>

                            <div className="text logo-text">
                                <span className="name">Chandan Kumar</span>
                                <span className="profession">Full-Stack developer</span>
                            </div>
                        </div>

                        <i className='right toggle outer-shadow' onClick={() => setSideBarMode(!sideBarMode)}><MdOutlineChevronRight /></i>
                    </header>

                    <SideMenuLinks />
                </nav>
            }
        </>
    )
}