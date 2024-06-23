import { getCookie, getCookies, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { sixMonthDuration } from "./StyleSwitcher";

export default function ThemeSwitcher() {
    const previousThemeMode = getCookie('theme');
    const [themeMode, setThemeMode] = useState(previousThemeMode ? previousThemeMode : "");

    if (!themeMode && typeof document !== 'undefined') {
        const defaultThemeMode = document.documentElement.getAttribute('data-theme') as string;
        setThemeMode(defaultThemeMode);
    }

    const changeThemeMode = () => {
        if (themeMode === "light") {
            setThemeMode("dark");
            setCookie('theme', 'dark', { maxAge: sixMonthDuration });
            document.documentElement.setAttribute('data-theme', "dark");
        }
        else {
            setThemeMode("light");
            setCookie('theme', 'light', { maxAge: sixMonthDuration });
            document.documentElement.setAttribute('data-theme', "ligth");
        }
    }

    return (
        <div className="day-night s-icon outer-shadow hover-in-shadow" onClick={() => changeThemeMode()}>
            <i className="fas">{themeMode === "light" ? <FaMoon /> : <FaSun />}</i>
        </div>
    )
}
