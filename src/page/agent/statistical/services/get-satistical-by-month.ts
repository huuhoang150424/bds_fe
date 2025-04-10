import {handleApi} from "@/service";

export const getSatisticalByMonth = async () => {
    try {
        const response = await handleApi(`/statistical/getPostByMonth`, null, 'GET');
        return response.data.data;
    } catch (error) {
        console.error('Error ', error);
        throw error;
    }
};