'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { RecentlyPlayedTrack, Artist } from "@/types";

const RecentlyPlayedTracks: React.FC = () => {
  
  const { data: session } = useSession();
  const [recentTracks, setRecentTracks] = useState<RecentlyPlayedTrack[]>([]);

  useEffect(() => {
    const getRecentlyPlayedTracks = async () => {
      if (!session || !session.accessToken) {
        console.log("L'utilisateur n'est pas connecté");
        return;
      }

      const token = session.accessToken;
      try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=30`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setRecentTracks(data.items);
      } catch (error) {
        console.error("Error fetching recently played tracks:", error);
      }
    };

    getRecentlyPlayedTracks();
  }, [session]);

  return (
    <>
    <h1 className="text-center text-3xl font-medium p-4 mx-auto w-6/12 sm:mt-40">Recently Played Tracks</h1>
    <div className="flex flex-col">
      {recentTracks.map((RecentlyPlayedTrack, played_at ) => (
        <a href={RecentlyPlayedTrack.track.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={`${RecentlyPlayedTrack.track.id}-${played_at}`} className="flex justify-between bg-white/70 shadow-2xl hover:scale-105 transition w-full mb-4 h-16 rounded-2xl items-center sm:px-4 px-2 space-x-2 sm:space-x-12"> 
          <Image src={RecentlyPlayedTrack.track.album.images[0]?.url} alt={RecentlyPlayedTrack.track.name} className="rounded-xl" width={45} height={45}  />
          <p className="w-5/12 sm:text-xl font-bold line-clamp-1"> {RecentlyPlayedTrack.track.name}</p>
          <p className="w-4/12 text-sm text-gray-600 line-clamp-1"> {RecentlyPlayedTrack.track.artists.map((artist: Artist) => artist.name).join(', ')}</p>
          <p className="w-3/12  text-gray-600 text-xs">{formatDistanceToNow(new Date(played_at))} ago</p>
        </a>
      ))}
    </div>
  </>
  );
}
export default RecentlyPlayedTracks;