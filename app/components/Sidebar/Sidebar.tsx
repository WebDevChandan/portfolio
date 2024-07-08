"use client";
import { MdOutlineChevronRight } from 'react-icons/md';
import { Logo, SideMenuLinks } from "..";
import "../../styles/sidebar.scss";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [sideBarMode, setSideBarMode] = useState(true);
    const [shouldRenderSidebar, setShouldRenderSidebar] = useState(true);
    const pathName = usePathname();

    useEffect(() => {
        const handleResize = () => {
            setShouldRenderSidebar(window.innerWidth >= 1314);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            {
                shouldRenderSidebar &&
                <nav className={`${sideBarMode ? "close " : ""}sidebar outer-shadow`}>
                    <header>
                        <div className="image-text">
                            <Logo />

                            <div className="text logo-text">
                                <span className="name">Chandan Kumar</span>
                                <span className="profession">Software Developer</span>
                            </div>
                        </div>

                        <i className='right toggle outer-shadow' onClick={() => setSideBarMode(!sideBarMode)}><MdOutlineChevronRight /></i>
                    </header>

                    <SideMenuLinks pathName={pathName}/>
                </nav>
            }
        </>
    )
}