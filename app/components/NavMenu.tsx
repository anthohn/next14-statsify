"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession  } from "next-auth/react";


function AuthButton() {
    const { data: session } = useSession();
  
    if (session) {
      return (
        <>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
    return (
      <>
        <button onClick={() => signIn("spotify")}>Sign in</button>
      </>
    );
  }


  
  export default function NavMenu() {
    const pathname = usePathname()
    return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link className={`link ${pathname === '/' ? 'bg-red-500' : ''}`} href="/">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Stats for spotify</span>
            </Link>
            <Link href="/">
                {/* <img src="" className="h-8" alt="Flowbite Logo" /> */}
                
            </Link>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <Link className={`link ${pathname === '/TopTracks' ? 'bg-red-500' : ''}`} href="/TopTracks">Top Tracks</Link>
                </li>
                <li>
                    <Link className={`link ${pathname === '/TopArtists' ? 'bg-red-500' : ''}`} href="/TopArtists">Top Artists</Link>
                </li>
                <li>
                    <Link className={`link ${pathname === '/TopGenres' ? 'bg-red-500' : ''}`} href="/TopGenres">Top Genres</Link>
                </li>
                <li>
                    <Link className={`link ${pathname === '/RecentlyPlayed' ? 'bg-red-500' : ''}`} href="/RecentlyPlayed">Recently Played</Link>
                </li>
                <AuthButton />
                </ul>
            </div>
            </div>
        </nav>
    );
  }