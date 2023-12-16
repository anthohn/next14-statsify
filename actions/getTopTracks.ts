"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";
import { TopTrack } from "@/types";

const getTopTracks = async (timeRange: string = 'short_term', trackLimit: string = '30'): Promise<TopTrack[]> => {
    
  const userSession  = await getServerSession(authOptions);
  const token = userSession .accessToken

  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${trackLimit}&time_range=${timeRange}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  return (data.items as any) || [];

};
export default getTopTracks;