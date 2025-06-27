import { type ActionFunctionArgs } from "react-router-dom";
import { httpService } from "../../core/httpService";
import { AxiosError } from "axios";

export type LoginActionResponse =
  | {
    error: true,
    errorMessage: string
  }
  |{
    success: true,
    successMessage: string
    _id: string,
    username: string,
    fullName: string,
    profilePicture: string
  }


export const loginAction = async ({ request }: ActionFunctionArgs): Promise<LoginActionResponse> => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post("/auth/login", data);
    if (response.status === 200) {
      return{
        success: true,
        successMessage: "Logging was successful! Redirecting to home page...",
        _id: response.data._id,
        username: response.data.username,
        fullName: response.data.fullName,
        profilePicture: response.data.profilePicture
      }
    }

    throw new Error("Logging failed");
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