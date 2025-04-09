import { CopyrightText, MainMenuLinks } from '..';
import '../../styles/MainMenu.scss';

export default function MainMenuBar() {
    return (
            <nav className="nav-menu">
                <MainMenuLinks />
                <CopyrightText />
            </nav>
    )
}
