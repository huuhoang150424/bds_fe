import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthModal } from '@/context/auth-modal';
import LoginScreen from '@/screen/auth/login';
import AuthLayout from './auth-layout';
import RegisterScreen from '@/screen/auth/register';

const AuthModal: React.FC = () => {
  const { isOpen, currentScreen, closeModal } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <VisuallyHidden>
        <DialogTitle>Hidden Title</DialogTitle>
      </VisuallyHidden>
      <DialogContent className='p-0 w-[800px]  '>
        <AuthLayout>
          {currentScreen === 'login' && <LoginScreen />}
          {currentScreen === 'register' && <RegisterScreen />}
        </AuthLayout>
      </DialogContent>
    </Dialog>
  );
}
export default AuthModal;
