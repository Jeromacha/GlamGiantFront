
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    rol: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return res.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API_URL}/auth/register`, data);
  return res.data;
};
