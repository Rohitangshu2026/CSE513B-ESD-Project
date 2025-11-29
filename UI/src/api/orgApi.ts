import type {
  Organisation,
  OrganisationCreateDTO,
  OrganisationSearchResult,
} from "../models/model";
import { httpGet, httpPost, httpDelete, httpPut, httpPatch } from "../utils/httpUtils";

// -----------------------------
// Authentication (Login)
// -----------------------------
export const login = () => {
  window.location.href = "http://localhost:8080/api/employee/login";
};

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
