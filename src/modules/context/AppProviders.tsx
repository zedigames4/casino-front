import React from 'react';
import GameProvider from '@/modules/context/GamesContext';
import WalletProvider from '@/modules/context/WalletContext';
import ProfileProvider from './ProfileContext';
import SocketContextProvider from './SocketContext';

const AppProviders = ({ children }: any) => {
  return (
    <SocketContextProvider>
      <ProfileProvider>
        <WalletProvider>
          <GameProvider>{children}</GameProvider>
        </WalletProvider>
      </ProfileProvider>
    </SocketContextProvider>
  );
};

export default AppProviders;
