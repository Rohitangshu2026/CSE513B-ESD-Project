const BASE_URL = "http://localhost:8080/api/employee";
const getToken = () => localStorage.getItem("token");

async function parseJsonSafe(response: Response) {
  try {
    return await response.json();
  } catch {
    return null; // backend returned non-JSON
  }
}

// ============================
// Core Request Wrapper
// ============================
async function request<T>(
  method: string,
  url: string,
  body?: any
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Attach JWT if exists
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response: Response;

  try {
    response = await fetch(BASE_URL + url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    // ⋙ Network error (backend down)
    console.error("NETWORK ERROR:", networkErr);
    throw new Error("Cannot connect to the server. Please try again later.");
  }

  // ============================
  // Handle 401 Unauthorized
  // ============================
  if (response.status === 401) {
    console.warn("Unauthorized — clearing token and redirecting");
    localStorage.removeItem("token");
    window.location.href = "/";
    throw new Error("Session expired. Please login again.");
  }

  // ============================
  // Handle success responses
  // ============================
  if (response.ok) {
    return parseJsonSafe(response) as Promise<T>;
  }

  // ============================
  // Handle API error responses (400, 404, 500, ...)
  // ============================
  const errorBody = await parseJsonSafe(response);

  // Smart error message selection
  let errorMessage = "Something went wrong.";

  if (errorBody) {
    // Patterns depending on backend style
    if (typeof errorBody === "string") {
      errorMessage = errorBody;
    } else if (errorBody.error) {
      errorMessage = errorBody.error;
    } else if (errorBody.message) {
      errorMessage = errorBody.message;
    }
  } else {
    // fallback to status text
    errorMessage = response.statusText || errorMessage;
  }

  console.error(
    `API ERROR → [${method}] ${url} → ${response.status}: ${errorMessage}`
  );

  throw new Error(errorMessage);
}

// ============================
// Exported helpers
// ============================
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
