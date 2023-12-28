import getTopArtists from "@/actions/getTopArtists";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { authOptions } from "@/lib/auth.js";
import Artists from '@/app/top-artists/[slug]/artists'
import { db } from "@/lib/db"

export default async function TopArtistsPage({params} : {params : { slug: string }}) {

  const session = await getServerSession(authOptions);
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

  // get name and userId
  const name = session.user.name
  const userId = session.user.id

  // check if user exist, if not create in prisma
  const existingUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    await db.user.create({
      data: {
        id: userId,
        name: name,
      },
    });
  }

  // set utc hours today
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); 

  // Vérifier si les données existent déjà pour cet utilisateur et cette date
  const dataExists = await db.userArtist.count({
    where: {
      userId: userId,
      date: today,
      rankingType: timeRange,
    },
  }) > 0

  if (!dataExists) {

    topArtists.map(async (topArtist, index) => {
      const ranking = index + 1;

      let artist = await db.artist.findUnique({
        where: { id: topArtist.id },
      });
    
      if (!artist) {
        artist = await db.artist.create({
          data: {
            id: topArtist.id,
          },
        });
      }

      await db.userArtist.create({
        data: {
          userId: userId,
          artistId: topArtist.id,
          ranking: ranking,
          rankingType: timeRange,
          date: today,
        },
      });
    });  
  }

  // Récupére les données de classement pour chaque musique
  const rankingData = await Promise.all(topArtists.map(async (artist) => {
    const rankings = await db.userArtist.findMany({
      where: {
        artistId: artist.id,
        rankingType: timeRange, // Filter by the current time range
      },
      orderBy: {
        date: 'asc',
      },
    });

    const history = rankings.map(r => ({
      date: r.date,
      rank: r.ranking
    }));

    return {
      artistId: artist.id,
      history: history,
    };
  }));

  return (
  <>  
    <title>Top Artists - Statsify</title>
    <h1 className="text-center text-4xl font-semibold p-4 mx-auto mt-12 sm:mt-40">Top Artists ({timeRangeDescriptions[timeRange as keyof typeof timeRangeDescriptions] || timeRange})</h1>
    <div className="flex flex-col sm:flex-row justify-between text-center mb-4">
      <Link className="sm:w-4/12 rounded-lg p-2 bg-white m-1" href="/top-artists/short_term">Last 4 weeks</Link>
      <Link className="sm:w-4/12 rounded-lg p-2 bg-white m-1" href="/top-artists/medium_term">Last 6 months</Link>
      <Link className="sm:w-4/12 rounded-lg p-2 bg-white m-1" href="/top-artists/long_term">All time</Link>
    </div> 
    <Artists topArtists={topArtists} rankingData={rankingData} />    
  </>
  )
}

