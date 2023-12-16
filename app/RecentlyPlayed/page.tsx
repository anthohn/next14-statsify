import getRecentlyPlayedTracks from "@/actions/getRecentlyPlayedTracks";
import Image from 'next/image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Artist } from '@/types';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RecentlyPlayedTracksPage() {

  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin')    
  }

  const recentlyPlayedTracks = await getRecentlyPlayedTracks();

  return (
    <>
    <title>Recently Played - Statsify</title>
    <h1 className="text-center text-3xl font-medium p-4 mx-auto w-6/12 sm:mt-40">Recently Played Tracks</h1>
    <div className="flex flex-col">
      {recentlyPlayedTracks.map((recentlyPlayedTrack ) => (
        <a href={recentlyPlayedTrack.track.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={`${recentlyPlayedTrack.track.id}-${recentlyPlayedTrack.played_at}`} className="flex justify-between bg-white/70 shadow-2xl hover:scale-105 transition w-full mb-4 h-16 rounded-2xl items-center sm:px-4 px-2 space-x-2 sm:space-x-12"> 
          <Image src={recentlyPlayedTrack.track.album.images[0]?.url} alt={recentlyPlayedTrack.track.name} className="rounded-xl" width={45} height={45}  />
          <p className="w-5/12 sm:text-xl font-bold line-clamp-1"> {recentlyPlayedTrack.track.name}</p>
          <p className="w-4/12 text-sm text-gray-600 line-clamp-1"> {recentlyPlayedTrack.track.artists.map((artist: Artist) => artist.name).join(', ')}</p>
          <p className="w-3/12  text-gray-600 text-xs">{formatDistanceToNow(new Date(recentlyPlayedTrack.played_at))} ago</p>
        </a>
      ))}
    </div>
  </>
  );
}
