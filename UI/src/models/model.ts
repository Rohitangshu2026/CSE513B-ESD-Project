// Address base type
export interface Address {
  id: number;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country?: string;
  zip?: string;
}

// HR Contact
export interface OrganisationHRCreateDTO {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  designation?: string;
}

export interface OrganisationSearchResultHr {
  id: number;
  firstName: string;
  lastName: string;
}

// FINAL FIXED DTO
export interface OrganisationCreateDTO {
  name: string;
  address: string;
  // hrContacts: OrganisationHRCreateDTO[]; // always an array
}

// Returned item from backend list
export interface OrganisationSearchResult {
  id: number;
  name: string;
}

// Full organisation returned by backend
export interface Organisation {
  id: number;
  name: string;
  address: Address;
  hrContacts: OrganisationHRCreateDTO[];
}

// For login
export interface Employee {
  id: number;
  email: string;
  token?: string;
}
