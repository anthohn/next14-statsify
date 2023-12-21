import getTopTracks from "@/actions/getTopTracks";
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth.js";
import Tracks from '@/app/top-tracks/[slug]/tracks'

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
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Définir l'heure au début de la journée

  topTracks.map(async (topTrack, index) => {
  // L'index commence à 0, donc ajoutez 1 pour commencer le classement à 1
    const ranking = index + 1;

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
        userId: userId, // Vérifiez l'utilisateur
        AND: [
          { trackId: topTrack.id }, // Vérifiez le trackId spécifique
          { rankingType: timeRange } // Vérifiez le timeRange spécifique
        ]
      },
    });

  if (!existingUserTrack) {
    // Créez une relation utilisateur-piste dans la table userTrack
    const userTrack = await prisma.userTrack.create({
      data: {
        userId: userId,
        trackId: topTrack.id,
        ranking: ranking,
        rankingType: timeRange, // Utilisez une valeur appropriée
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

      <Tracks topTracks={topTracks} />
    </>
  );
}
