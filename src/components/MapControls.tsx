import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Globe } from 'lucide-react';
import { useMapStore } from '../store/mapStore';

export const MapControls: React.FC = () => {
  const { zoom, setZoom, showUnselected, toggleUnselected } = useMapStore();

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-2 bg-black/20 backdrop-blur-lg p-2 rounded-lg">
      <button
        onClick={() => setZoom(Math.min(zoom + 1, 8))}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setZoom(Math.max(zoom - 1, 1))}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setZoom(1)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Reset zoom"
      >
        <Maximize2 className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={toggleUnselected}
        className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${
          !showUnselected ? 'bg-white/10' : ''
        }`}
        aria-label="Toggle unselected countries"
      >
        <Globe className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};