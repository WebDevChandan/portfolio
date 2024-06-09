import { Metadata } from "next"
import { ValidationMessage } from "./components"

export const metadata: Metadata = {
    title: 'WebDevChandan | Contact',
    description: 'Contact Page Portfolio',
}

export default function Contactlayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ValidationMessage />
            {children}
        </>
    )
}
