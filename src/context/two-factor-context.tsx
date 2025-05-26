import { createContext, useContext, useState, ReactNode } from 'react';

interface TwoFactorContextType {
  isTwoFactorDialogOpen: boolean;
  setTwoFactorDialogOpen: (open: boolean) => void;
}

const TwoFactorContext = createContext<TwoFactorContextType | undefined>(undefined);

export function TwoFactorProvider({ children }: { children: ReactNode }) {
  const [isTwoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);

  return (
    <TwoFactorContext.Provider value={{ isTwoFactorDialogOpen, setTwoFactorDialogOpen }}>
      {children}
    </TwoFactorContext.Provider>
  );
}

export function useTwoFactor() {
  const context = useContext(TwoFactorContext);
  if (!context) {
    throw new Error('useTwoFactor must be used within a TwoFactorProvider');
  }
  return context;
}