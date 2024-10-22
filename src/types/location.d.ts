export interface PropertyLocationFilter {
  // set true if wannt to fetch
  city?: boolean;
  state?: boolean;
  country?: boolean;
  location?: boolean;

  // Name specific for filter
  filterCity?: string;
  filterState?: string;
  filterCountry?: string;
  filterLocation?: string;
}

export interface PropertyLocationResponse {
  city?: string;
  state?: string;
  country?: string;
  location?: string;
}
