import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Portfolio',
    description: 'Dashboard Personal Portfolio',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}
