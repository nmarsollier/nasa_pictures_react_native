export interface ImageValue {
  identifier: string;
  date: string;
  image: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}
