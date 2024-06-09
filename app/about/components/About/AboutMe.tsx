import { Button } from '@/app/components'
import Link from 'next/link'
import React from 'react'

export default function AboutMe({ info }: { info: string | TrustedHTML }) {
    return (
        <div className="about-info">
            <p dangerouslySetInnerHTML={{ __html: info }} />

            <p>
                I love in turning People's Imagination into Reality.Feel free to take a look at my latest projects on <Link href="/portfolio" className="portfolioPage" > Portfolio Page</Link>.
            </p>

            <p>
                Remotely available UTC-1 to UTC+05:30.
                <Link href="mailto:hirechandan@gmail.com" className="email">hirechandan@gmail.com</Link>
            </p>

            <Button href="myResume.pdf" label="Download Resume" target="_blank" />
            <Button href="contact" label="Hire Me" />

        </div>
    )
}
