export interface City {
  id: string | number;
  cityName: string;
  emoji: string;
  country: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
}