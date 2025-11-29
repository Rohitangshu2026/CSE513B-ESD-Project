  import { showError } from "./toast";

  const BASE_URL = "http://localhost:8080/api/employee";
  //const getToken = () => localStorage.getItem("token");

 async function parseJsonSafe(response: Response): Promise<any | null> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function request<T>(
  method: string,
  url: string,
  body?: any
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  let response: Response;

  try {
    response = await fetch(BASE_URL + url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include", 
      // 💡 Crucial for Logout Fix: Add "manual" redirect mode
      // The browser will NOT follow redirects automatically on a 302,
      // letting you inspect the redirect status if needed, though for standard
      // API calls, 'follow' is usually default/fine. Leaving it out uses default ('follow').
    });
    console.log(response);
  } catch (_) {
    showError("Unable to reach server");
    throw new Error("Network error");
  }
  // 1. Check for success (200-299)
  if (response.ok) {
    // Return the response body for success cases
    return (await parseJsonSafe(response)) as T; 
  }
  else{
    // 2. Handle known error status codes
  switch (response.status) {
    case 401:
      // Unauthorized: Missing or expired session
      window.location.href = "/";
      throw new Error("Unauthorized");
    case 403:
      // Forbidden: Insufficient permissions
      window.location.href = "/access-denied";
      throw new Error("Forbidden");
    case 404:
      // Not Found
      window.location.href = "/not-found";
      throw new Error("Not Found");
    case 500:
    case 503: 
      // Internal Server Error or Service Unavailable
      window.location.href = "/server-error";
      throw new Error("Server Error");
    default:
      // Handle all other HTTP errors (e.g., 400 Bad Request)
      // Attempt to get a detailed error message from the response body if available
      const errorBody = await parseJsonSafe(response);
      const errorMessage = errorBody?.message || `HTTP Error: ${response.status} ${response.statusText}`;
      showError(errorMessage); // Show a toast/UI error for other client/server issues
      throw new Error(errorMessage);
  }
  }
}

  export const httpGet = <T>(url: string) => request<T>("GET", url);
  export const httpPost = <T>(url: string, body?: any) =>
    request<T>("POST", url, body);
  export const httpPut = <T>(url: string, body?: any) =>
    request<T>("PUT", url, body);
  export const httpDelete = <T>(url: string) => request<T>("DELETE", url);
  export const httpPatch = <T>(url: string, body?: any) =>
    request<T>("PATCH", url, body);

  export default {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    httpPatch
  };

  export function showServerErrorPageForISE() {
    window.location.href = "/server-error";
  }
