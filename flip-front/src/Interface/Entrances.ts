export interface GetEntrances {
  id: string;
  city: string;
  lastOnline: Date;
  device: string;
  browser: string;
  latitude: number;
  longitude: number;
  show?: boolean;
}
