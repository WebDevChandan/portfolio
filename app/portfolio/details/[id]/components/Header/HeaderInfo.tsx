import React from 'react'

export default function HeaderInfo({ from, to, client, link, demo, tools }: { from: string, to: string, client: string, link: string, demo: string | undefined, tools: string[] | null }) {
    return (
        <div className="info">
            <h3>Project Info</h3>
            <ul>
                <li>Date - <span>{from} - {to}</span></li>
                <li>Client - <span>{client}</span></li>
                <li>Tools - <span>{tools ? tools.join(', ') : 'No tools specified'}</span></li>
                <li>Web - <span><a href={link}>www.domain.com</a></span></li>
                <li>Demo - <span>{demo}</span></li>
            </ul>
        </div>
    )
}
