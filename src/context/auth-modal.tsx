import { createContext, useContext, useState } from 'react';

type ScreenType = 'login' | 'forgotPassword' | 'verifyCode' | 'resetPassword' | 'register' | 'verifyEmail';

interface AuthModalContextType {
  isOpen: boolean;
  currentScreen: ScreenType;
  email: string;
  setEmail: (email: string) => void;
  openModal: (screen: ScreenType) => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [email, setEmail] = useState('');

  const openModal = (screen: ScreenType) => {
    setCurrentScreen(screen);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, currentScreen, email, setEmail, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error('useAuthModal must be used within AuthModalProvider');
  return context;
}
