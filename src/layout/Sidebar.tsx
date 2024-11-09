import React, { useState } from 'react';
import { FaFilter, FaRuler, FaGlobe, FaCalendar, FaMinus, FaPlus, FaChartBar } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [magnitude, setMagnitude] = useState<number | ''>('');
  const [depth, setDepth] = useState<number | ''>('');
  const [dateRange, setDateRange] = useState<string>('');

  const adjustValue = (setter: Function, currentValue: number | '', increment: boolean) => {
    if (currentValue === '') {
      setter(increment ? 1 : 0);
    } else {
      setter(increment ? Number(currentValue) + 1 : Math.max(0, Number(currentValue) - 1));
    }
  };

  const handleDirectInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Function
  ) => {
    const value = e.target.value;
    if (value === '') {
      setter('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setter(numValue);
      }
    }
  };

  return (
    <aside
      id="sidebar"
      className="bg-surface-dark backdrop-blur-xl lg:w-[360px] w-full lg:block hidden fixed lg:relative lg:translate-x-0 transform lg:transform-none transition-all duration-300 ease-in-out p-8 space-y-8 border border-stroke"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-accent-pink/20 p-2 rounded-xl">
            <FaChartBar className="text-accent-pink text-lg" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Earthquake Data</h2>
        </div>
        <div className="bg-surface px-3 py-1 rounded-full">
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="bg-pink-500/20 p-1.5 rounded-lg">
                <FaRuler className="text-pink-500" />
              </div>
              <label className="font-medium">Magnitude</label>
            </div>
            <span className="text-sm bg-gray-800 px-2 py-1 rounded-lg">Richter scale</span>
          </div>
          <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
            <button
              onClick={() => adjustValue(setMagnitude, magnitude, false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-700 hover:bg-pink-500/20 hover:text-pink-500 active:scale-95 transition-all duration-200"
            >
              <FaMinus className="text-current" />
            </button>
            <div className="flex-1">
              <input
                type="number"
                value={magnitude}
                onChange={(e) => handleDirectInput(e, setMagnitude)}
                className="w-full text-center bg-transparent text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 rounded-lg p-1"
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>
            <button
              onClick={() => adjustValue(setMagnitude, magnitude, true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-700 hover:bg-pink-500/20 hover:text-pink-500 active:scale-95 transition-all duration-200"
            >
              <FaPlus className="text-current" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="bg-pink-500/20 p-1.5 rounded-lg">
                <FaGlobe className="text-pink-500" />
              </div>
              <label className="font-medium">Depth</label>
            </div>
            <span className="text-sm bg-gray-800 px-2 py-1 rounded-lg">kilometers</span>
          </div>
          <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
            <button
              onClick={() => adjustValue(setDepth, depth, false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-700 hover:bg-pink-500/20 hover:text-pink-500 active:scale-95 transition-all duration-200"
            >
              <FaMinus className="text-current" />
            </button>
            <span className="flex-1 text-center text-gray-800 font-semibold text-lg">
              {depth === '' ? '0' : depth}
            </span>
            <button
              onClick={() => adjustValue(setDepth, depth, true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-700 hover:bg-pink-500/20 hover:text-pink-500 active:scale-95 transition-all duration-200"
            >
              <FaPlus className="text-current" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="bg-pink-500/20 p-1.5 rounded-lg">
                <FaCalendar className="text-pink-500" />
              </div>
              <label className="font-medium">Time Range</label>
            </div>
          </div>
          <div className="relative">
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-4 pl-12 bg-gray-800/50 text-white rounded-2xl border border-gray-700 focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all duration-200 outline-none"
            />
            <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      <button
        className="w-full bg-gradient-to-r from-accent-pink to-accent-purple text-white py-4 px-6 rounded-2xl hover:from-accent-pink-dark hover:to-accent-purple-dark active:scale-98 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-accent-pink/20 font-medium text-lg"
        onClick={() => {
          console.log('Filter applied', { magnitude, depth, dateRange });
        }}
      >
        <FaFilter className="text-sm" />
        <span>Apply Filters</span>
      </button>
    </aside>
  );
};

export default Sidebar;
