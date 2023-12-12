"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession  } from "next-auth/react";

const logClasses = "transition bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-2xl";


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
        <button className={logClasses} onClick={() => signIn("spotify")}>Sign in</button>
      </>
    );
  }
  
  export default function Header() {
    const linkClasses = "transition hover:bg-green-600 hover:text-white py-2 px-4 rounded-2xl";

    const pathname = usePathname()
    return (
        <nav className="z-[999] fixed left-1/2 -translate-x-1/2 bg-white border-gray-200 mx-auto border-b rounded-2xl my-4 px-3 shadow-2xl w-10/12">
          <div className="flex max-w-screen-xl items-center justify-between mx-auto p-4">
            <Link className={`link ${pathname === '/' ? '' : ''}`} href="/">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Stats for spotify</span>
            </Link>
            <Link 
              className={`link ${pathname === '/TopTracks' ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkClasses}`} 
              href="/TopTracks">
              Top Tracks
            </Link>
            <Link 
              className={`link ${pathname === '/TopArtists' ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkClasses}`} 
              href="/TopArtists">
              Top Artists
            </Link>
            <Link 
              className={`link ${pathname === '/RecentlyPlayed' ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkClasses}`} 
              href="/RecentlyPlayed">
              Recently Played
            </Link>
            <AuthButton />
          </div>
        </nav>
    );
  }