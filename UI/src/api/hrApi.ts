import { httpGet, httpPost, httpPatch, httpDelete } from "../utils/httpUtils";
import type {
  OrganisationHRCreateDTO,
  OrganisationSearchResultHr
} from "../models/model";

export const getHR = (id: String) => httpGet(`/get/hr/${id}`);

export const getHRbyId = (hrid: number, orgName : string) => httpGet(`/get/hrId/${hrid}/${orgName}`);

export const updateHR = (hrId: string, data: any) =>
  httpPatch(`/update/hr/${hrId}`, data);


export const searchHR = (orgName: string, query: string) =>
  httpGet(`/search/hr/${query}/${orgName}`);

export const getHRList = async (orgName: string) =>
  httpGet(`/get/hr/${orgName}`);

export const addHR = (orgName: string, data: any) =>
  httpPost(`/create/hr/${orgName}`, data);



export const deleteHR = (hrId: number) =>
  httpDelete(`/delete/hr/${hrId}`);

export const searchOrganisation = async (search_text : string) => {
  if(search_text == "") return httpGet<OrganisationHRCreateDTO []>('/get');
  return httpGet<OrganisationSearchResultHr[]>(`/search/${search_text}`);
};
