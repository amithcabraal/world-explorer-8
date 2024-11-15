import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorldMap } from '../components/WorldMap';
import { ChevronDown, ChevronUp, Code } from 'lucide-react';
import { countryCodeToName } from '../data/countryCodes';

const examples = [
  {
    countryCode: 'US',
    description: 'Default style example',
    showUnselected: true,
    code: `<WorldMap
  initCountryCode="US"
  defaultShowUnselected={true}
  standalone={true}
/>`
  },
  {
    countryCode: 'RU',
    description: 'Largest country',
    showUnselected: false,
    code: `<WorldMap
  initCountryCode="RU"
  defaultShowUnselected={false}
  standalone={true}
/>`
  },
  {
    countryCode: 'JP',
    description: 'Island nation',
    showUnselected: true,
    code: `<WorldMap
  initCountryCode="JP"
  defaultShowUnselected={true}
  standalone={true}
/>`
  },
  {
    countryCode: 'BR',
    description: 'South America',
    showUnselected: false,
    code: `<WorldMap
  initCountryCode="BR"
  defaultShowUnselected={false}
  standalone={true}
/>`
  },
  {
    countryCode: 'ZA',
    description: 'Southern hemisphere',
    showUnselected: true,
    code: `<WorldMap
  initCountryCode="ZA"
  defaultShowUnselected={true}
  standalone={true}
/>`
  },
  {
    countryCode: 'LK',
    description: 'Pearl of the Indian Ocean',
    showUnselected: false,
    code: `<WorldMap
  initCountryCode="LK"
  defaultShowUnselected={false}
  standalone={true}
/>`
  },
];

export const Examples: React.FC = () => {
  const navigate = useNavigate();
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Example Maps</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <div
              key={example.countryCode}
              className="relative group overflow-hidden rounded-xl bg-black/20 backdrop-blur-lg p-4"
            >
              <div 
                className="h-48 mb-4 cursor-pointer"
                onClick={() => {
                  navigate(`/?country=${encodeURIComponent(example.countryCode)}`);
                }}
              >
                <WorldMap 
                  initCountryCode={example.countryCode}
                  defaultShowUnselected={example.showUnselected}
                  standalone={true}
                />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{countryCodeToName[example.countryCode]}</h3>
                <p className="text-gray-200">{example.description}</p>
              </div>
              <div>
                <button
                  onClick={() => setExpandedCode(expandedCode === example.countryCode ? null : example.countryCode)}
                  className="flex items-center gap-2 px-4 py-2 w-full bg-black/20 hover:bg-black/30 transition-colors rounded-lg text-white"
                >
                  <Code className="w-4 h-4" />
                  <span>View Code</span>
                  {expandedCode === example.countryCode ? (
                    <ChevronUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </button>
                {expandedCode === example.countryCode && (
                  <div className="mt-4 bg-black/20 rounded-lg p-4">
                    <pre className="text-gray-200 font-mono text-sm whitespace-pre overflow-x-auto">
                      {example.code}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};