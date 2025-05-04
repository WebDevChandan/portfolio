import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Header, MainMenuBar, Sidebar, StyleSwitcher } from './components';
import './styles/globals.scss';
import { raleway } from '../lib/font';

export const metadata: Metadata = {
  title: 'WebDevChandan | Portfolio',
  description: 'Software Developer | Frontend Enginner',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const previousThemeMode = (await cookies()).get("theme")?.value;
  const previousThemeColor = (await cookies()).get("themeColor")?.value;

  return (
    <html lang="en" data-theme={previousThemeMode ? previousThemeMode : "light"}>
      <body className={`${raleway.className} ${previousThemeColor ? previousThemeColor : ""}`}>
        <Header />
        <MainMenuBar />
        <Sidebar />
        <StyleSwitcher />
        {children}
      </body >
    </html >
  )
}
