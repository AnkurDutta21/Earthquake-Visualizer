import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { DetailedEarthquake } from '@/types/EarthquakeTypes';


const EarthquakeDetails = () => {
  const { id } = useParams();
  const [earthquake, setEarthquake] = useState<DetailedEarthquake | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${id}.geojson`)
      .then(response => response.json())
      .then(data => {
        setEarthquake(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching earthquake details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!earthquake) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Earthquake not found</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-blue-500 hover:underline">
            ← Back to Map
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{earthquake.properties.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <dl className="grid grid-cols-2 gap-4">
                <dt className="text-gray-600">Magnitude</dt>
                <dd className="font-semibold">{earthquake.properties.mag}</dd>
                
                <dt className="text-gray-600">Depth</dt>
                <dd className="font-semibold">{earthquake.geometry.coordinates[2]} km</dd>
                
                <dt className="text-gray-600">Time</dt>
                <dd className="font-semibold">
                  {new Date(earthquake.properties.time).toLocaleString()}
                </dd>
                
                <dt className="text-gray-600">Status</dt>
                <dd className="font-semibold capitalize">{earthquake.properties.status}</dd>
                
                <dt className="text-gray-600">Tsunami</dt>
                <dd className="font-semibold">
                  {earthquake.properties.tsunami ? 'Yes' : 'No'}
                </dd>
                
                <dt className="text-gray-600">Felt Reports</dt>
                <dd className="font-semibold">
                  {earthquake.properties.felt || 'No reports'}
                </dd>
              </dl>
            </div>

            <div className="h-64 md:h-auto">
              <MapContainer
                center={[earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker
                  center={[
                    earthquake.geometry.coordinates[1],
                    earthquake.geometry.coordinates[0]
                  ]}
                  radius={10}
                  pathOptions={{
                    fillColor: '#FF0000',
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{earthquake.properties.title}</h3>
                      <p>Magnitude: {earthquake.properties.mag}</p>
                      <p>Depth: {earthquake.geometry.coordinates[2]} km</p>
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