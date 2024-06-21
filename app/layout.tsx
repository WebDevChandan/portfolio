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
      <body className='dark color-3'>
        <Header />
        <MainMenuBar />
        <StyleSwitcher />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
