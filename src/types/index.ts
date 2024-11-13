export interface EarthquakeData {
    type: string;
    metadata: {
      generated: number;
      count: number;
    };
    features: Array<{
      id: string;
      properties: {
        mag: number;
        place: string;
        time: number;
        depth: number;
      };
      geometry: {
        coordinates: number[];
      };
    }>;
  }