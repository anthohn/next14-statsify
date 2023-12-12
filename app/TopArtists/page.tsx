'use client'
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function TopTracks() {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const getTopArtists = async () => {
      if (!session) {
        console.log("L'utilisateur n'est pas connecté");
        return;
      }

      const token = session.accessToken; // Utilisez le token de la session

      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Top Artists data:", data);
        setTopArtists(data.items); // Mettre à jour l'état avec les artistes top
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    getTopArtists();
  }, [session]); // Déclenchez l'effet lors du changement de la session

  return (
    <div className="mt-40">
      <h1 className="text-center text-3xl font-medium p-4 mx-auto w-6/12">Top Artists (Last 4 weeks)</h1>

      <div className="flex flex-wrap justify-center">
        {topArtists.map((artist, index) => (
          <a key={artist.id} className="flex justify-center"> 
            <div className="shadow-2xl hover:scale-105 transition w-80 m-8 h-80 rounded-xl flex flex-col space-y-4 items-center justify-center">
              <img src={artist.images[0]?.url} alt={artist.name} className="w-56 h-56 rounded-xl" />
              <p className="text-xl font-bold">{index + 1}. {artist.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
  
}

export default TopTracks;
