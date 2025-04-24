import { LoadingSpinner } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/context/auth-modal';
import { auth } from '@/firebase/fireBaseConfig';
import { toast } from '@/hooks/use-toast';
import { setAuth } from '@/redux/authReducer';
import { AppDispatch } from '@/redux/store';
import { handleApi } from '@/service';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';


const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export default function LoginGoogle() {
  const dispatch=useDispatch<AppDispatch>();
    const { closeModal, openModal} = useAuthModal();
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const res: any = await signInWithPopup(auth, provider);
      if (res) {
        console.log(res.user.photoURL);
        const data = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoUrl: res.user.photoURL,
        };
        const response:any=await handleApi('/auth/loginGoogle',data,"POST");
        console.log(response.data.data)
        toast({
          variant: 'success',
          title: 'Đăng nhập với google thành công'
        });
        dispatch(setAuth({
          token: response.data.data.accessToken,
          user: response.data.data.user
        }))
        closeModal();
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type='button'
      onClick={handleLoginWithGoogle}
      variant={'outline'}
      className='flex items-center space-x-2 p-[10px] border-none shadow-none w-full  '
    >
      {
        isLoading ? (<LoadingSpinner/>):(<FcGoogle className='text-2xl' />)
      }
      
      <p className='text-[14px] text-gray-600 font-[500]'>Đăng nhập bằng Google</p>
    </Button>
  );
}
