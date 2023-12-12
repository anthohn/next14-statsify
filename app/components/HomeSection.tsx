
'use client'
import HomeButton  from "@/app/components/HomeButton";

export default function HomeSection() {
    
    return (
        <>
            <div className="bg-neutral-50 flex flex-col items-center w-4/6 mx-auto h-96 rounded-2xl m-4 shadow-2xl">
                <h1 className="text-4xl mt-20 font-medium">Personal Spotify Statistics</h1>
                <HomeButton />
            </div>
        </>
    )
}