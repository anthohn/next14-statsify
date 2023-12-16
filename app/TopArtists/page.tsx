import getTopArtists from "@/actions/getTopArtists";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TopArtistsPage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin')    
  }

  const topArtists = await getTopArtists();

  return (
  <>
    <title>Top Artists - Statsify</title>
    <h1 className="text-center text-4xl font-semibold p-4 mx-auto mt-12 sm:mt-40">Top Artists (last 4 weeks)</h1>
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

