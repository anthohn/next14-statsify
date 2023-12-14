
'use client'
import { useSession  } from "next-auth/react";
import HomeButton  from "@/app/components/HomeButton";
import LoggedBoxes from "./LoggedBoxes";

export default function HomeSection() {
    const { data: session } = useSession();

    if (!session) {
        return (
          <>
           <div className="flex flex-col items-center justify-center w-full mx-auto mt-28 p-4 bg-neutral-50/70 rounded-2xl shadow-2xl">
                <h1 className="text-3xl m-6 font-medium text-center">Personal Spotify Statistics</h1>
                <HomeButton />
            </div>
          </>
        );
      }
      return (
        <>
            <div className="flex flex-col items-center justify-center w-full mx-auto mt-28 p-4 bg-neutral-50/70 rounded-2xl shadow-2xl">
                <h1 className="text-3xl m-6 font-medium text-center">Personal Spotify Statistics</h1>
                <HomeButton />
            </div>
            <LoggedBoxes />
        </>
    )
}