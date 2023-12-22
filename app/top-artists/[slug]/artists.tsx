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
                return value;
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
  // Si l'élément cliqué est la div de fond du modal ferme le modal
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
          className="flex justify-center bg-white/70 shadow-2xl hover:scale-105 transition w-60 mx-6 mb-6 h-64 rounded-xl flex-col space-y-4 items-center cursor-pointer"
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
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50" onClick={handleModalClick}>
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl flex flex-col justify-between">
            <div className='flex flex-col items-center'>
              <h2 className="text-2xl font-bold">Ranking History</h2>
              <p className="text-xl">{selectedArtist.name}</p>
            </div>
            <div className="w-full h-2/4">
              {/* Chart.js graph integration */}
              <Line data={getChartData(selectedArtistHistory)} options={getChartOptions()} />
            </div>
            <div className='flex justify-between items-center'>
              <a href={selectedArtist.external_urls.spotify} target="_blank" className="flex items-center bg-green-600 text-center hover:bg-green-700 text-white px-4 py-2 mt-4 w-32 rounded-xl  transition">
                <p>Open in</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="-33.4974 -55.829 290.3108 334.974"><path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0" fill="#FFFFFF"/></svg>
              </a>
              <button onClick={closeModal} className="bg-green-600 hover:bg-green-700 h-10 w-10 text-white rounded-xl transition justify-center flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
