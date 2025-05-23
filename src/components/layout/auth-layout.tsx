import { Card } from '@/components/ui/card';

interface Props {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Card className='w-full flex bg-[#fff] shadow-md rounded-[15px] overflow-hidden '>
      <div className='bg-[url(https://cdn.hita.com.vn/storage/blog/meo-vat-gia-dinh/anh-ngoi-nha-9.jpg)] bg-cover bg-no-repeat bg-center p-8 hidden md:block w-[55%]'></div>
      {children}
    </Card>
  );
};

export default AuthLayout;
//https://i.gifer.com/embedded/download/3sN2.gif