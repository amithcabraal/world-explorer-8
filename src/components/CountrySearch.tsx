import React from 'react';
import Select from 'react-select';
import { useMapStore } from '../store/mapStore';
import { countries } from '../data/countries';

export const CountrySearch: React.FC = () => {
  const { selectedCountry, selectCountryByName } = useMapStore();

  const options = countries.map(country => ({
    value: country.code,
    label: country.label
  }));

  return (
    <div className="fixed top-24 left-8 w-64 z-10">
      <Select
        options={options}
        value={options.find(option => option.value === selectedCountry) || null}
        onChange={(option) => selectCountryByName(option?.value || null)}
        placeholder="Search countries..."
        classNamePrefix="select"
        isClearable
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#3b82f6',
            primary25: '#60a5fa',
            neutral0: '#1f2937',
            neutral5: '#374151',
            neutral10: '#4b5563',
            neutral20: '#6b7280',
            neutral30: '#9ca3af',
            neutral40: '#d1d5db',
            neutral50: '#e5e7eb',
            neutral60: '#f3f4f6',
            neutral70: '#f9fafb',
            neutral80: '#ffffff',
            neutral90: '#ffffff',
          },
        })}
      />
    </div>
  );
};