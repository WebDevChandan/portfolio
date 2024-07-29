import type { Metadata } from 'next';
import './styles/dashboard.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
    title: 'Dashboard | Portfolio',
    description: 'Dashboard Personal Portfolio',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="dashboard-section section">
            <div className="container">
                <ToastContainer />
                {children}
            </div>
        </section>
    )
}
