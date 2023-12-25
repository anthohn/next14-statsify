
import HomeButton  from "@/app/components/HomeButton";

export default async function HomeSection() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full mx-auto mt-12 sm:mt-44 py-12 bg-neutral-50/70 rounded-2xl shadow-2xl ">
        <h1 className="text-4xl mb-6 font-semibold text-center">Personal Spotify Statistics</h1>
        <HomeButton />
      </div>
      <div className="felx flex-col space-y-8 m-6 sm:mx-auto pb-48">
        <div className="flex space-x-10 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"  viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/></svg>            
          <div className="felx flex-col space-y-4 max-w-xs">
            <h1 className="text-3xl font-semibold">Your artists stats</h1>
            <p>View your most listened artists.</p>
          </div>
        </div>

        <div className="flex space-x-10 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16"><path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2"/><path fillRule="evenodd" d="M12 3v10h-1V3z"/><path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z"/><path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"/></svg>
          <div className="felx flex-col space-y-4 max-w-xs">
            <h1 className="text-3xl font-semibold">Your tracks stats</h1>
            <p>View your most listened tracks.</p>
          </div>
        </div>

        <div className="flex mx-auto space-x-10 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5"/></svg>
          <div className="felx flex-col space-y-4 max-w-xs">
            <h1 className="text-3xl font-semibold">Recently played tracks</h1>
            <p className="max-w-xs">Check out your recently played tracks.</p>
          </div>
        </div>
      </div>
    </>
  )
}