"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useEffect } from "react";
import { signIn, signOut, useSession  } from "next-auth/react";
import { initFlowbite } from "flowbite";

const logclassNamees = "transition bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-2xl";


function AuthButton() {
    const { data: session } = useSession();
  
    if (session) {
      return (
        <>
          <button className={logclassNamees} onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
    return (
      <>
        <button className={logclassNamees} onClick={() => signIn("spotify")}>Sign in</button>
      </>
    );
  }
  
  export default function Header() {
    useEffect(() => {
      initFlowbite();
    }, []);
    const linkclassNamees = "transition hover:bg-green-600 hover:text-white py-2 px-4 rounded-2xl";

    const pathname = usePathname()
    return (
      <nav className="z-[999] md:fixed md:left-1/2 md:-translate-x-1/2 md:mx-auto md:rounded-2xl lg:px-8 md:w-11/12 shadow-2xl md:my-4 bg-white max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link className={`link ${pathname === '/' ? '' : ''}`} href="/">
          <span className="self-center text-2xl md:text-xl lg:text-2xl font-semibold whitespace-nowrap">Statsify</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-md text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full items-center space-x-2 lg:space-x-4 md:justify-center md:space-y-0 md:block md:w-auto" id="navbar-default">
          <Link 
            className={`link ${pathname === '/TopArtists' ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkclassNamees}`} 
            href="/TopArtists">
            Top Artists
          </Link>
          <Link 
            className={`link ${pathname === '/TopTracks' ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkclassNamees}`} 
            href="/TopTracks">
            Top Tracks
          </Link>
          <Link 
            className={`link ${pathname === '/RecentlyPlayed' ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkclassNamees}`} 
            href="/RecentlyPlayed">
            Recently Played
          </Link>
          <AuthButton />
        </div>
    </nav>

    );
  }