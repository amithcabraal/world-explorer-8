import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WorldMap } from '../components/WorldMap';
import { MapControls } from '../components/MapControls';
import { CountrySearch } from '../components/CountrySearch';
import { useMapStore } from '../store/mapStore';

export const MainMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectCountryByName = useMapStore(state => state.selectCountryByName);
  const country = searchParams.get('country');

  useEffect(() => {
    if (country) {
      selectCountryByName(country);
    }
  }, [country, selectCountryByName]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="w-full h-full relative pt-16 pb-8 px-8">
        <div className="w-full h-full relative bg-black/20 backdrop-blur-lg rounded-lg overflow-hidden">
          <WorldMap />
        </div>
        <MapControls />
        <CountrySearch />
      </div>
    </div>
  );
};