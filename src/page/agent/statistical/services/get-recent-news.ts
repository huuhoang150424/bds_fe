import {handleApi} from "@/service";

export const getRecentNews = async () => {
    try {
        const response = await handleApi(`/statistical/getRecentNewsCount`, null, 'GET');
        return response?.data?.data;
    } catch (error) {
        console.error('Error ', error);
        throw error;
    }
};