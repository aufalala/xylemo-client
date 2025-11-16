import { createContext, useContext, useState, useCallback, useEffect } from "react";
import useSSE from "../hooks/useSSE.js";

// import { getTodaysMessagesAPI } from "../api/rest/chatAPI.js";
import { localServerURL, serverURL } from "../utils/urlConfig.js";

import { useAPI } from "../api/index.js";
// import { useAuthFetch } from "../hooks/useAuthFetch.js";

const ChatFeedContext = createContext();

export function ChatFeedProvider({ children }) {
  // const { fetchWithAuth } = useAuthFetch();
  const api = useAPI();
  
  const baseURL = import.meta.env.DEV ? localServerURL : serverURL;
  
  const [todaysMessages, setTodaysMessages] = useState([]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const msgs = await api.getTodaysMessagesAPI();
        setTodaysMessages(msgs);
      } catch (e) {
        console.error("Failed to load today's messages:", e);
      }
    }
    loadMessages();
  }, [])

  const handleSSE = useCallback((evt) => {
    if (evt.type === "new_chat") {
      setTodaysMessages((prev = []) => [...prev, evt.chat]);
    }
  }, []);

  useSSE(`${baseURL}/api/sse/events`, handleSSE);

  return (
    <ChatFeedContext.Provider value={{ todaysMessages }}>
      {children}
    </ChatFeedContext.Provider>
  );
}

export const useChatFeed = () => useContext(ChatFeedContext);