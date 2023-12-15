'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { Artist } from '@/types';

// Définition du type pour timeRange
type TimeRange = 'short_term' | 'medium_term' | 'long_term';

const TopArtists: React.FC = () => {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState('short_term');

 // Mapping des descriptions de timeRange
 const timeRangeDescriptions: { [key in TimeRange]: string } = {
  'short_term': 'last 4 weeks',
  'medium_term': 'last 6 months',
  'long_term': 'all time'
};

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
      <div className="text-center text-3xl font-medium p-4 mx-auto w-8/12 md:mt-40 ">
        <p>Top Artists </p>
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

      <div className="flex flex-wrap justify-center">
        {topArtists.map((artist, index) => (
          <a href={artist.external_urls.spotify} key={artist.id} className="flex justify-center bg-white/70 shadow-2xl hover:scale-105 transition w-1/4 mx-6 mb-6 h-52 rounded-xl flex-col space-y-4 items-center"> 
              <Image src={artist.images[0]?.url} alt={artist.name} width={100} height={100} style={{ width: 'auto', height: 'auto'}} className="rounded-xl" />
              <p className="text-base font-bold line-clamp-1 mx-2">{index + 1}. {artist.name}</p>
          </a>
        ))}
      </div>
    </>
  );
}
export default TopArtists;
