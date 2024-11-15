import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Map, Settings, Layout } from 'lucide-react';
import { MainMap } from './pages/MainMap';
import { Examples } from './pages/Examples';
import { Configurator } from './pages/Configurator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <nav className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-lg z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
                >
                  <Map className="w-6 h-6" />
                  <span className="font-semibold">World Map</span>
                </Link>
                <Link
                  to="/examples"
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
                >
                  <Layout className="w-6 h-6" />
                  <span>Examples</span>
                </Link>
                <Link
                  to="/configurator"
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
                >
                  <Settings className="w-6 h-6" />
                  <span>Configurator</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-16">
          <Routes>
            <Route path="/" element={<MainMap />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/configurator" element={<Configurator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;