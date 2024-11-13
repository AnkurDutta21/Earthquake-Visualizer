import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { NavLink } from 'react-router-dom';
import { EarthquakeData } from '@/types';

// Fix for default marker icons
const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const EarthquakeDashboard = () => {
  const [data, setData] = useState<EarthquakeData | null>(null);
  const [visualizationType, setVisualizationType] = useState<'magnitude' | 'depth'>('magnitude');

  useEffect(() => {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  // Calculate averages
  const avgMagnitude = data.features.reduce((acc, curr) => acc + curr.properties.mag, 0) / data.features.length;
  const avgDepth = data.features.reduce((acc, curr) => acc + curr.geometry.coordinates[2], 0) / data.features.length;

  const Legend = () => (
    <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[999]">
      <h4 className="font-semibold mb-2">{visualizationType === 'magnitude' ? 'Magnitude' : 'Depth'}</h4>
      {visualizationType === 'magnitude' ? (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF0000' }}></div>
            <span>&gt; 6.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFA500' }}></div>
            <span>4.1 - 6.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFFF00' }}></div>
            <span>2.1 - 4.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#90EE90' }}></div>
            <span>≤ 2.0</span>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#5B2C6F' }}></div>
            <span>&gt; 100km</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2874A6' }}></div>
            <span>70-100km</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#48C9B0' }}></div>
            <span>40-70km</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#76D7C4' }}></div>
            <span>≤ 40km</span>
          </div>
        </div>
      )}
    </div>
  );

  const mapSection = (
    <div>
      <div className="mb-4">
        <select
          value={visualizationType}
          onChange={(e) => setVisualizationType(e.target.value as 'magnitude' | 'depth')}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-48 p-2.5"
        >
          <option value="magnitude">Show Magnitude</option>
          <option value="depth">Show Depth</option>
        </select>
      </div>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data?.features.map((quake, i) => {
          return (
            <CircleMarker
              key={i}
              center={[quake.geometry.coordinates[1], quake.geometry.coordinates[0]]}
              radius={visualizationType === 'magnitude' ? Math.max(quake.properties.mag * 2, 5) : Math.min(quake.geometry.coordinates[2] / 2, 20)}
              fillColor={visualizationType === 'magnitude' ? 
                quake.properties.mag > 6.0 ? '#FF0000' : 
                quake.properties.mag > 4.0 ? '#FFA500' : 
                quake.properties.mag > 2.0 ? '#FFFF00' : '#90EE90' 
              : 
                quake.geometry.coordinates[2] > 100 ? '#5B2C6F' : 
                quake.geometry.coordinates[2] > 70 ? '#2874A6' : 
                quake.geometry.coordinates[2] > 40 ? '#48C9B0' : '#76D7C4' 
              }
              color="#000"
              weight={1}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">{quake.properties.place}</h3>
                  <p>Magnitude: {quake.properties.mag.toFixed(1)}</p>
                  <p>Depth: {quake.geometry.coordinates[2].toFixed(1)}km</p>
                  <p>Time: {new Date(quake.properties.time).toLocaleString()}</p>
                  <NavLink to={`/earthquake/${quake.id}`} state={{ quake }}>View Details</NavLink>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        <Legend />
      </MapContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid gap-6">
        <header className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Earthquake Visualizer</h1>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">
              <img src="/github-icon.png" alt="GitHub Icon" className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-neutral-800" />
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full bg-white rounded-2xl p-6 shadow-sm">
            {mapSection}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm text-neutral-500 mb-2">Total Earthquakes</h3>
            <p className="text-3xl md:text-4xl font-bold text-neutral-800">{data.metadata.count}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm text-neutral-500 mb-2">Average Magnitude</h3>
            <p className="text-3xl md:text-4xl font-bold text-neutral-800">{avgMagnitude.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm text-neutral-500 mb-2">Average Depth</h3>
            <p className="text-3xl md:text-4xl font-bold text-neutral-800">{avgDepth.toFixed(1)}km</p>
          </div>

          <div className="col-span-full bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Events</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr className="text-left text-neutral-500">
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Magnitude</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Depth</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {data.features.slice(0, 5).map((quake, i) => (
                    <tr key={i} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">{quake.properties.place}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{quake.properties.mag.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{quake.geometry.coordinates[2].toFixed(1)}km</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(quake.properties.time).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeDashboard;
