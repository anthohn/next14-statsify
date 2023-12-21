import { TopTrack } from '@/types';
import Image from 'next/image';

interface TracksProps {
    topTracks: TopTrack[];
}


export default function Tracks({ topTracks} : TracksProps) {

    return (
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
    )

}