import { create } from 'zustand';
import { countries } from '../data/countries';

interface MapState {
  selectedCountry: string | null;  // ISO 3166-1 alpha-2 country code
  center: [number, number];
  zoom: number;
  showUnselected: boolean;
  setSelectedCountry: (countryCode: string | null) => void;
  setZoom: (zoom: number) => void;
  setCenter: (center: [number, number]) => void;
  toggleUnselected: () => void;
  selectCountryByName: (countryCode: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedCountry: null,
  center: [0, 0],
  zoom: 1,
  showUnselected: true,
  setSelectedCountry: (countryCode) => set({ selectedCountry: countryCode }),
  setZoom: (zoom) => set({ zoom }),
  setCenter: (center) => set({ center }),
  toggleUnselected: () => set((state) => ({ showUnselected: !state.showUnselected })),
  selectCountryByName: (countryCode) => {
    if (!countryCode) {
      set({ selectedCountry: null, center: [0, 0], zoom: 1 });
      return;
    }
    
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      set({
        selectedCountry: country.code,
        center: country.coordinates,
        zoom: country.zoom
      });
    }
  }
}));