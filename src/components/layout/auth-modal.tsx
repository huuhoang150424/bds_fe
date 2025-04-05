import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthModal } from '@/context/auth-modal';
import LoginScreen from '@/page/auth/page/login';
import AuthLayout from './auth-layout';
import RegisterScreen from '@/page/auth/page/register';
import ForgotPassword from '@/page/auth/page/forgot-password';
import VerificationCode from '@/page/auth/page/verify-code';
import ResetPassword from '@/page/auth/page/reset-password';
import EmailVerification from '@/page/auth/page/verify-email';
import UpdatePhone from '@/page/auth/page/update-phone';
VerificationCode
const AuthModal: React.FC = () =>
{
  const { isOpen, currentScreen, closeModal } = useAuthModal();

  return (
    <Dialog open={ isOpen } onOpenChange={ closeModal }>
      <VisuallyHidden>
        <DialogTitle>Hidden Title</DialogTitle>
      </VisuallyHidden>
      <DialogContent className='p-0 w-[800px]  '>
        <AuthLayout>
          { currentScreen === 'login' && <LoginScreen /> }
          { currentScreen === 'register' && <RegisterScreen /> }
          { currentScreen === 'forgotPassword' && <ForgotPassword /> }
          { currentScreen === 'verifyCode' && <VerificationCode /> }
          { currentScreen === 'resetPassword' && <ResetPassword /> }
          { currentScreen === 'verifyEmail' && <EmailVerification /> }
          { currentScreen === 'updatePhone' && <UpdatePhone /> }
        </AuthLayout>
      </DialogContent>
    </Dialog>
  );
}
export default AuthModal;
