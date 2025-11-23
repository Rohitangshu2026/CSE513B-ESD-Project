const MOCK = false; // ⬅️ turn OFF when backend is ready

import type {
  Organisation,
  OrganisationCreateDTO,
  OrganisationSearchResult,
  Employee,
} from "../models/model";
import { httpGet, httpPost, httpDelete, httpPut, httpPatch } from "../utils/httpUtils";

// -----------------------------
// Authentication (Login)
// -----------------------------
export const login = (email: string, password: string) => {
  if (MOCK) {
    return Promise.resolve({
      token: "mock-token-123",
      name: "Mock User",
      email,
    }) as any;
  }
  // return httpPost<Employee>("/login", { email, password });
};

// -----------------------------
// Organisation CRUD
// -----------------------------
export const createOrganisation = (data: OrganisationCreateDTO) => {
  return httpPost<Organisation>("/create", data);
};

export const getOrganisations = async () => {
  return httpGet<OrganisationSearchResult[]>("/get");
};

export const getOrganisation = async (orgName: string) => {
  console.log(orgName);
  return httpGet<Organisation>(`/get/${orgName}`);
};

export const updateOrganisation = (name : string, data: OrganisationCreateDTO) => {
  if (MOCK) {
    console.log("MOCK updateOrganisation:", { name, data });
    return Promise.resolve({ updated: true }) as any;
  }
  return httpPatch(`/update/${name}`, data);
};

export const deleteOrganisation = (name: string) => {
  return httpDelete(`/delete/${name}`);
};

// -----------------------------
// Search
// -----------------------------
export const searchOrganisation = async (search_text : string) => {
  if(search_text == "") return httpGet<OrganisationSearchResult []>('/get');
  return httpGet<OrganisationSearchResult[]>(`/search/${search_text}`);
};
