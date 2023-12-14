import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';

import SessionProvider  from './components/SessionProvider';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify stats',
  description: 'Spotify personnal statistics',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true} className={inter.className}>
      <div className="bg-blue-200 absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#963e3e]"></div>
      <div className="bg-green-200 absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#b1a5a5]"></div>

        <SessionProvider session={session}>
            <Header />
            <main className='flex flex-col space-y-6 mx-auto max-w-3xl'>
              {children}
            </main>
        </SessionProvider>
      </body>
    </html>
  );
}