"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";
import { Artist } from "@/types";

const getTopArtists = async (timeRange: string = 'short_term', artistLimit: string = '30'): Promise<Artist[]> => {
    
  const userSession  = await getServerSession(authOptions);
  const token = userSession .accessToken

  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${artistLimit}&time_range=${timeRange}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  return (data.items as any) || [];

};
export default getTopArtists;