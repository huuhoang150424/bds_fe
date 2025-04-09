import { urlLocal } from '@/constant/baseUrl';
import { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface User {
  id: string;
  fullname: string;
  avatar: string;
}

interface AppContextType {
  socket: Socket;
  connectSocket: () => void;
  disconnectSocket: () => void;
  selectedUser: any | null;
  setSelectedUser: (user: any | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const socket = io(urlLocal, {
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
  withCredentials: true,
  autoConnect: false,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const connectSocket = () => {
    if (!socket.connected) {
      socket.connect();
    }
  };

  const disconnectSocket = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  useEffect(() => {
    connectSocket();

    return () => {
      // disconnectSocket();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{ socket, connectSocket, disconnectSocket, selectedUser, setSelectedUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext phải được dùng trong AppProvider');
  }
  return context;
};