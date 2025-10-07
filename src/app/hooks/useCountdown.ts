/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect, useRef } from "react";

interface CounterData {
  count: number;
}

export function useWebSocketCounter(url: string) {
  const [count, setCount] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      try {
        const data: CounterData = JSON.parse(event.data);
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message", err);
      }
    };
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      ws.close();
    };
  }, [url]);

  return count;
}
