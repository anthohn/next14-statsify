
import HomeButton  from "@/app/components/HomeButton";

export default async function HomeSection() {
    return (
      <>
          <div className="flex flex-col items-center justify-center w-full mx-auto mt-28 p-4 bg-neutral-50/70 rounded-2xl shadow-2xl">
              <h1 className="text-3xl m-6 font-medium text-center">Personal Spotify Statistics</h1>
              <HomeButton />
          </div>
      </>
  )
}