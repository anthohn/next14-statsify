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
    <div>
      <h2>Top Artists</h2>
      <ul>
        {topArtists.map((artist) => (
          <a key={artist.id}>
            <div>
              <img src={artist.images[0]?.url} alt={artist.name} style={{ width: "50px", height: "50px" }} />
              <div>{artist.name}</div>
            </div>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default TopTracks;
