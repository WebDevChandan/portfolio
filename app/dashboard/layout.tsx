import type { Metadata } from 'next';
import './styles/dashboard.scss';

export const metadata: Metadata = {
    title: 'Dashboard | Portfolio',
    description: 'Dashboard Personal Portfolio',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="dashboard-section section">
            <div className="container">
                {children}
            </div>
        </section>
    )
}
