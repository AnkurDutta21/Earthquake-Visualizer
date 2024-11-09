export type EarthquakeData = {
    bbox: number[]
    features: Earthquake[]
    metadata: {
        count: number
        generated: number
    }
}
export type Earthquake = {
    id: string,
    geometry: {
        coordinates: number[],
        type: string
    },
    properties: {
        mag: number,
        time: number,
        place: string,
    }
}
