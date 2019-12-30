export interface Geolocation {
  accuracy: number;
  altitude: null | number;
  altitudeAccuracy: null | number;
  heading: null | number;
  latitude: number;
  longitude: number;
  speed: null | number;
}

export interface Position {
  coords: Geolocation;
  timestamp: number;
}