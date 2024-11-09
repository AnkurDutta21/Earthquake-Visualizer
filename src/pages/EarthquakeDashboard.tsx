import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const EarthquakeDashboard:React.FC = () => {
  return (
    <div>
      <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default EarthquakeDashboard
