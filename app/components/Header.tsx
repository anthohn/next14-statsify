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
  const userProfileImage = session?.user?.image;

  if (session) {
    return (
      <>
        <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm rounded-full md:me-0 " type="button">
          <span className="sr-only">Open user menu</span>
          {userProfileImage ? (
              <Image
                  className="w-8 h-8 p-[3px] bg-green-500 rounded-full"
                  src={userProfileImage} 
                  alt="Photo de profil" 
                  width={50}
                  height={50}
              />
              ):(
                  <Image
                  className="w-8 h-8 p-1 bg-green-500 rounded-full"
                  src="/profil"
                  alt="Photo de profil" 
                  width={50}
                  height={50}
              />
          )}
        </button>
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
    <nav className="z-[99] border md:fixed bg-white md:left-1/2 md:-translate-x-1/2 md:mx-auto md:rounded-2xl shadow-2xl md:w-11/12 max-w-screen-xl md:my-4 mx-auto sm:px-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link 
          className="flex items-center space-x-3 rtl:space-x-reverse"
          href="/">
          <Image src={'/logo.png'} width={100} height={100} style={{ width: 30, height: 'auto'}} alt="logo" className="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Statsify</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <Link 
              className={`link ${pathname.startsWith('/top-artists/') ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkclassNamees}`} 
              href="/top-artists/short_term">
              Top Artists
            </Link>
            <Link 
              className={`link ${pathname.startsWith('/top-tracks/') ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkclassNamees}`} 
              href="/top-tracks/short_term">
              Top Tracks
            </Link>
            <Link 
              className={`link ${pathname === '/recently-played' ? 'bg-green-600 text-white py-2 px-4 rounded-2xl' : linkclassNamees}`} 
              href="/recently-played">
              Recently Played
            </Link>
            <AuthButton />            
            <div id="dropdownAvatar" className="z-10 hidden border bg-white rounded-2xl w-48 shadow-2xl">
              <ul className="py-1 text-[13px] text-neutral-800 font-semibold" aria-labelledby="dropdownUserAvatarButton">
                <li className="flex justify-between hover:bg-neutral-200 mx-1 items-center px-4 rounded-t-2xl">
                    <a href="https://www.spotify.com/account" className="block py-2">Compte</a>
                    <svg data-encore-id="icon" role="img" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z"></path><path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z"></path></svg>
                </li>
                <hr className="h-px bg-neutral-200 border-0 mx-1"></hr>
                <li>
                    <a className="block px-4 py-2 hover:bg-neutral-200 rounded-b-2xl mx-1" onClick={() => signOut()}>Déconnexion</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}