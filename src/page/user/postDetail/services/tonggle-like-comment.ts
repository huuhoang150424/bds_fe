import { handleApi } from "@/service";



export const toggleComment = async (data: any) => {
  try {
    console.log("check ",data)
    const url=data?.type==='like'?'like':'dislike'
    const response = await handleApi(`/commentlike/${url}`, {
      commentId: data?.commentId
    }, "POST");
    return response.data;
  } catch (error) {
    console.error("Error adding comment reply:", error);
    throw error;
  }
};