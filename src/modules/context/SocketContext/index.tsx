import * as React from 'react';
import io, { Socket } from 'socket.io-client';
import Keys from '@/utils/constants/keys';
import Secure from '@/utils/helpers/secureLs';

const defaultSocket = io(Keys.DEFAULT_API as string);

interface ISocket {
  socket: Socket;
}

export const defaultThemeValue: Readonly<ISocket> = {
  socket: defaultSocket,
};

const SocketContext = React.createContext<ISocket>(defaultThemeValue);

export const useSocket = () => {
  return React.useContext(SocketContext);
};

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = React.useState<Socket>(defaultSocket);

  React.useEffect(() => {
    const appSocket = io(Keys.DEFAULT_API as string, {
      query: {
        token: Secure.getToken(),
      },
    });

    appSocket.on('connect', () => {
      // console.log('Connected to server');
    });

    appSocket.on('error', (error: any) => {
      // console.log(`Error: ${error}`);
    });

    setSocket(appSocket);

    return () => {
      appSocket.close();
    };
  }, []);

  const value = React.useMemo(
    () => ({
      socket,
    }),
    [socket],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
