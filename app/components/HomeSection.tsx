
'use client'
import HomeButton  from "@/app/components/HomeButton";

export default function HomeSection() {
    
    return (
        <>
            <div className="flex flex-col items-center justify-center h-96 w-4/6 mx-auto mt-32 bg-neutral-50 rounded-2xl shadow-2xl">
                <h1 className="text-4xl font-medium text-center">Personal Spotify Statistics</h1>
                <HomeButton />
            </div>
        </>
    )
}