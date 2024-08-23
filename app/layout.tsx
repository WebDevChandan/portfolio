import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Header, MainMenuBar, Sidebar, StyleSwitcher } from './components';
import './styles/globals.scss';
import { raleway } from './server/font';

export const metadata: Metadata = {
  title: 'WebDevChandan | Portfolio',
  description: 'Rebuilding Personal Portfolio',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const previousThemeMode = cookies().get("theme")?.value;
  const previousThemeColor = cookies().get("themeColor")?.value;

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
