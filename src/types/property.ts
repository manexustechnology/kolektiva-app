// types/property.ts
export interface Facility {
  id: string;
  propertyId: string;
  type: string;
  facility: string;
  isHighlight: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  propertyId: string;
  image: string;
  isHighlight: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  propertyId: string;
  document: string;
  isHighlight: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyData {
  id: string;
  marketAddress: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  chainId: number;
  address: string;
  googleMapUrl: string;
  location: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  type: string;
  status: string;
  phase: string;
  description: string;
  isFeatured: boolean | null;
  isUpcoming: boolean | null;
  isAftermarket: boolean | null;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  facilities: Facility[];
  images: Image[];
  documents: Document[];
}

export interface Property {
  description: string;
  facilities: Facility[];
  location: {
    latitude: number;
    longitude: number;
  };
}
