import type { Metadata } from 'next';
import { Header, MainMenuBar, Sidebar, StyleSwitcher } from './components';
import './styles/globals.scss';

export const metadata: Metadata = {
  title: 'WebDevChandan | Portfolio',
  description: 'Rebuilding Personal Portfolio',
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body>
        <Header />
        <MainMenuBar />
        <StyleSwitcher />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
