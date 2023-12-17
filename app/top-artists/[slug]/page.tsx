import getTopArtists from "@/actions/getTopArtists";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default async function TopArtistsPage({params} : {params : { slug: string }}) {

  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin')    
  }

  const timeRange = params.slug
  const topArtists = await getTopArtists(timeRange);

  const timeRangeDescriptions = {
    'short_term': 'last 4 weeks',
    'medium_term': 'last 6 months',
    'long_term': 'all time'
  };

  return (
  <>  
    <title>Top Artists - Statsify</title>
    <h1 className="text-center text-4xl font-semibold p-4 mx-auto mt-12 sm:mt-40">Top Artists ({timeRangeDescriptions[timeRange as keyof typeof timeRangeDescriptions] || timeRange})</h1>
    <div className="flex justify-between text-center mb-4">
      <Link className="w-4/12 rounded-lg p-2 bg-white m-1" href="/top-artists/short_term">Last 4 weeks</Link>
      <Link className="w-4/12 rounded-lg p-2 bg-white m-1" href="/top-artists/medium_term">Last 6 months</Link>
      <Link className="w-4/12 rounded-lg p-2 bg-white m-1" href="/top-artists/long_term">All time</Link>
    </div> 

    <div className="flex flex-wrap md:mt-40 justify-center">
      {topArtists.map((topArtist, index) => (
          <a href={topArtist.external_urls.spotify} target="_blank" key={topArtist.id} className="flex justify-center bg-white/70 shadow-2xl hover:scale-105 transition w-60 mx-6 mb-6 h-64 rounded-xl flex-col space-y-4 items-center"> 
              <Image src={topArtist.images[0]?.url} alt={topArtist.name} priority={true} width={150} height={150} style={{ width: 150, height: 'auto'}} className="rounded-xl" />
              <p className="text-base font-bold line-clamp-1 mx-2">{index + 1}. {topArtist.name}</p>
          </a>
        ))}
    </div>
  </>
  )
}

