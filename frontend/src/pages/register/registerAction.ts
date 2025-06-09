import type { ActionFunctionArgs } from "react-router-dom";
import { httpService } from "../../core/httpService";
import { AxiosError } from "axios";

export type RegisterActionResponse =
  | {
    error: true,
    errorMessage: string
  }
  | {
    success: true,
    successMessage: string
  }

export const registerAction = async ({ request }: ActionFunctionArgs): Promise<RegisterActionResponse> => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post("/auth/register", data);
    if (response.status === 201) {
      return {
        success: true,
        successMessage: "Registration was successful! Redircet to login page..."
      }
    }

    throw new Error("Registration failed");
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: true,
        errorMessage: error.response?.data?.error || "Something went wrong, Please try again"
      }
    }
    return {
      error: true,
      errorMessage: "Unexpected error occurred"
    }
  }
}