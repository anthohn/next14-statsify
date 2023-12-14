'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';

// types  artists
interface Artist {
  name: string;
}

// types tracks
interface Track {
  id: string;
  name: string;
  external_urls: {
    spotify: string; // URL de la piste sur Spotify
  };
  album: {
    images: Array<{ url: string }>;
  };
  artists: Artist[];
}

// Définition du type pour timeRange
type TimeRange = 'short_term' | 'medium_term' | 'long_term';


function TopTracks() {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState<Track[]>([]); // Utilisation du type Track ici
  const [timeRange, setTimeRange] = useState('short_term'); // short_term, medium_term, long_term

 // Mapping des descriptions de timeRange
 const timeRangeDescriptions: { [key in TimeRange]: string } = {
  'short_term': 'last 4 weeks',
  'medium_term': 'last 6 months',
  'long_term': 'all time'
};

  // Lorsque session ou timeRange change
  useEffect(() => {
    const getTopTracks = async () => {
      // vérification si il y'a bien une session et un token de session
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
      <div className="text-center text-3xl font-medium p-4 mx-auto w-8/12 md:mt-40 ">
        <p>Top Tracks</p>
        <p>({timeRangeDescriptions[timeRange as TimeRange]})</p>
      </div>
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
          <a href={track.external_urls.spotify} key={track.id} className="flex bg-white/70 shadow-2xl hover:scale-105 transition w-full mb-4 h-16 rounded-2xl space-x-4 items-center px-6"> 
              <p className="text-xl font-bold">{index + 1}.</p>
              <Image src={track.album.images[0]?.url} alt={track.name} className="rounded-xl" width={45} height={45}  />
              <p className="text-xl font-bold line-clamp-1"> {track.name}</p>
              <p className="text-sm text-gray-600">by {track.artists.map((artist: Artist) => artist.name).join(', ')}</p>
          </a>
        ))}
      </div>
    </>
  );
}

export default TopTracks;
