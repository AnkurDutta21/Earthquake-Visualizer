
export interface Earthquake {
    properties: {
        mag: number;
        place: string;
        time: number;
        title: string;
    };
    geometry: {
        coordinates: [number, number, number];
    };
}

export interface DetailedEarthquake extends Earthquake {
    properties: Earthquake['properties'] & {
        felt: number | null;
        tsunami: number;
        status: string;
        types: string;
        alert: string | null;
        significance: number;
    };
}