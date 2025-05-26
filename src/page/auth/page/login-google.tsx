import { LoadingSpinner } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/context/auth-modal';
import { useTwoFactor } from '@/context/two-factor-context';
import { auth } from '@/firebase/fireBaseConfig';
import { toast } from '@/hooks/use-toast';
import { setAuth } from '@/redux/authReducer';
import { AppDispatch } from '@/redux/store';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { googleLogin } from '../service/verify-2fa';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

interface LoginGoogleProps {
  setTwoFactorData: React.Dispatch<
    React.SetStateAction<{ open: boolean; userId: string }>
  >;
}

export default function LoginGoogle({ setTwoFactorData }: LoginGoogleProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { closeModal } = useAuthModal();
  const { setTwoFactorDialogOpen } = useTwoFactor();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: loginWithGoogle } = useMutation({
    mutationFn: (data: { email: string; displayName: string; photoUrl: string }) =>
      googleLogin(data),
    onSuccess: (response) => {
      if (response.data.requires2FA) {
        setTwoFactorData({ open: true, userId: response.data.userId });
        setTwoFactorDialogOpen(true);
      } else {
        dispatch(
          setAuth({
            token: response.data.accessToken,
            user: response.data.user,
          }),
        );
        toast({
          variant: 'success',
          title: 'Đăng nhập với Google thành công',
        });
        closeModal();
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: error.response?.data?.message || 'Đăng nhập với Google thất bại',
      });
    },
  });

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (res) {
        const data = {
          displayName: res.user.displayName || '',
          email: res.user.email || '',
          photoUrl: res.user.photoURL || '',
        };
        loginWithGoogle(data);
      }
    } catch (err: any) {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Đăng nhập với Google thất bại',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleLoginWithGoogle}
      variant="outline"
      className="flex items-center space-x-2 p-[10px] border-none shadow-none w-full"
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner /> : <FcGoogle className="text-2xl" />}
      <p className="text-[14px] text-gray-600 font-[500]">Đăng nhập bằng Google</p>
    </Button>
  );
}