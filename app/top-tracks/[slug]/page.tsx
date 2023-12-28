import getTopTracks from "@/actions/getTopTracks";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { authOptions } from "@/lib/auth.js";
import Tracks from '@/app/top-tracks/[slug]/tracks'
import { db } from "@/lib/db"

export default async function TopTracksPage({params} : {params : { slug: string }}) {

  const session = await getServerSession(authOptions);
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
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Vérifier si les données existent déjà pour cet utilisateur et cette date
  const dataExists = await db.userTrack.count({
    where: {
      userId: userId,
      date: today,
      rankingType: timeRange,
    },
  }) > 0


  if (!dataExists) {

    topTracks.map(async (topTrack, index) => {
      // L'index commence à 0, donc ajoutez 1 pour commencer le classement à 1
      const ranking = index + 1;

      // Vérifie d'abord si la piste existe déjà pour éviter les doublons
      let track = await db.track.findUnique({
        where: { id: topTrack.id },
      });
    
      if (!track) {
        track = await db.track.create({
          data: {
            id: topTrack.id,
          },
        });
      }
 
      // relation utilisateur-piste dans la table userTrack
      await db.userTrack.create({
        data: {
          userId: userId,
          trackId: topTrack.id,
          ranking: ranking,
          rankingType: timeRange,
          date: today,
        },
      });
    });
  }

  // Récupére les données de classement pour chaque musique
  const rankingData = await Promise.all(topTracks.map(async (track) => {
    const rankings = await db.userTrack.findMany({
      where: {
        trackId: track.id,
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
      trackId: track.id,
      history: history,
    };
  }));

  return (
    <>
      <title>Top Tracks - Statsify</title>
      <h1 className="text-center text-4xl font-semibold p-4 mx-auto mt-12 sm:mt-40 w-full">Top Tracks ({timeRangeDescriptions[timeRange as keyof typeof timeRangeDescriptions] || timeRange})</h1>
      <div className="flex flex-col sm:flex-row justify-between text-center mb-4">
        <Link className="sm:w-4/12 rounded-lg p-2 bg-white m-1" href="/top-tracks/short_term">Last 4 weeks</Link>
        <Link className="sm:w-4/12 rounded-lg p-2 bg-white m-1" href="/top-tracks/medium_term">Last 6 months</Link>
        <Link className="sm:w-4/12 rounded-lg p-2 bg-white m-1" href="/top-tracks/long_term">All time</Link>
      </div>
      <Tracks topTracks={topTracks} rankingData={rankingData} />
    </>
  );
}
