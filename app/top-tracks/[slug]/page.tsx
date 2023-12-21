import getTopTracks from "@/actions/getTopTracks";
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { TopTrack } from '@/types'
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth.js";


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
  
  console.log(timeRange)
  const prisma = new PrismaClient();

  const name = session.user.name
  const userId = session.user.id

  // Vérifiez d'abord si l'utilisateur existe déjà dans la base de données
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // Si l'utilisateur n'existe pas, créez-le
  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: userId,
        name: name,
      },
    });
}

  topTracks.map(async topTrack => {

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Définir l'heure au début de la journée

    // Vérifiez d'abord si la piste existe déjà pour éviter les doublons
    let track = await prisma.track.findUnique({
      where: { id: topTrack.id },
    });
  
    if (!track) {
      track = await prisma.track.create({
        data: {
          id: topTrack.id,
          // Autres champs nécessaires pour une piste
        },
      });
    }
  
    // Vérifier si un enregistrement existe déjà pour aujourd'hui
    const existingUserTrack = await prisma.userTrack.findFirst({
      where: {
        userId: userId, // Check for the specific user
        trackId: topTrack.id, // Check for the specific track
        date: {
          gte: today, // The date should be greater than or equal to the start of today
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // But less than tomorrow (today + 1 day)
        },
      },
    });

  if (!existingUserTrack) {
    // Créez une relation utilisateur-piste dans la table userTrack
    const userTrack = await prisma.userTrack.create({
      data: {
        userId: userId,
        trackId: topTrack.id,
        ranking: 2,
        rankingType: 'FOUR_WEEKS', // Utilisez une valeur appropriée
        date: new Date(), // La date actuelle
      },
    });

    return { track, userTrack };
  } else {
    return { track, userTrack: existingUserTrack };
  }
});




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
