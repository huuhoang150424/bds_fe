import { createContext, useContext, useEffect, useState } from 'react';

type ScreenType = 'login' | 'forgotPassword' | 'verifyCode' | 'resetPassword' | 'register' | 'verifyEmail';

interface AuthModalContextType {
  isOpen: boolean;
  currentScreen: ScreenType;
  email: string;
  otpExpires: string | null; 
  setEmail: (email: string) => void;
  setOtpExpires: (otpExpires: string | null) => void; 
  openModal: (screen: ScreenType) => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [email, setEmail] = useState('');
  const [otpExpires, setOtpExpires] = useState<string | null>(null);

  const openModal = (screen: ScreenType) => {
    setCurrentScreen(screen);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const emailFromUrl = queryParams.get('email');

    if (token && emailFromUrl) {
      setEmail(emailFromUrl);
      openModal('verifyEmail');
    }
  }, []);

  return (
    <AuthModalContext.Provider value={{ isOpen, currentScreen, email, otpExpires, setEmail, setOtpExpires, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error('useAuthModal must be used within AuthModalProvider');
  return context;
}