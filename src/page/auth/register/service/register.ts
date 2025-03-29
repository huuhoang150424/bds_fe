import { handleApi } from '@/service';
import { FormRegister } from '@/page/auth/register/schema/schema-register';


export const register =async (dataS:FormRegister)=>{
  try {
    const response=await handleApi('auth/register',dataS,'POST')
    return response.data
  } catch (err:any) {
    throw err;
  }
}