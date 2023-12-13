'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';

// Définition du type pour un artiste
interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
}

function TopTracks() {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState<Artist[]>([]); // Utiliser le type Artist ici
  const [timeRange, setTimeRange] = useState('short_term'); // short_term, medium_term, long_term

  useEffect(() => {
    const getTopArtists = async () => {
      if (!session || !session.accessToken) {
        console.log("L'utilisateur n'est pas connecté");
        return;
      }

      const token = session.accessToken;

      try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=30`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        setTopArtists(data.items);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    getTopArtists();
  }, [session, timeRange]);

  return (
    <>
      <h1 className="text-center text-3xl font-medium p-4 mx-auto w-6/12 sm:mt-40">Top Artists (Last 4 weeks)</h1>
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

      <div className="flex flex-wrap justify-center">
        {topArtists.map((artist: Artist) => (
          <div key={artist.id} className="flex justify-center bg-white/70 shadow-2xl hover:scale-105 transition w-80 m-8 h-80 rounded-xl flex-col space-y-4 items-center"> 
              <Image src={artist.images[0]?.url} alt={artist.name} width={224} height={224} className="rounded-xl" />
              <p className="text-xl font-bold">{artist.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopTracks;
