import { Button } from "..";

export default function HomeText({ role }: { role: string[] | undefined }) {
    return (
        <div className="home-text">

            <p>Hello</p>
            <h2>I'm <label id="myName">Chandan Kumar</label>
            </h2>
            <h1>Full-Stack Web/Java Developer</h1>

            <Button label="Portfolio" />
            <Button label="Resume" />

        </div>
    )
}
