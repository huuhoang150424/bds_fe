// services/add-report.ts
import { handleApi } from "@/service";

export const addReport = async (data: any) => {
  try {
    const response = await handleApi(`/reports/createReports`, data, "POST");
    console.log("check", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding report:", error);
    throw error;
  }
};