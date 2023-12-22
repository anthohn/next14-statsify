'use client'
import { useState } from 'react';
import { Artist } from '@/types';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface ArtistsProps {
  topArtists: Artist[];
  rankingData: Array<{
    artistId: string;
    history: Array<{ date: Date; rank: number }>;
  }>;
}

export default function Artists({ topArtists, rankingData }: ArtistsProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

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
          reverse: true,
          beginAtZero: false,
          title: {
            display: true,
            text: 'Rank'
          },
          ticks: {
            stepSize: 10,
            callback: function(value: number | string, index: number, values: any[]) {
              const allowedTicks = [1, 10, 20, 30, 40, 50];
              if (allowedTicks.includes(Number(value))) {
                return 'Rank ' + value;
              }
            }
          },
          min: 1,
          max: 50,
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };
  };

  // Function open the modal and set the selected artist
  const openModal = (artist: Artist) => {
    setSelectedArtist(artist);
    document.body.style.overflow = 'hidden'; 
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedArtist(null);
    document.body.style.overflow = 'auto';
  };

  // Find the ranking history for the selected artist
  const selectedArtistHistory = selectedArtist
    ? rankingData.find((data) => data.artistId === selectedArtist.id)?.history
    : null;

  return (
    <div className="flex flex-wrap md:mt-40 justify-center">
      {topArtists.map((topArtist, index) => (
          <div 
            key={topArtist.id} 
            onClick={() => openModal(topArtist)}
            className="flex justify-center bg-white/70 shadow-2xl hover:scale-105 transition w-60 mx-6 mb-6 h-64 rounded-xl flex-col space-y-4 items-center"
          > 
              <Image 
                src={topArtist.images[0]?.url} 
                alt={topArtist.name}
                className="rounded-xl"
                priority={true} 
                width={150} 
                height={150} 
                style={{ width: 150, height: 'auto'}}
              />
              <p className="text-base font-bold line-clamp-1 mx-2">{index + 1}. {topArtist.name}</p>
          </div>
        ))}
      {selectedArtist && selectedArtistHistory && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl h-3/4 flex flex-col justify-between">
            <div className='flex flex-col items-center'>
              <h2 className="text-2xl font-bold">Ranking History</h2>
              <p className="text-xl">{selectedArtist.name}</p>
            </div>
            <div className="w-full h-3/4">
              {/* Chart.js graph integration */}
              <Line data={getChartData(selectedArtistHistory)} options={getChartOptions()} />
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
