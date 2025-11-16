import { useAuthFetch } from "../hooks/useAuthFetch.js";

import * as chatAPI from "./rest/chatAPI.js";
// import * as orderAPI from "./rest/orderAPI.js";
// import * as productAPI from "./rest/productAPI.js";

export function useAPI() {
  const { fetchWithAuth } = useAuthFetch();
  const api = {};

  [
    chatAPI,
    // orderAPI,
    // productAPI
  ].forEach(module => {
    for (const [key, fn] of Object.entries(module)) {
      api[key] = (...args) => fn(fetchWithAuth, ...args);
    }
  });

  return api;
}
