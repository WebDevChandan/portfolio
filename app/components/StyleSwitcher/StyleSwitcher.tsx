"use client";
import { useState } from 'react';
import { ColorSwitcher } from '..';
import "../../styles/style-switcher.scss";
import ThemeSwitcher from './ThemeSwitcher';

export default function StyleSwitcher() {
    const [styleSwitcherMode, setStyleSwitcherMode] = useState(false);

    return (
        <div className={`${styleSwitcherMode ? "open " : ""}style-switcher outer-shadow`}>

            <ColorSwitcher toggleColorSwitcher={() => setStyleSwitcherMode(!styleSwitcherMode)} />
            
            <ThemeSwitcher />

        </div>
    )
}