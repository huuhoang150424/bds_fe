import { handleApi } from "@/service";



interface AddPostParams {
  title: string;
  squareMeters: number;
  description: string;
  floor: number;
  bedroom: number;
  bathroom: number;
  isFurniture: boolean;
  direction: string;
  images: File[]; // Changed from Image[]
  propertyType: string;
  status: string;
  price: number;
  address: string;
  tags: string[];
  listingType: string;
}

export const addPost = async (data:any) => {
  try {

    data.forEach((value, key) => {
      console.log(key + ':', value);
    });
    
    const response = await handleApi("/post/createPost", data, "POST");

    console.log("Server response:", response.data);
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Axios Error:", {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error("Error:", error.message);
    }
    const errorMessage =
      error.response?.data?.message || error.message || "Không thể tạo bài đăng. Vui lòng thử lại.";
    throw new Error(errorMessage);
  }
};