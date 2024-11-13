import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';


const EarthquakeDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state;

  if (!state?.quake) {
    return <Navigate to="/" replace />;
  }

  const earthquake = state.quake;
  console.log(earthquake, 'sss');
  // Ensure earthquake data is valid
  const { properties, geometry } = earthquake;
  if (!properties || !geometry || !geometry.coordinates) {
    return <div>Error: Invalid earthquake data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors">
            <span className="mr-2">←</span>
            <span className="font-medium">Back to Map</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">{properties.place}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">Event Details</h2>
              <dl className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-y-4 md:gap-y-6">
                <dt className="text-gray-500 font-medium">Magnitude</dt>
                <dd className="font-semibold text-gray-800">{properties.mag}</dd>
                
                <dt className="text-gray-500 font-medium">Depth</dt>
                <dd className="font-semibold text-gray-800">{geometry.coordinates[2]} km</dd>
                
                <dt className="text-gray-500 font-medium">Time</dt>
                <dd className="font-semibold text-gray-800">
                  {new Date(properties.time).toLocaleString()}
                </dd>
              </dl>
            </div>

            <div className="order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px]">
              <MapContainer
                center={[geometry.coordinates[1], geometry.coordinates[0]]}
                zoom={3}
                className="h-full w-full rounded-lg overflow-hidden"
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker
                  center={[
                    geometry.coordinates[1],
                    geometry.coordinates[0]
                  ]}
                  radius={Math.max(properties.mag * 3, 8)}
                  pathOptions={{
                    fillColor: '#FF4444',
                    color: '#FF0000',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.6
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{properties.place}</h3>
                      <p>Magnitude: {properties.mag}</p>
                      <p>Depth: {geometry.coordinates[2]} km</p>
                    </div>
                  </Popup>
                </CircleMarker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeDetails;
