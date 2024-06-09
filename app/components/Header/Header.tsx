import { HamburgerButton } from "..";
import "../../styles/header.scss";

export default function Header() {

    return (
        <header className="header">
            <div className="container">
                <div className="row justify-content-between">
                    <HamburgerButton />
                </div>
            </div>
        </header>
    )
}