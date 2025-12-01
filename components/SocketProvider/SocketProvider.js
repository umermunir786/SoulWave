
import { Socket_URL } from "@/network/Environment";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState } from "react-native";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null); // Store socket in state

  const createSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const newSocket = io(Socket_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket Connected:", newSocket.id);
      setSocket(newSocket); // ✅ Update state so context re-renders
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Socket Disconnected:", reason);
      setSocket(null); // Set socket to null on disconnect
    });

    socketRef.current = newSocket;
  };

  useEffect(() => {
    createSocket();

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "inactive" || nextAppState === "background") {
        if (socketRef.current) {
          socketRef.current.disconnect();
          console.log("📴 App moved to background - Socket Disconnected");
        }
      } else if (nextAppState === "active") {
        if (!socketRef.current || !socketRef.current.connected) {
          createSocket();
          console.log("🟢 App moved to foreground - Socket Reconnected");
        }
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const emit = (eventName, ...params) => {
    if (socket) {
      socket.emit(eventName, ...params);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, socketEmit: emit }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a SocketProvider");
  }
  return context;
};
