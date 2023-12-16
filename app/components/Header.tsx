"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useEffect } from "react";
import { signIn, signOut, useSession  } from "next-auth/react";
import { initFlowbite } from "flowbite";
import Image from "next/image";

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
    <nav className="z-[999] md:fixed bg-white md:left-1/2 md:-translate-x-1/2 md:mx-auto md:rounded-2xl shadow-2xl md:w-11/12 max-w-screen-xl md:my-4 mx-auto sm:px-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link 
          className="flex items-center space-x-3 rtl:space-x-reverse"
          href="/">
          <Image src={'/logo.png'} width={100} height={100} style={{ width: 30, height: 'auto'}} alt="logo" className="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Statsify</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}