import { CopyrightText, MainMenuLinks } from '..';
import '../../styles/mainMenu.scss';

export default function MainMenuBar() {
    return (
            <nav className="nav-menu">
                <MainMenuLinks />
                <CopyrightText />
            </nav>
    )
}
