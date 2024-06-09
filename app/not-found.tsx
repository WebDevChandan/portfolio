"use client";

import { Button } from "./components";
import './styles/not-found.scss';

export default function NotFound({ error }: { error: Error }) {
    return (
        <div className="not-found">
            <h1>Opps! Error</h1>
            <p>Error: 404 Page Not Found</p>
            <Button label="Go Home" href="/" />
        </div>
    );
}
