
import React from 'react';
import { Location } from '../types';

interface MapPlaceholderProps {
  location: Location | null;
  locationError: string | null;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ location, locationError }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-blue-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">GeoChat AI</h2>
      <p className="text-gray-600 dark:text-gray-400">Your location-aware assistant.</p>
      <div className="mt-4 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg p-3 w-full">
        {locationError ? (
          <p className="text-red-500 font-medium">
            <span className="font-bold">Location Error:</span> {locationError}
          </p>
        ) : location ? (
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200">Your Location:</p>
            <p className="text-gray-500 dark:text-gray-300">Lat: {location.latitude.toFixed(4)}</p>
            <p className="text-gray-500 dark:text-gray-300">Lon: {location.longitude.toFixed(4)}</p>
          </div>
        ) : (
          <p className="text-blue-500 font-medium animate-pulse">Fetching location...</p>
        )}
      </div>
       <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
        Location data is used to provide accurate, context-aware answers to your questions.
      </p>
    </div>
  );
};

export default MapPlaceholder;
