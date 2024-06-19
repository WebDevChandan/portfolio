"use client";
import { useLayoutEffect, useState } from 'react';
import { FaSun } from 'react-icons/fa';
import { ColorSwitcher } from '..';
import "../../styles/style-switcher.scss";

export default function StyleSwitcher() {
    const [styleSwitcherMode, setStyleSwitcherMode] = useState(false);

    useLayoutEffect(() => {
        const currentThemeMode: string | null = localStorage.getItem("themeMode");

        if (currentThemeMode)
            changeThemeMode(currentThemeMode);

    }, [])
    
    const changeThemeMode = (currentThemeMode?: string) => {
        const bodyClassList = document.querySelector('body')?.classList;
        
        let found = false;
        bodyClassList?.forEach(existMode => {
            if (existMode === "dark" && currentThemeMode!=="dark") {
                bodyClassList?.remove("dark");
                localStorage.setItem("themeMode", "");
                found = true;
            }
        })

        if (!found) {
            bodyClassList?.add("dark");
            localStorage.setItem("themeMode", "dark");
        }

    }

    return (
        <div className={`${styleSwitcherMode ? "open " : ""}style-switcher outer-shadow`}>

            <ColorSwitcher toggleColorSwitcher={() => setStyleSwitcherMode(!styleSwitcherMode)} />

            <div className="day-night s-icon outer-shadow hover-in-shadow" onClick={() => changeThemeMode()}>
                <i className="fas "><FaSun /></i>
            </div>

        </div>
    )
}