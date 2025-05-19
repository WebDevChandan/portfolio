import { Button } from "..";

export default function HomeText({ name, roles }: { name: string, roles: string[] }) {
    return (
        <div className="home-text">

            <p>Hello</p>
            <h2>I&apos;m <label id="myName">{name}</label>
            </h2>
            <h1>
                {
                    roles.map((role, idx) => (
                        `${roles.length - 1 !== idx ? role + " / " : role}`
                    ))
                }
            </h1>

            <Button label="Portfolio" href="/portfolio"/>
            <Button label="Resume" href="/resume"/>

        </div>
    )
}
