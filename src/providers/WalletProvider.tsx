import React, { createContext, useContext, useEffect, useState } from 'react';

const WalletContext = createContext<{ wallet: any}>(null);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (window.unisat) {
        setWallet(window.unisat);
    } else {
      console.warn("Unisat Wallet not found!");
    }
  }, []);

  return (
    <WalletContext.Provider value={{wallet}}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
