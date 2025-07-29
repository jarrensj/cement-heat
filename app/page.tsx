"use client";

import { useState } from "react";

export default function Home() {
  const [airTemp, setAirTemp] = useState(75); // Air temperature in Fahrenheit
  const [heatFactor, setHeatFactor] = useState(45); // Concrete heating factor (+30 to +60°F)
  
  // Calculate cement temperature based on air temperature + heat factor
  const getCementTemp = () => {
    return airTemp + heatFactor;
  };
  
  // Calculate heat intensity based on cement temperature
  const getHeatIntensity = () => {
    const cementTemp = getCementTemp();
    return Math.max(0, Math.min(1, (cementTemp - 70) / 60));
  };
  
  const heatIntensity = getHeatIntensity();
  const cementTemp = getCementTemp();

  // Get safety message based on cement temperature
  const getSafetyMessage = () => {
    if (cementTemp <= 85) return "Safe for paws 🐾";
    if (cementTemp <= 95) return "Warm - be careful! ";
    if (cementTemp <= 110) return "Hot - dangerous! 🔥";
    return "Extremely hot! 🔥🔥";
  };

  return (
    <div 
      className="min-h-screen p-8 flex items-center justify-center flex-col relative"
      style={{
        backgroundImage: 'url(/cement.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Heat overlay that gets more intense with temperature */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(255, 69, 0, ${heatIntensity * 0.4}) 0%, rgba(255, 140, 0, ${heatIntensity * 0.3}) 50%, rgba(139, 0, 0, ${heatIntensity * 0.2}) 100%)`,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Additional red heat filter for higher temperatures */}
      {heatIntensity > 0.3 && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: `rgba(255, 0, 0, ${(heatIntensity - 0.3) * 0.2})`,
            mixBlendMode: 'overlay'
          }}
        />
      )}

      <main className="container mx-auto text-center flex-1 flex items-center justify-center relative z-10">
        <div className="bg-white/15 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-white/30 max-w-md w-full">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 drop-shadow-lg">cement heat</h1>
          <p className="text-gray-700 text-lg drop-shadow mb-6">check the heat of the cement for your dog</p>

          {/* zip code input (future feature) */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium text-sm block mb-2">Get Local Temperature:</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter zip code"
                disabled
                className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed opacity-60"
              />
              <button
                disabled
                className="px-4 py-2 text-sm bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed opacity-60"
              >
                Get Temp
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              🚧 feature not available yet
            </div>
          </div>

          {/* Air Temperature control */}
          <div className="mb-4">
            <label className="text-gray-800 font-medium text-sm block mb-2">Air Temperature:</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="45"
                max="110"
                value={airTemp}
                onChange={(e) => setAirTemp(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gradient-to-r from-blue-300 via-gray-300 to-red-500 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #93c5fd 0%, #d1d5db 50%, #ef4444 100%)`
                }}
              />
              <span className="text-gray-800 font-bold text-sm min-w-[3rem]">
                {airTemp}°F
              </span>
            </div>
          </div>

          {/* Heat Factor control */}
          <div className="mb-4">
            <label className="text-gray-800 font-medium text-sm block mb-2">Concrete Heat Factor:</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="30"
                max="60"
                value={heatFactor}
                onChange={(e) => setHeatFactor(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gradient-to-r from-orange-300 to-red-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-gray-800 font-bold text-sm min-w-[3rem]">
                +{heatFactor}°F
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Adjust based on sun, shade, and surface conditions
            </div>
          </div>
          
          {/* Cement temperature display */}
          <div className="mb-4 p-3 bg-white/10 rounded border border-white/20">
            <div className="text-xs text-gray-700 mb-1">Estimated Cement Temperature:</div>
            <div className="text-2xl font-bold text-gray-800">
              {cementTemp}°F
            </div>
            <div className="text-xs text-gray-600 mt-1">
              ({airTemp}°F air + {heatFactor}°F heating)
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-3">
            {getSafetyMessage()}
          </div>
          
          <div className="text-xs text-gray-500 border-t border-white/20 pt-3">
            <div className="mb-3">
              <strong>Note:</strong> Concrete can be + 30°F - 60°F hotter than air temperature.
            </div>
            <div className="mb-3">
              <strong>Factors that push it toward + 60°F:</strong>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">☀️</span>
                  <span>Full sun exposure (no clouds)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">🌳</span>
                  <span>No shade coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-800">⚫</span>
                  <span>Dark pavement or blacktop</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">🌵</span>
                  <span>Dry conditions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">💨</span>
                  <span>Low wind</span>
                </div>
              </div>
            </div>
            <div className="text-gray-400">
              Use the heat factor slider to match your conditions.
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-8 text-xs text-gray-600 text-center max-w-2xl relative z-10 bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <p><strong>Disclaimer:</strong> This is just a rough guess, not real advice and isn&apos;t an accurate reading as we don&apos;t have a thermometer measuring every part of the cement. Direct sun can make the cement hotter than it is in the shade. Use your own judgement.</p>
      </footer>
    </div>
  );
}