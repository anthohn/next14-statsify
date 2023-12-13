'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';

// Définition des types pour les pistes et les artistes
interface Artist {
  name: string;
}

interface Track {
  id: string;
  name: string;
  album: {
    images: Array<{ url: string }>;
  };
  artists: Artist[];
}

function TopTracks() {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState<Track[]>([]); // Utilisation du type Track ici
  const [timeRange, setTimeRange] = useState('short_term'); // short_term, medium_term, long_term

  useEffect(() => {
    const getTopTracks = async () => {
      if (!session || !session.accessToken) {
        console.log("L'utilisateur n'est pas connecté");
        return;
      }

      const token = session.accessToken;

      try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=30`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        setTopTracks(data.items);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    getTopTracks();
  }, [session, timeRange]);

  return (
    <>
      <h1 className="text-center text-3xl font-medium p-4 mx-auto w-6/12 sm:mt-40">Top Tracks</h1>
      <div className="flex justify-between text-center mb-4">
        <button onClick={() => setTimeRange('short_term')} className="w-4/12 rounded-lg p-2 bg-white m-1">
          Last 4 weeks
        </button>
        <button onClick={() => setTimeRange('medium_term')} className="w-4/12 rounded-lg p-2 bg-white m-1">
          Last 6 months
        </button>
        <button onClick={() => setTimeRange('long_term')} className="w-4/12 rounded-lg p-2 bg-white m-1">
          All time
        </button>
      </div> 

      <div className="flex flex-col">
        {topTracks.map((track: Track, index) => (
          <div key={track.id} className="flex bg-white/70 shadow-2xl hover:scale-105 transition w-full m-2 h-16 rounded-2xl space-x-4 items-center px-6"> 
              <p className="text-xl font-bold">{index + 1}.</p>
              <Image src={track.album.images[0]?.url} alt={track.name} className="rounded-xl" width={45} height={45}  />

              <p className="text-xl font-bold"> {track.name}</p>
              <p className="text-sm text-gray-600">by {track.artists.map((artist: Artist) => artist.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopTracks;
