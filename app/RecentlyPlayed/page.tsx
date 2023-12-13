'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


// types artists
interface Artist {
  name: string;
}

// types tracks
interface Track {
  track: {
    id: string;
    name: string;
    external_urls: {
      spotify: string; // URL de la piste sur Spotify
    };
    album: {
      images: Array<{ url: string }>;
    };
    artists: Artist[];
  };
  played_at: string;
}

function RecentlyPlayedTracks() {
  const { data: session } = useSession();
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);

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
      {recentTracks.map(({ track, played_at }) => (
        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={`${track.id}-${played_at}`} className="flex justify-between bg-white/70 shadow-2xl hover:scale-105 transition w-full mb-4 h-16 rounded-2xl items-center sm:px-4 px-2 space-x-2 sm:space-x-12"> 
          <Image src={track.album.images[0]?.url} alt={track.name} className="rounded-xl" width={45} height={45}  />
          <p className="w-1/2 sm:text-xl font-bold line-clamp-1"> {track.name}</p>
          <p className="w-1/2 text-sm text-gray-600 line-clamp-1"> {track.artists.map((artist: Artist) => artist.name).join(', ')}</p>
          <p className="text-sm text-gray-600">{formatDistanceToNow(new Date(played_at))} ago</p>
        </a>
      ))}
    </div>
  </>
  );
}

export default RecentlyPlayedTracks;
