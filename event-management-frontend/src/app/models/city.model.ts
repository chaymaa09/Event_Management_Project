export interface ContinentRef {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  logoUrl?: string;
  imageUrl?: string;
  continent?: ContinentRef;
}
