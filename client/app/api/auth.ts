import { handleApiResponse } from "@/lib/handleApiResponse";
import apiClient from "./apiClinet";

export const signUp = async (data: {
  phone: string;
  firstName: string;
  lastName: string;
  age: boolean;
  password: string;
  region: string;
  referby: string;
}) => {
  return handleApiResponse(() => apiClient.post("/auth/signup", data));
};

export const signIn = async (data: { phone: string; password: string }) => {
  return handleApiResponse(() => apiClient.post("/auth/signin", data));
};
export const submitkyc = async (formData: FormData) => {
  return handleApiResponse(() =>
    apiClient.post("/auth/submitkyc", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
};
