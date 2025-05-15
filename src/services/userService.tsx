// src/services/user-service.ts
import axios from "axios";
import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(`${API_URL}/usuarios`);
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await axios.get<User>(`${API_URL}/usuarios/${id}`);
  return res.data;
};

export const createUser = async (userData: User): Promise<User> => {
  const res = await axios.post<User>(`${API_URL}/usuarios`, userData);
  return res.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  const res = await axios.patch<User>(`${API_URL}/usuarios/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/usuarios/${id}`);
};
