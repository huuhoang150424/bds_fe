import { handleApi } from "@/service";

export const addPost = async (type:string,data:any) => {
  try {
    const url=`/post/${type==='createPost'?'createPost':'createPostDraft'}`
    const response = await handleApi(url, data, "POST");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};