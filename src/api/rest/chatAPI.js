export async function getTodaysMessagesAPI(fetchWithAuth) {
  return fetchWithAuth("/api/chat/today", {}, false);
}