import getTopArtists from "@/actions/getTopArtists";
import Image from "next/image";

export default async function TopArtistsPage() {
  const timeRange = 'medium_term';
  const topArtists = await getTopArtists(timeRange);

  return (
  <>
    <title>Top Artists - Statsify</title>
    <h1 className="text-center text-3xl font-medium p-4 mx-auto w-6/12 sm:mt-40">Top Artists (last 4 weeks)</h1>
    <div className="flex flex-wrap justify-center md:mt-40">
      {topArtists.map((topArtist, index) => (
          <a href={topArtist.external_urls.spotify} target="_blank" key={topArtist.id} className="flex justify-center bg-white/70 shadow-2xl hover:scale-105 transition w-1/4 mx-6 mb-6 h-52 rounded-xl flex-col space-y-4 items-center"> 
              <Image src={topArtist.images[0]?.url} alt={topArtist.name} width={100} height={100} priority={true} style={{ width: 'auto', height: 'auto'}} className="rounded-xl" />
              <p className="text-base font-bold line-clamp-1 mx-2">{index + 1}. {topArtist.name}</p>
          </a>
        ))}
    </div>
  </>
  )
}

