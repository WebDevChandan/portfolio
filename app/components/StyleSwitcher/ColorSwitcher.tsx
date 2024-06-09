"use client"
import { FaCog } from 'react-icons/fa';
import { useEffect } from 'react';

type toggleColorSwitcherProps = {
    toggleColorSwitcher: () => void;
}

export default function ColorSwitcher({ toggleColorSwitcher }: toggleColorSwitcherProps) {

    useEffect(() => {
        const currentThemeColor: string | null = localStorage.getItem("themeColor");

        if (currentThemeColor)
            changeTheme(currentThemeColor);

    }, [])

    const changeTheme = (currentColor: string) => {
        const bodyClassList = document.querySelector('body')?.classList;
        let found = false;
        bodyClassList?.forEach(existedColor => {
            if (existedColor !== currentColor && existedColor !== "dark") {
                bodyClassList.replace(existedColor, currentColor);
                found = true;
            }
        })
        if (!found)
            bodyClassList?.add(currentColor);

        localStorage.setItem("themeColor", currentColor);
    }

    const colorPicker = [1, 2, 3, 4, 5];
    return (
        <>
            <div className="style-switcher-toggler s-icon outer-shadow hover-in-shadow" onClick={toggleColorSwitcher}>
                <i className="fa-cog fa-spin"><FaCog /></i>
            </div>

            <h4>Theme Colors</h4>
            <div className="colors">
                {colorPicker.map(colorNum => (
                    <span className={`color-${colorNum}`} key={colorNum}
                        onClick={() => changeTheme("color-" + colorNum)} ></span>
                ))}
            </div>
        </>
    )
}
