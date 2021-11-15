export interface Location {
  id: string | null;
  name: string;
  country: string;
  state: string | null;
  lat: number | null;
  lon: number | null;
  shortDescription: string;
  longDescription: string;
}
