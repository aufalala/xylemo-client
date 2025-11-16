import { useEffect } from "react";

export default function useSSE(url, onMessage) {
  useEffect(() => {
    let es = null;
    let closed = false;
    let retryDelay = 1000;

    function connectSSE() {
      if (closed) return;
      
      // const token = await getToken();

      // const headers = token ? { Authorization: `Bearer ${token}` } : {};
      // es = new EventSource(url, { withCredentials: true, headers }); 
      
      es = new EventSource(url);

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (err) {
          console.warn("Non-JSON SSE message:", event.data);
        }
      };

      es.onopen = () => {
        console.log("SSE connected")
        retryDelay = 1000;
      };

      es.onerror = () => {
        if (es) es.close();
        es = null;
        console.error("SSE error: retrying connection");

        const delay = retryDelay;
        retryDelay = Math.min(retryDelay * 2, 30000);

        setTimeout(() => {
          if (!closed) connectSSE();
        }, delay);
      };
    
    }
    
    connectSSE();

    return () => {
      closed = true;
      if (es) es.close();
    };
    
  // }, [url, onMessage, getToken]);
  }, [url]);
}
