'use client'
import { useState } from 'react';
import { TopTrack } from '@/types';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface TracksProps {
  topTracks: TopTrack[];
  rankingData: Array<{
    trackId: string;
    history: Array<{ date: Date; rank: number }>;
  }>;
}

export default function Tracks({ topTracks, rankingData }: TracksProps) {
  const [selectedTrack, setSelectedTrack] = useState<TopTrack | null>(null);

  // Function to prepare the chart data
  const getChartData = (history: Array<{ date: Date; rank: number }>) => {
    return {
      labels: history.map((h) => h.date.toLocaleDateString()), // Convert dates to strings for labels
      datasets: [
        {
          label: 'Ranking',
          data: history.map((h) => h.rank), // Use ranking for the data
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };
//   chart data options
  const getChartOptions = () => {
    return {
      scales: {
        y: {
          reverse: true, // Cela inverse l'axe des y
          beginAtZero: false, // Démarre l'échelle à la première valeur si vous ne voulez pas qu'elle commence à zéro
          title: {
            display: true,
            text: 'Rank'
          },
          ticks: {
            stepSize: 10, // Définit un pas fixe entre les graduations
            // Affiche seulement les ticks aux valeurs définies
            callback: function(value: number | string, index: number, values: any[]) {
              // On utilise un ensemble de valeurs prédéfinies pour les graduations
              const allowedTicks = [1, 10, 20, 30, 40, 50];
              if (allowedTicks.includes(Number(value))) {
                return 'Rank ' + value;
              }
            }
          },
          // Pour vous assurer que l'axe des y inclut 1 et 50, vous pouvez définir les limites min et max
          min: 1,
          max: 50,
        }
      },
      // Vous pouvez également ajouter d'autres options de configuration ici
      plugins: {
        legend: {
          display: false // Cache la légende si vous n'en avez pas besoin
        }
      }
    };
  };

  // Function to open the modal and set the selected track
  const openModal = (track: TopTrack) => {
    setSelectedTrack(track);
    document.body.style.overflow = 'hidden'; // Prevent page scrolling when modal is open
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedTrack(null);
    document.body.style.overflow = 'auto'; // Restore page scrolling when modal is closed
  };

  // Find the ranking history for the selected track
  const selectedTrackHistory = selectedTrack 
    ? rankingData.find((data) => data.trackId === selectedTrack.id)?.history
    : null;

  return (
    <div className="flex flex-col md:mt-40">
      {topTracks.map((topTrack, index) => (
        
        <div
          key={topTrack.id}
          onClick={() => openModal(topTrack)}
          className="flex bg-white/70 shadow-2xl hover:scale-105 transition w-full mb-4 h-16 rounded-2xl space-x-4 items-center px-6 cursor-pointer"
        >
          <p className="text-xl font-bold">{index + 1}.</p>
          <Image
            src={topTrack.album.images[0]?.url}
            alt={topTrack.name}
            className="rounded-xl"
            priority={true}
            width={45}
            height={45}
            style={{ width: 45, height: 'auto' }}
          />
          <p className="text-xl font-bold line-clamp-1"> {topTrack.name}</p>
          <p className="text-sm text-gray-600">
            by {topTrack.artists.map((artist) => artist.name).join(', ')}
          </p>
        </div>
        
      ))}
      {selectedTrack && selectedTrackHistory && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl h-3/4 flex flex-col justify-between">
            <div className='flex flex-col items-center'>
              <h2 className="text-2xl font-bold">Ranking History</h2>
              <p className="text-xl">{selectedTrack.name}</p>
            </div>
            <div className="w-full h-3/4">
              {/* Chart.js graph integration */}
              <Line data={getChartData(selectedTrackHistory)} options={getChartOptions()} />
            </div>
            <div className='flex justify-end'>
              <button
                onClick={closeModal}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-4 w-32 rounded-xl  transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
