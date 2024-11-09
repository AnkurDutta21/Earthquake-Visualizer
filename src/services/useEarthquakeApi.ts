import { EarthquakeData } from "@/types/EarthquakeTypes"
import { useState, useEffect } from "react"

export const useEarthquakeApi = () => {
  const [earthquakeData, setEarthquakeData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
        if (!response.ok) {
          throw new Error('Failed to fetch earthquake data')
        }
        const data = await response.json()
        setEarthquakeData(data)
      } catch (error:any) {
        console.error('Error fetching earthquake data:', error)
        setError(error)
      }
    }

    fetchData()
  }, [])

  return { earthquakeData, error }
}