
import HomeButton  from "@/app/components/HomeButton";

export default async function HomeSection() {
    return (
      <>
        <div className="flex flex-col items-center justify-center w-full mx-auto mt-36 p-20 bg-neutral-50/70 rounded-2xl shadow-2xl">
          <h1 className="text-4xl mb-6 font-semibold text-center">Personal Spotify Statistics</h1>
          <HomeButton />
        </div>
        <div className="felx flex-col space-y-8 mx-auto">
          <div className="flex space-x-10 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
            <div className="felx flex-col space-y-4 max-w-xs">
              <h1 className="text-3xl font-semibold">Your own stats</h1>
              <p>View your most listened tracks, artists.</p>
            </div>
          </div>
          <div className="flex mx-auto space-x-10 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5"/></svg>
            <div className="felx flex-col space-y-4">
              <h1 className="text-3xl font-semibold">Recently played tracks</h1>
              <p className="max-w-xs">Check out your recently played tracks.</p>
            </div>
          </div>
        </div>
      </>
  )
}