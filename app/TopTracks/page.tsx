import getTopTracks from "@/actions/getTopTracks";
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TopTracksPage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin')    
  }

  const topTracks = await getTopTracks();

  return (
    <>
      <title>Top Tracks - Statsify</title>
      <h1 className="text-center text-3xl font-medium p-4 mx-auto w-6/12 sm:mt-40">Top Tracks (last 4 weeks)</h1>
      <div className="flex flex-col md:mt-40">
        {topTracks.map((topTrack, index) => (
          <a href={topTrack.external_urls.spotify} target="_blank" key={topTrack.id} className="flex bg-white/70 shadow-2xl hover:scale-105 transition w-full mb-4 h-16 rounded-2xl space-x-4 items-center px-6"> 
              <p className="text-xl font-bold">{index + 1}.</p>
              <Image src={topTrack.album.images[0]?.url} alt={topTrack.name} className="rounded-xl" width={45} height={45}  />
              <p className="text-xl font-bold line-clamp-1"> {topTrack.name}</p>
              <p className="text-sm text-gray-600">by {topTrack.artists.map((artist) => artist.name).join(', ')}</p>
          </a>
        ))}
      </div>
    </>
  );
}
