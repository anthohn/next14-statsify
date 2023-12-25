'use client'
import { signIn, useSession  } from "next-auth/react";
import Link from "next/link";

export default function HomeButton() {
    const { data: session } = useSession();
    const linkClasses = "sm:w-1/3 w-full hover:scale-105 transition bg-green-600 text-white text-base md:text-lg font-semibold py-4 rounded-2xl hover:bg-green-700 shadow-2xl";
  
    if (!session) {
      return (
        <>
          <p className="mt-4">Please login with your spotify account, to see your track or artist ranking!</p>
          <button className="mt-4 bg-green-600 text-white py-2 px-3 rounded-2xl hover:bg-green-700 w-60" onClick={() => signIn("spotify")}>Login with Spotify</button>
        </>
      );
    }
    return (
      <>
        <div className="flex space-x-1">
          <p className="text-xl">Hi </p>
          <p className="text-xl font-bold">{session.user?.name} 👋</p>
        </div>
        <p className="mt-2 text-lg ">Choose what you want to see :</p>
        <div className="flex sm:flex-row flex-col w-10/12 sm:space-x-4 space-y-4 sm:space-y-0 m-4 text-center ">
          <Link className={linkClasses} href="/top-artists/short_term">Top Artists 👨‍🎤</Link>
          <Link className={linkClasses} href="/top-tracks/short_term">Top Tracks 🎵</Link>
          <Link className={linkClasses} href="/recently-played">Recent 🕐</Link>
        </div>
      </>
    )
}