import React from 'react'
import MapComponent from '../components/MapComponent'
import { useEarthquakeApi } from '../services/useEarthquakeApi'

const EarthquakeDashboard:React.FC = () => {
  const { earthquakeData } = useEarthquakeApi() 
  console.log(earthquakeData,'earthquake data')
  return (
    <div>
     <MapComponent />
    </div>
  )
}

export default EarthquakeDashboard
