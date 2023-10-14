import React, { useState } from 'react';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { WalletInterface } from '@/interfaces/wallet.interface';
import { useProfile } from '@/modules/context/ProfileContext';

export interface walletShape {
  wallet: WalletInterface | undefined;
  setWallet: React.Dispatch<React.SetStateAction<WalletInterface | undefined>>;
  refreshWallet: () => void;
}
export const defaultValue: Readonly<walletShape> = {
  wallet: undefined,
  setWallet() {},
  refreshWallet() {},
};
export const WalletContext = React.createContext<walletShape>(defaultValue);
export const useWallet = () => {
  return React.useContext(WalletContext);
};

const WalletProvider = ({ children }: any) => {
  const { profile } = useProfile();
  const [wallet, setWallet] = React.useState<WalletInterface | undefined>(
    undefined,
  );
  const [refresher, setRefresher] = useState<boolean>(false);

  React.useEffect(() => {
    Http.axios
      .get(endpoints.WALLET)
      .then(response => {
        const {
          data: { data },
        } = response;
        setWallet(data);
      })
      .catch(er => {
        console.error(er);
      });
  }, [profile, refresher]);

  // fetching garages

  const value = React.useMemo(() => {
    return {
      wallet,
      setWallet,
      refreshWallet() {
        setRefresher(i => !i);
      },
    };
  }, [wallet]);

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
