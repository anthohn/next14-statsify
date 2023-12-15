'use client';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from "next/link";
import { TopTrack, Artist } from "@/types";

const LoggedBoxes: React.FC = () => {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTrack, setTopTrack] = useState<TopTrack[]>([]);

  useEffect(() => {
      const getTopTrack = async () => {
          // vérification si il y'a bien une session et un token de session
          if (!session || !session.accessToken) {
              console.log("L'utilisateur n'est pas connecté");
              return;
          }
          const token = session.accessToken;

          try {
              const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=2`, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
              });

              const data = await response.json();
              setTopTrack(data.items);
          } catch (error) {
              console.error("Error fetching top tracks:", error);
          }
      };

      const getTopArtists = async () => {
          if (!session || !session.accessToken) {
            console.log("L'utilisateur n'est pas connecté");
            return;
          }
          const token = session.accessToken;
    
          try {
            const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=1`, {
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

      getTopTrack();
      getTopArtists();
  }, [session]);

  return (
      <>
          <div className=" bg-neutral-50/70 rounded-2xl p-8 shadow-2xl">
              <h1 className="flex justify-center text-2xl mb-8 font-medium">Your Recent Favorites</h1>
              <div className="flex space-x-6">
                  {topArtists.map((artist) => (
                      <Link href="/TopArtists" key={artist.id} className="flex flex-col w-3/12 space-y-2 bg-neutral-50 shadow-2xl  items-center justify-center rounded-xl hover:scale-105 transition"> 
                          <Image src={artist.images[0]?.url} alt={artist.name} className="rounded-full" width={100} height={100}  />
                          <p className="text-lg font-bold line-clamp-1">{artist.name}</p>
                      </Link>
                  ))}
                  <div className="flex flex-grow flex-col space-y-4">
                      {topTrack.map((track) => (
                          <Link href="/TopTracks" key={track.id} className="flex justify-between bg-neutral-50 shadow-2xl hover:scale-105 transition  h-16 rounded-2xl items-center sm:px-4 px-2 space-x-2 sm:space-x-12"> 
                              <Image src={track.album.images[0]?.url} alt={track.name} className="rounded-xl" width={45} height={45} style={{ width: 'auto', height: 'auto'}} priority={true} />
                              <p className="text-xl font-bold line-clamp-1"> {track.name}</p>
                              <p className="text-sm text-gray-600">by {track.artists.map((artist: Artist) => artist.name).join(', ')}</p>
                          </Link>
                      ))}
                  </div>
              </div>
          </div>
      </>
  )
}
export default LoggedBoxes;