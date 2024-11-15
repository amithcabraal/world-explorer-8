import React, { memo, useState, useEffect, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { useMapStore } from '../store/mapStore';
import { countryCodeToName } from '../data/countryCodes';
import { countries } from '../data/countries';

// Using a more reliable TopoJSON source with ISO codes
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface WorldMapProps {
  initialCountry?: string;
  initCountryCode?: string;
  defaultShowUnselected?: boolean;
  standalone?: boolean;
}

// Convert ISO 3166-1 numeric to alpha-2 codes
const standardizeCountryCode = (geoCode: string): string | null => {
  if (!geoCode) return null;
  
  // Extended map of ISO numeric to alpha-2 codes
  const codeMap: { [key: string]: string } = {
    '004': 'AF', '008': 'AL', '010': 'AQ', '012': 'DZ', '016': 'AS',
    '020': 'AD', '024': 'AO', '028': 'AG', '031': 'AZ', '032': 'AR',
    '036': 'AU', '040': 'AT', '044': 'BS', '048': 'BH', '050': 'BD',
    '051': 'AM', '052': 'BB', '056': 'BE', '060': 'BM', '064': 'BT',
    '068': 'BO', '070': 'BA', '072': 'BW', '074': 'BV', '076': 'BR',
    '084': 'BZ', '086': 'IO', '090': 'SB', '092': 'VG', '096': 'BN',
    '100': 'BG', '104': 'MM', '108': 'BI', '112': 'BY', '116': 'KH',
    '120': 'CM', '124': 'CA', '132': 'CV', '136': 'KY', '140': 'CF',
    '144': 'LK', '148': 'TD', '152': 'CL', '156': 'CN', '158': 'TW',
    '162': 'CX', '166': 'CC', '170': 'CO', '174': 'KM', '175': 'YT',
    '178': 'CG', '180': 'CD', '184': 'CK', '188': 'CR', '191': 'HR',
    '192': 'CU', '196': 'CY', '203': 'CZ', '204': 'BJ', '208': 'DK',
    '212': 'DM', '214': 'DO', '218': 'EC', '222': 'SV', '226': 'GQ',
    '231': 'ET', '232': 'ER', '233': 'EE', '234': 'FO', '238': 'FK',
    '242': 'FJ', '246': 'FI', '248': 'AX', '250': 'FR', '254': 'GF',
    '258': 'PF', '262': 'DJ', '266': 'GA', '268': 'GE', '270': 'GM',
    '275': 'PS', '276': 'DE', '288': 'GH', '292': 'GI', '296': 'KI',
    '300': 'GR', '304': 'GL', '308': 'GD', '312': 'GP', '316': 'GU',
    '320': 'GT', '324': 'GN', '328': 'GY', '332': 'HT', '334': 'HM',
    '336': 'VA', '340': 'HN', '344': 'HK', '348': 'HU', '352': 'IS',
    '356': 'IN', '360': 'ID', '364': 'IR', '368': 'IQ', '372': 'IE',
    '376': 'IL', '380': 'IT', '384': 'CI', '388': 'JM', '392': 'JP',
    '398': 'KZ', '400': 'JO', '404': 'KE', '408': 'KP', '410': 'KR',
    '414': 'KW', '417': 'KG', '418': 'LA', '422': 'LB', '426': 'LS',
    '428': 'LV', '430': 'LR', '434': 'LY', '438': 'LI', '440': 'LT',
    '442': 'LU', '446': 'MO', '450': 'MG', '454': 'MW', '458': 'MY',
    '462': 'MV', '466': 'ML', '470': 'MT', '474': 'MQ', '478': 'MR',
    '480': 'MU', '484': 'MX', '492': 'MC', '496': 'MN', '498': 'MD',
    '499': 'ME', '500': 'MS', '504': 'MA', '508': 'MZ', '512': 'OM',
    '516': 'NA', '520': 'NR', '524': 'NP', '528': 'NL', '531': 'CW',
    '533': 'AW', '534': 'SX', '535': 'BQ', '540': 'NC', '548': 'VU',
    '554': 'NZ', '558': 'NI', '562': 'NE', '566': 'NG', '570': 'NU',
    '574': 'NF', '578': 'NO', '580': 'MP', '581': 'UM', '583': 'FM',
    '584': 'MH', '585': 'PW', '586': 'PK', '591': 'PA', '598': 'PG',
    '600': 'PY', '604': 'PE', '608': 'PH', '612': 'PN', '616': 'PL',
    '620': 'PT', '624': 'GW', '626': 'TL', '630': 'PR', '634': 'QA',
    '638': 'RE', '642': 'RO', '643': 'RU', '646': 'RW', '652': 'BL',
    '654': 'SH', '659': 'KN', '660': 'AI', '662': 'LC', '663': 'MF',
    '666': 'PM', '670': 'VC', '674': 'SM', '678': 'ST', '682': 'SA',
    '686': 'SN', '688': 'RS', '690': 'SC', '694': 'SL', '702': 'SG',
    '703': 'SK', '704': 'VN', '705': 'SI', '706': 'SO', '710': 'ZA',
    '716': 'ZW', '724': 'ES', '728': 'SS', '729': 'SD', '732': 'EH',
    '740': 'SR', '744': 'SJ', '748': 'SZ', '752': 'SE', '756': 'CH',
    '760': 'SY', '762': 'TJ', '764': 'TH', '768': 'TG', '772': 'TK',
    '776': 'TO', '780': 'TT', '784': 'AE', '788': 'TN', '792': 'TR',
    '795': 'TM', '796': 'TC', '798': 'TV', '800': 'UG', '804': 'UA',
    '807': 'MK', '818': 'EG', '826': 'GB', '831': 'GG', '832': 'JE',
    '833': 'IM', '834': 'TZ', '840': 'US', '850': 'VI', '854': 'BF',
    '858': 'UY', '860': 'UZ', '862': 'VE', '876': 'WF', '882': 'WS',
    '887': 'YE', '894': 'ZM'
  };

  return codeMap[geoCode] || null;
};

export const WorldMap: React.FC<WorldMapProps> = memo(({ 
  initialCountry,
  initCountryCode,
  defaultShowUnselected = true,
  standalone = false
}) => {
  const [tooltip, setTooltip] = useState<{ content: string; position: { x: number; y: number } } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Local state for standalone mode
  const [localState, setLocalState] = useState({
    selectedCountry: initCountryCode || (initialCountry ? countries.find(c => c.value === initialCountry)?.code : null),
    center: [0, 20] as [number, number],
    zoom: 1,
    showUnselected: defaultShowUnselected
  });

  // Global store state
  const store = useMapStore(state => ({
    selectedCountry: state.selectedCountry,
    center: state.center,
    zoom: state.zoom,
    showUnselected: state.showUnselected,
    selectCountryByName: state.selectCountryByName
  }));

  // Use either local or store state based on standalone mode
  const {
    selectedCountry,
    center,
    zoom,
    showUnselected
  } = standalone ? localState : store;

  useEffect(() => {
    if (initCountryCode && standalone) {
      const country = countries.find(c => c.code === initCountryCode);
      if (country) {
        setLocalState(prev => ({
          ...prev,
          selectedCountry: country.code,
          center: country.coordinates,
          zoom: country.zoom
        }));
      }
    } else if (initCountryCode && !standalone && store.selectCountryByName) {
      store.selectCountryByName(initCountryCode);
    }
  }, [initialCountry, initCountryCode, standalone, store.selectCountryByName]);

  return (
    <div className="w-full h-full relative" ref={mapRef}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          center: [0, 30]
        }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          minZoom={1}
          maxZoom={8}
          onMoveEnd={({ coordinates, zoom }) => {
            if (standalone) {
              setLocalState(prev => ({
                ...prev,
                center: coordinates as [number, number],
                zoom
              }));
            } else if (store) {
              store.setCenter?.(coordinates as [number, number]);
              store.setZoom?.(zoom);
            }
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryCode = standardizeCountryCode(geo.id);
                const countryName = countryCode ? countryCodeToName[countryCode] : null;
                const isSelected = Boolean(selectedCountry && selectedCountry === countryCode);
                const shouldShowTooltip = showUnselected && !isSelected && countryName;
                const isVisible = showUnselected || isSelected;

                return countryCode ? (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-country-code={countryCode}
                    data-country-name={countryName}
                    data-selected={isSelected}
                    className={`geography-path${isSelected ? ' selected' : ''}`}
                    style={{
                      default: {
                        fill: isSelected ? '#3b82f6' : '#2a4365',
                        stroke: '#1a202c',
                        strokeWidth: isSelected ? 1 : 0.5,
                        outline: 'none',
                        transition: 'all 250ms',
                        opacity: isVisible ? 1 : 0,
                        cursor: isVisible ? 'pointer' : 'default',
                        pointerEvents: isVisible ? 'auto' : 'none'
                      },
                      hover: {
                        fill: isSelected ? '#2563eb' : '#60a5fa',
                        stroke: '#1a202c',
                        strokeWidth: isSelected ? 1 : 0.5,
                        outline: 'none',
                        cursor: isVisible ? 'pointer' : 'default'
                      },
                      pressed: {
                        fill: '#1d4ed8',
                        stroke: '#1a202c',
                        strokeWidth: 1,
                        outline: 'none'
                      }
                    }}
                    onMouseEnter={(evt) => {
                      if (shouldShowTooltip) {
                        const { pageX, pageY } = evt;
                        setTooltip({
                          content: countryName || '',
                          position: { x: pageX, y: pageY }
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltip(null);
                    }}
                    onClick={() => {
                      if (isVisible && countryCode) {
                        if (standalone) {
                          const country = countries.find(c => c.code === countryCode);
                          if (country) {
                            setLocalState(prev => ({
                              ...prev,
                              selectedCountry: countryCode,
                              center: country.coordinates,
                              zoom: country.zoom
                            }));
                          }
                        } else if (store.selectCountryByName) {
                          store.selectCountryByName(countryCode);
                        }
                      }
                    }}
                  />
                ) : null;
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {tooltip && (
        <div
          className="tooltip"
          style={{
            left: tooltip.position.x,
            top: tooltip.position.y - 40
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
});