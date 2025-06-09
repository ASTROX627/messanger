import {type ActionFunctionArgs } from "react-router-dom";
import { httpService } from "../../../core/httpService";
import { AxiosError } from "axios";

export type LogoutActionResponse = {success: true, successMessage: string} | {error: true, errorMessage: string} 


export const logoutAction = async ({ request }: ActionFunctionArgs): Promise<LogoutActionResponse> => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post("/auth/logout", data);
    if (response.status === 200) {  
      return{
        success: true,
        successMessage: "Logging out was successful! Redirecting to login page..."
      }
    }
    throw new Error("Logout failed");
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: true,
        errorMessage: error.response?.data?.error || "Somethin went wrong, Please try again."
      }
    }

  return {
      error: true,
      errorMessage: "Unexpected error occurred",
    };
  }
}