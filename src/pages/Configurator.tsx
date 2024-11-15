import React, { useState, useCallback } from 'react';
import { WorldMap } from '../components/WorldMap';
import Select from 'react-select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { countries } from '../data/countries';

export const Configurator: React.FC = () => {
  const [config, setConfig] = useState({
    selectedCountry: null as string | null,
    showUnselected: true,
    zoom: 1,
    standalone: true
  });

  const selectedCountryOption = countries.find(c => c.code === config.selectedCountry);
  const currentIndex = selectedCountryOption 
    ? countries.findIndex(c => c.code === selectedCountryOption.code)
    : -1;

  const navigateCountry = useCallback((direction: 'next' | 'prev') => {
    if (currentIndex === -1) {
      // If no country is selected, select the first one
      setConfig(prev => ({
        ...prev,
        selectedCountry: countries[0].code
      }));
      return;
    }

    const newIndex = direction === 'next'
      ? (currentIndex + 1) % countries.length
      : (currentIndex - 1 + countries.length) % countries.length;

    setConfig(prev => ({
      ...prev,
      selectedCountry: countries[newIndex].code
    }));
  }, [currentIndex]);

  const options = countries.map(country => ({
    value: country.code,
    label: country.label
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex">
      <div className="w-1/3 p-8 bg-black/20 backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Map Configuration</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2">Initial Country</label>
            <div className="flex gap-2">
              <button
                onClick={() => navigateCountry('prev')}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Previous country"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <Select
                options={options}
                value={options.find(option => option.value === config.selectedCountry)}
                onChange={(option) => setConfig(prev => ({
                  ...prev,
                  selectedCountry: option?.value || null
                }))}
                placeholder="Select a country..."
                classNamePrefix="select"
                isClearable
                className="flex-1"
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
              
              <button
                onClick={() => navigateCountry('next')}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Next country"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Zoom Level</label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.1"
              value={config.zoom}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                zoom: Number(e.target.value)
              }))}
              className="w-full accent-blue-500"
            />
            <span className="text-white">{config.zoom.toFixed(1)}x</span>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.showUnselected}
                onChange={() => setConfig(prev => ({
                  ...prev,
                  showUnselected: !prev.showUnselected
                }))}
                className="form-checkbox"
              />
              <span className="text-white">Show Unselected Countries</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.standalone}
                onChange={() => setConfig(prev => ({
                  ...prev,
                  standalone: !prev.standalone
                }))}
                className="form-checkbox"
              />
              <span className="text-white">Standalone Mode</span>
            </label>
          </div>

          <div className="mt-8 p-4 bg-black/20 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Component Code</h3>
            <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap break-all">
{`<WorldMap
  initCountryCode="${config.selectedCountry || ''}"
  defaultShowUnselected={${config.showUnselected}}
  standalone={${config.standalone}}
/>`}
            </pre>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-8">
        <div className="w-full h-full bg-black/20 backdrop-blur-lg rounded-lg overflow-hidden">
          <WorldMap
            initCountryCode={config.selectedCountry || undefined}
            defaultShowUnselected={config.showUnselected}
            standalone={config.standalone}
          />
        </div>
      </div>
    </div>
  );
};