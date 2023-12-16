"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";
import { RecentlyPlayedTrack  } from "@/types";

const getRecentlyPlayedTracks = async (): Promise<RecentlyPlayedTrack[]> => {
    
  const userSession  = await getServerSession(authOptions);
  const token = userSession .accessToken

  const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=30`, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  return (data.items as any) || [];

};
export default getRecentlyPlayedTracks;