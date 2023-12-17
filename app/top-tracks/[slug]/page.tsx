import getTopTracks from "@/actions/getTopTracks";
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default async function TopTracksPage({params} : {params : { slug: string }}) {

  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin')    
  }

  const timeRange = params.slug
  const topTracks = await getTopTracks(timeRange);

  const timeRangeDescriptions = {
    'short_term': 'last 4 weeks',
    'medium_term': 'last 6 months',
    'long_term': 'all time'
  };

  return (
    <>
      <title>Top Tracks - Statsify</title>
      <h1 className="text-center text-4xl font-semibold p-4 mx-auto mt-12 sm:mt-40">Top Tracks ({timeRangeDescriptions[timeRange as keyof typeof timeRangeDescriptions] || timeRange})</h1>
      <div className="flex justify-between text-center mb-4">
        <Link className="w-4/12 rounded-lg p-2 bg-white m-1" href="/top-tracks/short_term">Last 4 weeks</Link>
        <Link className="w-4/12 rounded-lg p-2 bg-white m-1" href="/top-tracks/medium_term">Last 6 months</Link>
        <Link className="w-4/12 rounded-lg p-2 bg-white m-1" href="/top-tracks/long_term">All time</Link>
      </div> 
      <div className="flex flex-col md:mt-40">
        {topTracks.map((topTrack, index) => (
          <a href={topTrack.external_urls.spotify} target="_blank" key={topTrack.id} className="flex bg-white/70 shadow-2xl hover:scale-105 transition w-full mb-4 h-16 rounded-2xl space-x-4 items-center px-6"> 
              <p className="text-xl font-bold">{index + 1}.</p>
              <Image src={topTrack.album.images[0]?.url} alt={topTrack.name} className="rounded-xl" priority={true} width={45} height={45} style={{ width: 45, height: 'auto'}}  />
              <p className="text-xl font-bold line-clamp-1"> {topTrack.name}</p>
              <p className="text-sm text-gray-600">by {topTrack.artists.map((artist) => artist.name).join(', ')}</p>
          </a>
        ))}
      </div>
    </>
  );
}
